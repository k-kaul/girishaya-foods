"use client"

import {
    Image,
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";

import { useRef, useState } from "react";

// ImageUploader component demonstrates file uploading using ImageKit's Next.js SDK.
const ImageUploader = () => {
    const [itemName,setItemName] = useState('');
    const [quantity,setQuantity] = useState(0);
    const [weight,setWeight] = useState('');
    const [itemPrice,setItemPrice] = useState(0);
    const [images,setImages] = useState<string[]>([]);
    const [progressList, setProgressList] = useState<number[]>([])
    const formRef = useRef(null)

    // Create a ref for the file input element to access its files easily
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Create an AbortController instance to provide an option to cancel the upload if needed.
    const abortController = new AbortController();

    /**
     * Authenticates and retrieves the necessary upload credentials from the server.
     *
     * This function calls the authentication API endpoint to receive upload parameters like signature,
     * expire time, token, and publicKey.
     *
     * @returns {Promise<{signature: string, expire: string, token: string, publicKey: string}>} The authentication parameters.
     * @throws {Error} Throws an error if the authentication request fails.
     */
    const authenticator = async () => {
        try {
            // Perform the request to the upload authentication endpoint.
            const response = await fetch("/api/product/upload-auth");
            if (!response.ok) {
                // If the server response is not successful, extract the error text for debugging.
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            // Parse and destructure the response JSON for upload credentials.
            const data = await response.json();
            const { signature, expire, token, publicKey } = data;
            return { signature, expire, token, publicKey };
        } catch (error) {
            // Log the original error for debugging before rethrowing a new error.
            console.error("Authentication error:", error);
            throw new Error("Authentication request failed");
        }
    };

    /**
     * Handles the file upload process.
     *
     * This function:
     * - Validates file selection.
     * - Retrieves upload authentication credentials.
     * - Initiates the file upload via the ImageKit SDK.
     * - Updates the upload progress.
     * - Catches and processes errors accordingly.
     */
    const handleUpload = async (e:any) => {       
        let uploadedImageUrls: string[]=[];
        e.preventDefault()
       // Access the file input element using the ref
       
        const fileInput = fileInputRef.current;
        
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            alert("Please select a file to upload");
            return;
        }      

        // Extract the files from input
        const files = Array.from(fileInput.files);
        //creating progress tracker array for each file uploaded
        setProgressList(new Array(files.length).fill(0));

        //creating uploads for each file
        const fileUploads = files.map(async (file,index)=>{
            //each uploaded file has its own abort control
            const { signature, expire, token, publicKey } = await authenticator();
            const abortController = new AbortController();
            return upload({
                file,
                fileName:file.name,
                signature, 
                expire, 
                token, 
                publicKey,
                onProgress: (event) => {
                    setProgressList(prev => {
                        const updated = [...prev];
                        updated[index] = (event.loaded / event.total) * 100;
                        return updated;
                    });

                },
                abortSignal: abortController.signal
            })
        })
            
        try {
            const results = await Promise.all(fileUploads);
            if(!results) return
            const urls = results.map(r=>r.url).filter(((url): url is string => Boolean(url))); 
            uploadedImageUrls = urls
            setImages(uploadedImageUrls)
        } catch (error) {
            // Handle specific error types provided by the ImageKit SDK.
            if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
            } else {
                // Handle any other errors that may occur.
                console.error("Upload error:", error);
            }
            }

            const payload = {
                name: itemName, itemQuantity:quantity, itemWeight:weight, price:itemPrice, images: images
            }

            try {
                await fetch('/api/product/add', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                })
            } catch (error) {
                return
            }
        }
        
    return (
        <div className="">
            <form onSubmit={handleUpload} ref={formRef}>
                {/* File input element using React ref */}
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">
                        Product Name
                    </label>
                    <input
                        id="product-name"
                        type="text"
                        placeholder="Type here"
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                        onChange={(e) => setItemName(e.target.value)}
                        value={itemName}
                        required
                    />
                </div>         
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">
                            Product Price
                        </label>
                        <input
                            id="product-price"
                            type="number"
                            placeholder="0"
                            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                            onChange={(e) => setItemPrice(Number(e.target.value))}
                            value={itemPrice}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">
                        Weight
                        </label>
                        <input
                        id="offer-price"
                        type="number"
                        placeholder="0"
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                        onChange={(e) => setWeight(e.target.value)}
                        value={weight}
                        required
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">
                            Quantity
                        </label>
                        <input
                            id="offer-price"
                            type="number"
                            placeholder="0"
                            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            value={quantity}
                            required
                        />
                    </div>
                </div>
                <div>
                    <input type="file" ref={fileInputRef} multiple/>
                    {/* Button to trigger the upload process */}
                    {/* <button type="submit">
                        Upload Product Images
                    </button> */}
                    <br />
                    <div className="preview-grid">
                        {
                            images.map((url,index)=>(
                                // <Image key={url} src={url} alt="" width={100} height={100}/>
                                <label key={index} htmlFor={`image${index}`}>
                                    <input type="file" id={`image${index}`} hidden />
                                    <Image
                                        key={index}
                                        className="max-w-24 cursor-pointer"
                                        src={url}
                                        alt=""
                                        width={100}
                                        height={100}
                                    />
                                </label>
                            ))
                        }
                    </div>
                    {/* Display the current upload progress */}
                    {
                        progressList.map((percent,index)=>(
                            <div key={index}>
                                File {index + 1}: <progress value={percent} max={100}></progress>
                            </div>
                        ))
                    }                    
                </div>
                <button type="submit" className="px-8 py-2.5 bg-orange-600 text-white font-medium rounded">
                    ADD
                </button>
            </form>
        </div>
    );
};

export default ImageUploader;