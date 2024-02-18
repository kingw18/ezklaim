"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { ConnectKitButton } from "connectkit";

export default function Header() {

    const { user } = useUser();

    return (
        <Navbar className="bg-zinc-900" >
            <NavbarBrand >
                <div className="text-3xl">
                    eZKlaim
                </div>
            </NavbarBrand>
            <NavbarContent >
                <div className="flex justify-end w-full gap-8">
                    <NavbarItem>
                        <Button>
                            {user ? <a href="/api/auth/logout">Logout</a> :<a href="/api/auth/login">Login</a>}
                        </Button>
                    </NavbarItem>
                    <NavbarItem >
                        <ConnectKitButton />
                    </NavbarItem>
                </div>
            </NavbarContent>
        </Navbar>
    );
}