import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { ConnectKitButton } from "connectkit";

export default function Header() {
    return (
        <Navbar className="bg-zinc-900" >
            <NavbarBrand >
                <div className="text-3xl">
                    EthZKClaim
                </div>
            </NavbarBrand>
            <NavbarContent >
                <div className="flex justify-end w-full">
                    <NavbarItem >
                        <ConnectKitButton />
                    </NavbarItem>
                </div>
            </NavbarContent>
        </Navbar>
    );
}