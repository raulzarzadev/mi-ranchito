import Head from "next/head";
import React from "react";
import Layout from "../src/components/Layout";
import ManageCows from "../src/components/ManageCows/ManageCows";

export default function Demo() {
  return (
    <>
      <Head>
        <title>Mi Ranchito - vacas</title>
      </Head>
      <ManageCows />
    </>
  );
}

Demo.Layout = Layout;
