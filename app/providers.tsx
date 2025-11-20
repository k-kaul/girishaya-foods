'use client'

import { ClerkProvider } from "@clerk/nextjs";
import { ImageKitProvider } from "@imagekit/next";
import { AppContextProvider } from "@/context/AppContext";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    return (
        <AppContextProvider>
          <ClerkProvider>
            <ImageKitProvider urlEndpoint="https://ik.imagekit.io/iktdukrlb">
                {children}
            </ImageKitProvider>
          </ClerkProvider>    
        </AppContextProvider>
    )
}