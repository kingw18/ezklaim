import styles from "./page.module.css";
import NoirComponent from "../components/noir";
import ConnectWalletComponent from "../components/ConnectWallet";



export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <NoirComponent />
      <ConnectWalletComponent />
    </main>
  );
}
