import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useState } from "react";
import SendFunds from "./SendFunds";
import ReceiveFunds from "./ReceiveFunds";

export default function InputCard() {
    const [activeTab, setActiveTab] = useState('send');

    return (
        <div>
            <Card className="w-[500px] h-[450px] bg-zinc-800" >
                <CardHeader className="flex gap-3 mt-3">
                    <div
                        onClick={() => setActiveTab('send')}
                        className={`w-1/2 flex justify-center cursor-pointer ${activeTab === 'send' ? 'border-b-4 border-blue-500' : ''}`}
                    >
                        <p className="text-xl font-inter">Send Funds</p>
                    </div>
                    <div
                        onClick={() => setActiveTab('receive')}
                        className={`w-1/2 flex justify-center cursor-pointer ${activeTab === 'receive' ? 'border-b-4 border-blue-500' : ''}`}
                    >
                        <p className="text-xl font-inter">Receive Funds</p>
                    </div>
                </CardHeader>
                <CardBody >
                    {activeTab == 'send' ? <SendFunds /> : <ReceiveFunds />}
                </CardBody>
            </Card>
        </div>
    );
}
