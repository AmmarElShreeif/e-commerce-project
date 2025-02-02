export const navigationItems = [
  { name: "Products", href: "#products" },
  { name: "Features", href: "#Features" },
  { name: "Marketplace", href: "#marketplace" },
  { name: "Company", href: "#company" },
];

export const featuresItems = [
  {
    title: "Fast Delivery",
    desc: "Start from $10",
    image: "/features/delivery.png",
  },
  {
    title: "Money Guarantee",
    desc: "7 Days Back",
    image: "/features/piggy-bank.png",
  },
  {
    title: "365 Days",
    desc: "For free return",
    image: "/features/alarm.png",
  },
  {
    title: "Payment",
    desc: "Secure system",
    image: "/features/payment.png",
  },
];

export const socialMediaItems = [
  "/scoial/facebook.png",
  "/scoial/twitter.png",
  "/scoial/linkedin.png",
  "/scoial/github-sign.png",
];

export type ProductType = {
  [x: string]: string | number | never[] | any;
  id: string;
  documentId: string;
  image: never[] | string | any;
  rate: number;
  title: string;
  price: number;
  category: string;
};
