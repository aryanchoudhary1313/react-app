import React from "react";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import PageThree from "./PageThree";

export default function Home({ serviceRef }) {
  return (
    <>
      <PageOne />
      <PageTwo serviceRef={serviceRef} />
      <PageThree />
    </>
  );
}
