"use client";
import { useCart } from "@/context/CartContext";
import { useUser } from "@clerk/nextjs";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripeError } from "@stripe/stripe-js";
import { useState } from "react";
import { useRouter } from "next/navigation";
import OrderApis from "@/services/OrderApis";
import CartApis from "@/services/CartApis";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Button } from "@/components/ui/button";

export default function CheckoutForm({ amount }: { amount: number }) {
  const { cartItems } = useCart();
  const { user } = useUser();
  const stripe = useStripe();
  const elements = useElements();
  const [, setLoading] = useState(false);
  const [, setErrorMessage] = useState<string | undefined>();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const router = useRouter();

  const createOrder = async () => {
    const productsIds = [];
    cartItems.forEach((el) => productsIds.push(el?.product?.documentId));
    const data = {
      data: {
        email: user?.primaryEmailAddress?.emailAddress,
        username: user?.fullName,
        amount,
        products: [],
      },
    };
    try {
      const res = await OrderApis.createOrder(data);
      if (res) {
        cartItems.forEach((el: { documentId: string }) => {
          CartApis.deleteCartItem(el?.documentId).then(() => {});
        });
      }
    } catch (error) {
      console.log("error from order", error);
    }
  };

  const handleError = (error: StripeError) => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  createOrder();

  const handleSubmit = async (event: React.FormEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    setIsSubmiting(true);

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    try {
      // Trigger form validation and wallet collection
      const { error: submitError } = await elements.submit();
      if (submitError) {
        handleError(submitError);
        return;
      }

      const res = await fetch("api/create-intent", {
        method: "POST",
        body: JSON.stringify({ amount: amount }),
      });
      const { client_secret: clientSecret } = await res.json();

      const result = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        clientSecret,
        elements,
        confirmParams: {
          return_url: `${router.push("/")}`,
        },
      });

      if (result.error) {
        // Show error to your customer (for example, payment details incomplete)
        console.log(result.error.message);
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    } catch (error) {
      console.log("error from stripe", error);
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <form onSubmit={handleSubmit}>
          <div className="mx-[10px] md:mx-[320px] mt-12">
            <PaymentElement />
            <Button
              className="w-full mt-6"
              size="lg"
              // onClick={handleCheckout}
              // disabled={isCheckingOut}
            >
              {isSubmiting ? "Submiting..." : <>Submit</>}
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
