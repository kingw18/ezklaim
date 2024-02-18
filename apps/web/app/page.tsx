
import Image from "next/image";
import { Card } from "@repo/ui/card";
import { Code } from "@repo/ui/code";
import styles from "./page.module.css";
import { Button } from "@repo/ui/button";
import NoirComponent from "../components/noir";
import Link from "next/link";
import Home from "../components/Home"
import { Web3Provider } from '../components/WalletProvider'
import { getAccessToken } from "@auth0/nextjs-auth0";

export default  function Page(): JSX.Element {


  return (
      <main className="purple-dark">
        {/* <NoirComponent /> */} {/* check apps/web/components/ReceiveFunds.tsx */}
        <Home />
      </main>

  );
}
