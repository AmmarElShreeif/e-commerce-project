"use client";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptionsMode } from "@stripe/stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import { useSearchParams } from "next/navigation";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY) {
  throw console.log("NEXT_PUBLIC_STRIPE_PUBLISHER_KEY is not defind");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

const Checkout = () => {
  const searchParams = useSearchParams();
<<<<<<< HEAD

  const options: StripeElementsOptionsMode = {
=======
  const options = {
>>>>>>> 9f47865e745d76ba79d26200f29718044800f627
    mode: "payment",
    currency: "usd",
    amount: Number(searchParams.get("amount")) * 100,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={Number(searchParams.get("amount"))} />
    </Elements>
  );
};

export default Checkout;
