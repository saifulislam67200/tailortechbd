export const truncateWords = (str: string, numWords = 5) => {
  const words = str.split(" ");
  return words.length > numWords ? words.slice(0, numWords).join(" ") + "…" : str;
};

export const truncateChars = (str: string, maxChars = 100): string => {
  return str.length > maxChars ? str.slice(0, maxChars) + "…" : str;
};
export const generateQueryParams = (params: Record<string, unknown>) => {
  let queryString = "";
  const entries = Object.entries(params);

  entries.forEach(([key, value], i) => {
    const isLast = i === entries.length - 1;
    if (value) {
      if (isLast) {
        queryString += `${key}=${value}`;
      } else {
        queryString += `${key}=${value}&`;
      }
    }
  });

  return queryString;
};

export const getProductDiscountPrice = (originalPrice: number, discount: number = 0): number => {
  const discountPrice = originalPrice - (originalPrice * discount) / 100;
  return discountPrice;
};

export const pageScroll = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
