import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../src/components/Layout";
import ButtonLink from "../src/components/ButtonLink";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mi Ranchito Digital</title>
      </Head>

      <h1 className={styles.title}>Bienvendido a miranchito digital</h1>

      <p className={styles.description}>
        Administra mejor e incrementa tus ganacias
      </p>
      <div className={styles.actions}>
        <ButtonLink href="/demo" label="Demo Vacas lecheras" />
      </div>
    </>
  );
}

Home.Layout = Layout;
