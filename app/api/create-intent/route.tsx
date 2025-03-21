import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2025-02-24.acacia",
});
export async function POST(request: Request) {
  const data = await request.json();
  const amount = data.amount;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "USD",
    });
    return NextResponse.json(paymentIntent.client_secret, { status: 200 });
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    } else {
      return new NextResponse(JSON.stringify({ error: "An unexpected ُbug" }), {
        status: 500,
      });
    }
  }
}
