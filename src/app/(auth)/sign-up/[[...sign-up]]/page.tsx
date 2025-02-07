"use client";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Input from "../../../../components/Input";
import { MessageCircleWarningIcon } from "lucide-react";
import Link from "next/link";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    try {
      await signUp?.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      console.error("Error during Google OAuth:", err);
      setGoogleLoading(false);
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfPassword(e.target.value);
    if (password !== e.target.value) {
      setError("Passwords do not match!");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerifying(true);
    } catch (err: any) {
      if (err.errors) {
        setError(err.errors[0].message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.push("/");
      }
    } catch (err: any) {
      if (err.errors) {
        setError(err.errors[0].message);
      } else {
        setError("Verification failed. Please try again.");
      }
      console.error("Error:", JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="flex justify-center gap-7 items-center flex-row min-h-screen text-center mx-auto">
        <form onSubmit={handleVerify} className="w-full max-w-sm">
          <label className="block text-xl mb-4 font-semibold text-secoundry-100">
            Enter your verification code
          </label>
          <input
            className="w-full block px-4 py-2 mt-1 mb-4 text-secoundry-100 outline-none border border-primary-200 rounded-md focus:ring-secoundry-100"
            value={code}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setCode(value.slice(0, 6));
            }}
            placeholder="Enter 6-digit code"
          />
          {error && (
            <p className="flex items-center text-red-500 font-medium text-sm mb-4">
              <MessageCircleWarningIcon size={20} className="mr-1" />
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full text-center rounded-md bg-primary-100 hover:primary-200 py-3 px-5 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>
          <button
            type="button"
            onClick={() => setVerifying(false)}
            className="w-full text-center text-secoundry-100 underline font-semibold mt-3"
          >
            Edit Email
          </button>
        </form>
      </div>
    );
  }

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

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl w-full">
            <form
              onSubmit={handleSubmit}
              className="mt-8 grid grid-cols-6 gap-6"
            >
              <div className="col-span-6 sm:col-span-3">
                <Input
                  type="text"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Input
                  type="text"
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="col-span-6">
                <Input
                  label="Email"
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Input
                  label="Confirm Password"
                  type="password"
                  value={confPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>

              {error && (
                <div className="col-span-6">
                  <p className="flex items-center text-red-500 font-medium text-sm">
                    <MessageCircleWarningIcon size={20} className="mr-1" />
                    {error}
                  </p>
                </div>
              )}

              <div className="col-span-6">
                <label
                  htmlFor="marketingAccept"
                  className="flex gap-4 items-start"
                >
                  <input
                    type="checkbox"
                    id="marketingAccept"
                    name="marketing_accept"
                    className="mt-1 size-5 rounded-md border border-primary-200 bg-white shadow-sm"
                  />
                  <span className="text-sm text-primary-100">
                    I want to receive emails about events, product updates and
                    company announcements.
                  </span>
                </label>
              </div>

              <div className="col-span-6">
                <p className="text-sm text-primary-200">
                  By creating an account, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="text-primary-100 underline hover:text-primary-300"
                  >
                    terms and conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-primary-100 underline hover:text-primary-300"
                  >
                    privacy policy
                  </Link>
                  .
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-block shrink-0 rounded-md border border-primary-100 bg-primary-100 px-12 py-3 text-sm font-semibold text-white transition hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-primary-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating account..." : "Create an account"}
                </button>

                <p className="mt-4 text-sm text-primary-200 sm:mt-0">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="text-primary-100 underline hover:text-primary-300"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </form>

            <div className="space-y-3 mt-6">
              <p className="text-base text-primary-100 font-semibold text-center">
                Or continue with
              </p>
              <button
                onClick={handleGoogleSignUp}
                disabled={googleLoading}
                aria-label="Sign up with Google"
                className="flex w-full border text-primary-100 border-primary-100 hover:bg-secoundry-200 rounded-md py-2 items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Image
                  src="/logos/google.svg"
                  alt="Google logo"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <span>
                  {googleLoading ? "Redirecting..." : "Continue with Google"}
                </span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default SignUp;
