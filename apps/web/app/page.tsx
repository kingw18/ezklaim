import styles from "./page.module.css";
import NoirComponent from "../components/noir";
import ConnectWalletComponent from "../components/ConnectWallet";
import Link from "next/link";



export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <NoirComponent />
      <ConnectWalletComponent />
      <a href="/api/auth/login">Login</a>
    </main>
  );
}
