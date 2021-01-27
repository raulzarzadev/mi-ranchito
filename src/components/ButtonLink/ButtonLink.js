import Link from "next/link";
import React from "react";
import styles from "./styles.module.css";

export default function ButtonLink({ href, label }) {
  return (
    <div className={styles.link}>
      <Link href={href}>{label}</Link>
    </div>
  );
}
