import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { ConnectKitButton } from "connectkit";

export default function Header() {
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
                            <a href="/api/auth/login">Login</a>
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