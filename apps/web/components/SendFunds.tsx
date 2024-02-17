import { useState } from 'react';
import { Button, Input } from "@nextui-org/react";

export default function SendFunds({ handleSendFunds }: { handleSendFunds: (email: string, amount: string) => void }) {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');

  const handleButtonClick = () => {
    handleSendFunds(email, amount);
  };

  return (
    <div className="mt-10 ml-4 mr-4 mb-10 flex flex-col h-full justify-between">
      <Input
        type="email"
        label="Email"
        placeholder="Enter Receiver email"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
      />
      <Input
        type="number"
        label="Amount"
        placeholder="Enter amount to send"
        value={amount}
        onChange={(e: any) => setAmount(e.target.value)}
      />
      <div className="w-full flex justify-center">
        <Button className="w-1/2" onClick={handleButtonClick}>Send Fund</Button>
      </div>
    </div>
  );
}
