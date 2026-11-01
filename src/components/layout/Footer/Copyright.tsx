import React from "react";
import Container from "../Container";
import Image from "next/image";
import GPAY from "@/assets/gpay.png";
import STRIPE from "@/assets/stripe.png";
import MS from "@/assets/ms.png";
import VISA from "@/assets/visa.png";

const Copyright = () => {
  return (
    <div className="">
      <Container>
        <div className="flex items-center justify-between h-[60px] border-t">
          <div>
            <p className="text-sm flex items-center">
              <span className="text-lg mr-1">&copy;</span> Copyright 2025 |
              Mentrovate All Rights Reserved | Terms & Conditions
            </p>
          </div>
          <div className="flex items-center space-x-5">
            <p className="text-xs font-semibold uppercase">We Accepts</p>
            <div className="bg-white relative h-[30px] w-[36px] overflow-hidden">
              <Image
                src={VISA}
                alt="VISA"
                fill
                className="w-full h-full object-contain"
              />
            </div>
            <div className="bg-white relative h-[30px] w-[36px] overflow-hidden">
              <Image
                src={MS}
                alt="MasterCard"
                fill
                className="w-full h-full object-contain"
              />
            </div>
            <div className="bg-white relative h-[30px] w-[36px] overflow-hidden">
              <Image
                src={STRIPE}
                alt="Stripe"
                fill
                className="w-full h-full object-contain"
              />
            </div>
            <div className="bg-white relative h-[30px] w-[36px] overflow-hidden">
              <Image
                src={GPAY}
                alt="GPAY"
                fill
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Copyright;
