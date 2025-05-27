const sizeChartsConst: { label: string; chart: string[][] }[] = [
  {
    label: "T-Shirt",
    chart: [
      ["Size", "Chest (Round)", "Length", "Sleeve"],
      ["S", "38", "26", "7"],
      ["M", "40", "27", "7.5"],
      ["L", "42", "28", "8"],
      ["XL", "44", "29", "8.5"],
    ],
  },
  {
    label: "Shirt",
    chart: [
      ["Size", "Chest (Round)", "Length", "Sleeve"],
      ["S", "38", "27", "24"],
      ["M", "40", "28", "25"],
      ["L", "42", "29", "25.5"],
      ["XL", "44", "30", "26"],
    ],
  },
  {
    label: "Pants",
    chart: [
      ["Size", "Waist", "Length", "Inseam"],
      ["30", "30", "40", "29"],
      ["32", "32", "41", "30"],
      ["34", "34", "42", "31"],
      ["36", "36", "43", "32"],
    ],
  },
] as const;

export default sizeChartsConst;
