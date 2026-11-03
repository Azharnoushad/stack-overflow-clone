"use client"

import { ThemeProviderProps } from "next-themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  // React 19 warns about client-rendered <script> tags; the inline theme script only needs to run from the server HTML.
  const scriptProps =
    typeof window === "undefined" ? undefined : ({ type: "application/json" } as const);

  return (
    <NextThemesProvider scriptProps={scriptProps} {...props}>
      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;
