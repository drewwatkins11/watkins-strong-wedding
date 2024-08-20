import Image from "next/image";
import { ReactNode } from "react";

export default function UnderConstruction({
  message,
}: {
  message: string | ReactNode;
}) {
  return (
    <>
      <p className="font-semibold font-montserrat text-2xl my-12 p-8 bg-parchment rounded-lg shadow-lg border-4 border-burntOrange mx-auto">
        {message}
      </p>
      <div className="w-full h-44 lg:h-96">
        <Image
          src="/ainsley_boom_lift.png"
          alt="ainsley in a boom lift"
          width={600}
          height={600}
          className="absolute right-0 lg:h-96 w-4/5 lg:w-2/3 lg:w-auto"
          style={{ transform: "scaleX(-1)" }}
        />
      </div>
    </>
  );
}
