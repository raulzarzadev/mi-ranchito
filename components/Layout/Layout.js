import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./styles.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className={styles.header}>
        <div>
          <h4>miranchito.digital</h4>
        </div>
        <nav className={styles.nav}>
          <Link href="/">
            <div className={styles.nav_link}>
              <a>Inicio</a>
            </div>
          </Link>
          <Link href="/dashboard">
            <div className={styles.nav_link}>
              <a>Vacas</a>
            </div>
          </Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        {"Una app creada por"} <a href="https://raulzarza.com">Raúl Zarza</a>
      </footer>
    </div>
  );
}
