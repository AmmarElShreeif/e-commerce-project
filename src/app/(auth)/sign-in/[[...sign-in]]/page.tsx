"use client";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "@/components/Input";
import Image from "next/image";
import { MessageCircleWarningIcon } from "lucide-react";
import Link from "next/link";

const LogIn = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { signUp } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    await signUp?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/",
      redirectUrlComplete: "/",
    });
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      setError("");
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/");
      } else {
        // If the status is not complete, check why. User may need to
        alert("user or password is wron");
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setError("The email or password is invalid");
    }
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative bg-no-repeat bg-[url('/hero-sec.png')] bg-blend-multiply bg-gray-600 lg:col-span-5 lg:h-full xl:col-span-6">
          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to TrendHive
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Step into TrendHive, your ultimate destination for modern and
              stylish clothing. Explore a curated collection of trendy apparel
              and accessories designed to elevate your wardrobe.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 w-full py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl w-3/4">
            <form
              onSubmit={handleSubmit}
              action="#"
              className="mt-8 flex flex-col w-full gap-6"
            >
              <div>
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
              </div>

              <div>
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={handlePassword}
                />
              </div>

              <div className="">
                {error && (
                  <p className="flex items-center text-red-500 font-medium text-sm">
                    <MessageCircleWarningIcon size={25} className="mr-1" />{" "}
                    {error}
                  </p>
                )}
              </div>

              <div className="w-full sm:flex sm:items-center sm:gap-4">
                <button className="w-full rounded-md border border-primary-100 bg-primary-100 px-12 py-3 text-sm font-semibold text-white transition hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-primary-100">
                  Sign In
                </button>
              </div>
            </form>
            <div className="flex flex-col items-center justify-center mt-4 space-y-10">
              <div className="text-center">
                <p className="mt-4 text-base text-center text-primary-100 sm:mt-0">
                  Have not an account?{" "}
                  <Link href="/sign-up" className="text-primary-200 underline">
                    Sign Up
                  </Link>
                  .
                </p>
              </div>
              <p className="text-base text-primary-100 font-semibold">
                Or Contunie with
              </p>
              <button
                onClick={handleGoogleSignIn}
                className="flex w-full border text-primary-100 border-primary-100 hover:bg-secoundry-200 rounded-md py-2 items-center justify-center"
              >
                <Image
                  src="/logos/google.svg"
                  alt="google"
                  width={30}
                  height={30}
                />
                Sign In With Google
              </button>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default LogIn;
