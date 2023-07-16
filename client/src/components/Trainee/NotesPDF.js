import React from "react";
import { Page, Text, Document, StyleSheet } from "@react-pdf/renderer";
import { Typography } from "@mui/material";

// Create styles
const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    paddingTop: 15,
    textAlign: "center",
  },
  body: {
    margin: 12,
    fontSize: 14,
  },
});

export const NotesPDF = ({ title, notes }) => {
  let c = "";
  for (let i = 0; i < notes.length; i++) {
    c += i + 1 + "- " + notes[i] + "\n" + "\n" + "\n";
  }
  return (
    <Document>
      <Page size={"A4"}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{c}</Text>
      </Page>
    </Document>
  );
};
