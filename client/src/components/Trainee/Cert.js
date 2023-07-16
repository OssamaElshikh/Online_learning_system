import React from "react";
import { Page, Document, Image } from "@react-pdf/renderer";
import { Typography } from "@mui/material";
import cert from "../../assets/cert.jpg";

export const Cert = () => {
  return (
    <Document>
      <Page size={"A4"}>
        <Image src={cert} />
      </Page>
    </Document>
  );
};
