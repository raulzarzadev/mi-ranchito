import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./styles.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.body}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className={styles.header}>
        <div>
          <h4>miranchito.digital</h4>
        </div>
        <nav className={styles.nav}>
        <Link href="/">
            <div className={styles.nav_link} >
              <a>H</a>
            </div>
          </Link>
          <Link href="/signin">
            <div className={styles.nav_link} >
              <a>Ingresa</a>
            </div>
          </Link>
          <Link href="/demo">
            <div className={styles.nav_link}>
              <a>Demo</a>
            </div>
          </Link>
        </nav>
      </header>
      <div className={styles.container}>
        <main>{children}</main>
      </div>
      <footer className={styles.footer}>
        {"Una app creada por"} <a href="https://raulzarza.com">Raúl Zarza</a>
      </footer>
    </div>
  );
}
