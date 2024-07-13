import Image from "next/image";

const bios: {
  name: string;
  img: string;
  photoStyle?: string;
  colorKey?: string;
  bio: string;
}[] = [
  {
    name: "Ainsley",
    img: "ainsley_canoe_border.png",
    colorKey: "darkGreen",
    photoStyle: "lg:mt-12",
    bio: `Born August 30th, 1995, Ainsley is a Michigander by birth and heart. She found herself in Erie after spending way too much money on her education. Now a badass doctor who only cries occasionally. Strong independent woman who "don't need no man, but somehow found a man". So here we are... She enjoys popcorn a little too much and believes chocolate is the only candy of importance, and dark chocolate is the best chocolate. Slightly obsessed with taking naps and playing in dirt.`,
  },
  {
    name: "Drew",
    img: "drew_canoe_border.png",
    photoStyle: "ml-8 lg:ml-20 w-11/12 ",
    bio: "Born April 21st, 1993, Drew grew up in Ohio and came of age in Arizona. Avid adventurer who once had the goal of summiting 30 14'ers by the age of 30, yet somehow found himself putting roots in the flatlands of Erie after meeting some girl named Ainsley. He inherited his family's knack for ingenuity but never quite mastered the art of focusing on one project at a time. He thrives on beef, Mexican cuisine, and bourbon, and has a definite weakness for popcorn. He has a love for adventure and playing in dirt, but napping remains an elusive skill.",
  },
];

export default function WhoContent() {
  return (
    <div className="flex flex-row flex-wrap gap-8 w-11/12 lg:w-4/5 mx-auto justify-around">
      {bios.map((bio) => (
        <div
          key={bio.name}
          className="flex flex-col gap-x-4 w-full lg:w-5/12 align-middle justify-center"
        >
          <h3>{bio.name}</h3>
          <Image
            alt={`photo of ${bio.name}`}
            src={`/${bio.img}`}
            width={400}
            height={400}
            className={`mx-auto ${bio.photoStyle}`}
            style={{ maxHeight: "375px", maxWidth: "375px" }}
          />
          <div
            className={`p-6 border-8 rounded-lg lg:h-full bg-latte text-lg shadow-lg ${
              bio.name === "Ainsley" ? "border-darkGreen" : "border-sage"
            } flex flex-col justify-around`}
          >
            <p className={` text-lg font-montserrat font-light`}>{bio.bio}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
