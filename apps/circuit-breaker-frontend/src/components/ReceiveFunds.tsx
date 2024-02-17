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
        <div >
            {activeTab == 'proof' ?
                (
                    <div className="mt-10 ml-4 mr-4 mb-10 flex flex-col h-full justify-between">
                        <Input type="email" label="Id" placeholder="Enter Fund ID" />
                        <Input type="email" label="Email" placeholder="Enter Your email" />
                        <div className=" w-full flex justify-center">
                            <Button
                                onClick={generateProof}
                                className="w-1/2" >Generate Proof</Button>
                        </div>
                    </div>
                ) : (
                    <div className="mt-10 ml-4 mr-4 mb-10 flex flex-col h-full justify-between">

                        Proof Generated!!
                        <div className=" w-full flex justify-center">
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