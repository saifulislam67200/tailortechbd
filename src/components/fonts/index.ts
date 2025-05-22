// Example: in layout.tsx or page.tsx
import { Source_Sans_3 } from "next/font/google";

export const sourceSansPro = Source_Sans_3({
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
