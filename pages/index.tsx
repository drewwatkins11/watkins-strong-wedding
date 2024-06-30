import Countdown from "@/components/countdown";
import Image from "next/image";

function SectionHeading({
  color,
  heading,
}: {
  color?: string;
  heading: string;
}) {
  return (
    <h2
      className={`font-oyster text-8xl lg:text-8xl text-center lg:self-start lg:text-left mb-6 -mt-8 capitalize ${
        color || "text-wheat"
      }`}
    >
      {heading}
    </h2>
  );
}

const BodySection = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className={`flex flex-col items-center text-center w-full lg:text-center bg-sage lg:px-8 py-12 lg:p-24 ${
        className && className
      }`}
      {...props}
    >
      {children}
    </div>
  );
};

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center`}>
      <div
        className="flex flex-col w-full items-end p-8 lg:p-24 bg-forest text-snow bg-cover bg-top lg:bg-left-top gap-6"
        style={{ backgroundImage: `url('drew_ainsley_wedding.jpg')` }}
      >
        <div className="flex flex-col items-center w-full lg:w-2/3 gap-8">
          <div className="text-shadow-xl shadow-green-950 flex flex-col items-center gap-4">
            <div
              className="lg:border-b-2 pb-4"
              style={{
                borderImage:
                  "linear-gradient(90deg, #AE8625 -0.03%, #E0AA3E 37.97%, #F6D086 71.48%, #B88A44 99.98%) 1",
              }}
            >
              <h1 className="font-oyster text-8xl inline-block text-parchment text-center lg:text-bigFix">
                Forever Awaits
              </h1>
            </div>
            <Image
              src="/drew_ainsley_yard_cropped.png"
              alt="Drew and Ainsley standing together"
              width="1200"
              height="1200"
              className="shadow-xl lg:hidden"
            />
            <p className="text-2xl lg:text-4xl w-4/5 lg:w-2/3 pt-2 text-center font-montserrat font-extralight text-snow text-shadow-lg shadow-zinc-900">
              Join Drew & Ainsley as they tie the knot on October 12th
            </p>
          </div>
          <div className="w-11/12 lg:w-4/5 bg-parchment text-zinc-600  text-center pb-6 shadow-xl mt-4 lg:mt-0">
            <h3 className="font-oyster text-wine text-5xl lg:text-7xl m-5 lg:my-5">
              The countdown
            </h3>
            <Countdown />
          </div>
        </div>
      </div>

      <BodySection id="when">
        <SectionHeading heading="when" />
        <div>
          <strong>
            <h3 className="font-oyster text-5xl">
              Saturday, October 12th, 2024
            </h3>
          </strong>
          <p>Ceremony: 3:30pm</p>
          <p>Reception: ~5:30pm</p>
          <p className="text-xl">
            *We're still finalizing the schedule. Check back closer to the
            wedding for the full rundown.
          </p>
        </div>
      </BodySection>

      <BodySection id="where">
        <SectionHeading heading="where" />
        <p>
          Wilderness Lodge
          <br />
          13448 Weeks Valley Rd
          <br />
          Wattsburg, PA 16442
        </p>
      </BodySection>

      <BodySection id="who">
        <SectionHeading heading="who" />
        <div>
          <h2>Drew</h2>
        </div>
        <div>
          <h2>Ainsley</h2>
        </div>
      </BodySection>

      <BodySection id="wear">
        <SectionHeading heading="wear" />
        <p className="text-5xl font-oyster">Cocktail attire</p>
        <p className="text-xl w-4/5">
          Join us for an elegant celebration under the open sky! While our venue
          may be rustic, we're encouraging our guests to look dapper. Get ready
          to celebrate in style amidst the charm of the outdoors on an early
          October evening.
        </p>
      </BodySection>

      <BodySection id="registry">
        <SectionHeading heading="registry" />
      </BodySection>
    </main>
  );
}
