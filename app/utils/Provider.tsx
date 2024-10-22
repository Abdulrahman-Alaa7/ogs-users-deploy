"use client";
import React from "react";
import { client } from "../../graphql/gql.setup";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "./ThemeProvider";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ApolloProvider>
  );
}
