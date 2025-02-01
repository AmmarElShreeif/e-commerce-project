"use client";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
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
  const [error, setError] = useState("");
  const router = useRouter();

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfPassword(e.target.value);
    setError("");
  };

  const handleMatchPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confPassword) {
      setError("Passwords do not match!");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!isLoaded) return;

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      // Set 'verifying' true to display second form
      // and capture the OTP code
      setVerifying(true);
      setLoading(false);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.push("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
        setLoading(false);
      }
    } catch (err) {
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  if (verifying) {
    return (
      <div className="flex justify-center gap-7 items-center flex-row min-h-screen text-center mx-auto">
        <form onSubmit={handleVerify}>
          <label className="block text-xl mb-4 font-semibold text-secoundry-100">
            Enter your verification code
          </label>
          <input
            className="w-full block px-4 py-2 mt-1 mb-4 outline-none border border-primary-200 rounded-md focus:ring-secoundry-100"
            value={code}
            type="text"
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter code from 6 digits"
          />
          <button
            type="submit"
            className="w-1/2 text-center rounded-md bg-primary-100 py-3 px-5 text-white font-semibold"
          >
            {loading ? "Verify...!" : "Verify"}
          </button>
          <button
            onClick={() => router.back()}
            className="w-1/2 text-center text-secoundry-100 underline font-semibold mt-3"
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
          <div className="max-w-xl lg:max-w-3xl">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
                handleMatchPassword(e);
              }}
              action="#"
              className="mt-8 grid grid-cols-6 gap-6"
            >
              <div className="col-span-6 sm:col-span-3">
                <Input
                  type="text"
                  label="First Name"
                  value={firstName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFirstName(e.target.value)
                  }
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Input
                  type="text"
                  label="Last Name"
                  value={lastName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setLastName(e.target.value)
                  }
                />
              </div>

              <div className="col-span-6">
                <Input
                  label="Email"
                  type="email"
                  value={emailAddress}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmailAddress(e.target.value)
                  }
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Input
                  label="Password Confirmation"
                  type="password"
                  value={confPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>

              <div className="col-span-6">
                {error && (
                  <p className="flex items-center text-red-500 font-medium text-sm">
                    <MessageCircleWarningIcon size={25} className="mr-1" />{" "}
                    {error}
                  </p>
                )}
              </div>

              <div className="col-span-6">
                <label htmlFor="MarketingAccept" className="flex gap-4">
                  <input
                    type="checkbox"
                    id="MarketingAccept"
                    name="marketing_accept"
                    className="size-5 py-2 rounded-md border border-primary-200 bg-white shadow-sm"
                  />

                  <span className="text-sm text-primary-100">
                    I want to receive emails about events, product updates and
                    company announcements.
                  </span>
                </label>
              </div>

              <div className="col-span-6">
                <p className="text-sm text-primary-200">
                  By creating an account, you agree to our
                  <a href="#" className="text-primary-100 underline">
                    {" "}
                    terms and conditions{" "}
                  </a>
                  and
                  <a href="#" className="text-primary-100 underline">
                    privacy policy
                  </a>
                  .
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button className="inline-block shrink-0 rounded-md border border-primary-100 bg-primary-100 px-12 py-3 text-sm font-semibold text-white transition hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-primary-100">
                  Create an account
                </button>

                <p className="mt-4 text-sm text-primary-200 sm:mt-0">
                  Already have an account?{" "}
                  <Link href="/sign-in" className="text-primary-100 underline">
                    Log in
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default SignUp;
