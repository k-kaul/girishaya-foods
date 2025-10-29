'use client'

import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { Card } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function NavBar(){
    const router = useRouter();
    const {user} = useUser();
    return (
        <div>
            <SignedIn>
                <UserButton>
                    <UserButton.MenuItems>
                        <UserButton.Action label="Cart" labelIcon={"Cart"} onClick={()=> router.push('/cart')}/>
                    </UserButton.MenuItems>
                    <UserButton.MenuItems>
                        <UserButton.Action label="My Orders" labelIcon={"order"} onClick={()=> router.push('/orders')}/>
                    </UserButton.MenuItems>
                </UserButton>
            </SignedIn>
            <SignedOut>
                <h1>
                    Account Info
                </h1>
            </SignedOut>
        </div>
    )
}