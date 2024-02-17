import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

export default function ReceiveFunds() {
    const [activeTab, setActiveTab] = useState('proof');

    function generateProof() {
        // TODO: generate proof
        setActiveTab('claim');
    }

    function claimFund() {
        // TODO: claim fund

    }
    return (
        <div className="h-full" >
            {activeTab == 'proof' ?
                (
                    <div className="pt-10 pl-4 pr-4 pb-10 h-full flex flex-col justify-between">
                        <Input type="email" label="Fund Id" placeholder="Enter Fund ID from sender" />
                        <Input type="email" label="Email" placeholder="Enter Your email" />
                        <div className=" w-full flex justify-center">
                            <Button
                                onClick={generateProof}
                                className="w-1/2" >Generate Proof</Button>
                        </div>
                    </div>
                ) : (
                    <div className="pt-10 pl-4 pr-4 pb-10 flex flex-col h-full justify-between">

                        Proof Generated!!
                        <div className=" w-full flex justify-center items-end">
                            <Button
                                onClick={claimFund}
                                className="w-1/2" >Claim Fund</Button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}