import { VerifiedIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const PaymentConfirm = () => {
  return (
    <div className="flex flex-col items-center justify-center px-5 mt-4">
      <VerifiedIcon color="green" size={60} />
      <h2 className="text-[24px] font-bold text-primary-100">
        Payment Successful !
      </h2>
      <h2 className="text-[17px] text-center font-semibold mt-6 text-primary-200">
        We sent an Email with your order confirmation along with digital content
      </h2>
      <Link
        href="/"
        className="py-2 px-4 mt-6 text-white rounded-md font-bold bg-primary-100 hover:bg-primary-200"
      >
        Go To Home
      </Link>
    </div>
  );
};

export default PaymentConfirm;
