import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Web3Provider } from './WalletProvider.tsx'
import { NextUIProvider } from "@nextui-org/react";
import "@fontsource/inter";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <Web3Provider >
        <main className="purple-dark text-foreground bg-background">
          <App />
        </main>
      </Web3Provider>
    </NextUIProvider>
  </React.StrictMode >,
)
