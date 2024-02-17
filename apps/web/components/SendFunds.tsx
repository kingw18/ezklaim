import { Button, Input } from "@nextui-org/react";

export default function SendFunds() {
    return (
        <div className="mt-10 ml-4 mr-4 mb-10 flex flex-col h-full justify-between">
            <Input type="email" label="Email" placeholder="Enter Receiver email" />
            <div className=" w-full flex justify-center">
                <Button className="w-1/2" >Send Fund</Button>
            </div>
        </div>
    );
}