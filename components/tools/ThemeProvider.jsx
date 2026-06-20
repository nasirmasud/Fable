// "use client";

// import { ThemeProvider as NextThemesProvider } from "next-themes";

// export function ThemeProvider({ children, ...props }) {
//   return (
//     <NextThemesProvider
//       attribute="class"
//       defaultTheme="dark"
//       enableSystem={false}
//       {...props}
//     >
//       {children}
//     </NextThemesProvider>
//   );
// }

"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      scriptProps={{ "data-cfasync": "false" }}  // ← এই line টা add করো
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}