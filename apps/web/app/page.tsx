import Image from "next/image";
import { Card } from "@repo/ui/card";
import { Code } from "@repo/ui/code";
import styles from "./page.module.css";
import { Button } from "@repo/ui/button";
import NoirComponent from "../components/noir";
import { getAccessToken } from "@auth0/nextjs-auth0";

export default async function Page(): Promise<JSX.Element> {

  let accessToken; 
  
  try {
    accessToken = (await getAccessToken()).accessToken;
  } catch (error) {
    console.error(error);
  }

  return (
    <main className={styles.main}>
      <NoirComponent />
    
      <a href="/api/auth/login">Login</a>
      <p>Access Token: {accessToken}</p>
    </main>
  );
}
