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
            <p className="text-2xl lg:text-4xl w-4/5 pt-2 text-center font-montserrat font-extralight text-snow text-shadow-lg shadow-zinc-900">
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
            <h3 className="font-oyster text-4xl lg:text-5xl">
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

      <BodySection id="wear" className="!bg-wine">
        <SectionHeading heading="wear" color="text-wheat" />
        <div className="w-5/6 lg:w-3/5 prose prose-headings:text-wheat prose-p:text-snow prose-p:font-light prose-xl">
          <h3 className="text-5xl font-oyster">Cocktail attire</h3>
          <p>
            Join us for an elegant celebration under the open sky! While our
            venue may be rustic, we're encouraging our guests to look dapper.
            Get ready to celebrate in style amidst the charm of the outdoors on
            an early October evening.
          </p>
          <p className="!font-bold">
            To put it simply, plan on wearing{" "}
            <a
              href="https://www.loveyouwedding.com/wedding-cocktail-attire/"
              className="underline text-peach"
            >
              cocktail attire.
            </a>
          </p>
          <h3 className="text-5xl font-oyster">yet... Dress for the Weather</h3>
          <p>
            Even though we hope to have a beautiful outdoor wedding, it{" "}
            <i>is</i> autumn in Pennsylvania. Some rain in always possible and a
            crisp evening is likely.{" "}
            <span className="font-bold">
              The walk from from the parking lot to the ceremony is ~200 yards
              through a field. If it's been raining, the ground could be a bit
              muddy.
            </span>
          </p>
          <p>
            It&apos;s a good idea to bring a jacket to keep warm in the evening.
            We also recommend bringing along a pair of flats or comfortable
            shoes to make the walk easier. (Or just rock some smart-looking
            boots!)
          </p>
          <p>
            The lodge will be open and we&apos;ll have a couple fires going in
            the evening, so we should be able to manage whatever Penn's fickle
            woods throws our way.
          </p>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center gap-8 mt-10 w-4/5">
          <Image
            src="/cocktail_attire_2.jpeg"
            alt="Cocktail attire example"
            width={400}
            height={300}
            className="rounded-2xl shadow-xl w-full lg:w-2/6"
          />
          <Image
            src="/cocktail_attire_1.webp"
            alt="Cocktail attire example"
            width={400}
            height={300}
            className="rounded-2xl shadow-xl w-2/5 lg:w-1/6"
          />
          <Image
            src="/cocktail_attire_3.jpg"
            alt="Cocktail attire example"
            width={400}
            height={300}
            className="rounded-2xl shadow-xl w-2/5 lg:w-1/5"
          />
        </div>
      </BodySection>

      <BodySection id="registry">
        <SectionHeading heading="registry" />
      </BodySection>
    </main>
  );
}
