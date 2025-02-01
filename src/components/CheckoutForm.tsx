"use client";
import { CartContext } from "@/context/CartContext";
import CartApis from "@/utils/CartApis";
import OrderApis from "@/utils/OrderApis";
import { useUser } from "@clerk/nextjs";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripeError } from "@stripe/stripe-js";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

const CheckoutForm = ({ amount }: { amount: number }) => {
  const { cart } = useContext(CartContext);
  const { user } = useUser();
  const stripe = useStripe();
  const elements = useElements();
  const [, setLoading] = useState(false);
  const [, setErrorMessage] = useState<string | undefined>();
  const router = useRouter();

  const createOrder = async () => {
    const productsIds = [];
    cart.forEach((el: { product: { documentId: string } }) =>
      productsIds.push(el?.product?.documentId)
    );
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
        cart.forEach((el: { documentId: string }) => {
          CartApis.deleteCartItem(el?.documentId).then(() => {});
        });
      }
    } catch (error) {
      console.log("error from order", error);
    }
  };

  // const sendEmail = async () => {
  //   const _ = await fetch("api/send-email", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       amount: amount,
  //       email: user?.primaryEmailAddress?.emailAddress,
  //       fullName: user?.fullName,
  //     }),
  //   });
  // };

  const handleError = (error: StripeError) => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  createOrder();

  // send email
  // sendEmail();

  const handleSubmit = async (event: React.FormEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

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
        return_url: "http://localhost:3000/payment-confirm",
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-32 md:mx-[320px] mt-12">
        <PaymentElement />
        <button
          onClick={() => router.push("/payment-confirm")}
          className="w-full p-2 mt-4 text-white font-bold rounded-md bg-primary-100"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
