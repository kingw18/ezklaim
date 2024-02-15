import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ConnectWallet } from '@thirdweb-dev/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col h-screen">
      <div className="w-full flex justify-end p-4">
        <ConnectWallet />
      </div>
      <div className="flex-grow">
        {/* Rest of the screen content goes here */}
      </div>
    </div>
  )
}

export default App
