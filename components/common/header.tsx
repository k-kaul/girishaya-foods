import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Header(){
    return (
        <div>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    )
}