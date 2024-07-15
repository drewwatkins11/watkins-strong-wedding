const countdownList: CountdownListItem[] = [
  {
    title: "Planning",
    description:
      "We're working out a few more details before sending out invites.",
    complete: true,
    revealType: "string",
    revealString: "now",
  },
  {
    title: "Invites Sent",
    preDescription: "Invites will start going out in a couple weeks.",
    description:
      "Our invites have been sent and most of the details have been finalized. Put on your dancing shoes and let us know your RSVP!",
    complete: true,
    showPreDescription: true,
    revealType: "string",
    revealString: "mid-July",
  },
  {
    title: "Finalizing Plans",
    preDescription:
      "Letting us know your RSVP by September 7th will help us finalize our planning.",
    description:
      "We're a few weeks out and the plans and the guest list have all been finalized. \n\n You should also have your hotel and travel plans set if you haven't yet.",
    complete: false,
    showPreDescription: true,
    revealType: "date",
    revealDate: new Date("September 7, 2024"),
    dateFormat: { month: "long", day: "numeric" },
  },
  {
    title: "Getting close!",
    description:
      "We're shy of a fortnight and look forward to celebrating with everyone!",
    complete: false,
    revealType: "date",
    revealDate: new Date("October 1, 2024"),
    dateFormat: { month: "long" },
  },
  {
    title: "Wedding day!",
    complete: false,
    revealType: "date",
    revealDate: new Date("October 12, 2024"),
  },
];

export default function Countdown() {
  const currentTaskIndex =
    countdownList.filter((task) => task.complete).length - 1;

  return (
    <ul role="list" className="rounded-md">
      {countdownList.map((stage, index) => (
        <li
          key={index}
          className={`flex flex-col justify-between py-5 px-12 
              ${index === 0 && "pt-0 lg:pt-6 rounded-t-md"}
              ${index <= currentTaskIndex && "text-wine"} 
              ${
                index === currentTaskIndex &&
                "bg-snow text-wine pb-6 scale-105 drop-shadow-2xl border-2 rounded-md my-2"
              }
              ${index > currentTaskIndex && "text-zinc-500"}
            `}
          style={{
            borderImage:
              index === currentTaskIndex
                ? "linear-gradient(90deg, #AE8625 -0.03%, #E0AA3E 37.97%, #F6D086 71.48%, #B88A44 99.98%) 1"
                : "",
          }}
        >
          {!stage.complete && (
            <p className="mb-1 font-light italic">
              {stage.revealType === "string" &&
                !stage.hideRevealString &&
                stage.revealString}
              {stage.revealType === "date" &&
                stage.revealDate.toLocaleDateString(
                  "en-us",
                  stage.dateFormat || {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  }
                )}
            </p>
          )}
          <h2
            className={`font-montserrat shadow-none text-shadow-none font-extrabold text-xl uppercase ${
              index > currentTaskIndex && "font-semibold"
            }`}
          >
            {stage.title}
          </h2>
          {!stage.complete &&
            stage.preDescription &&
            stage.showPreDescription !== false && <p>{stage.preDescription}</p>}
          <p>{stage.complete && stage.description}</p>
        </li>
      ))}
    </ul>
  );
}

interface CountdownListItemBase {
  title: string;
  complete: boolean;
  preDescription?: string;
  showPreDescription?: boolean;
  description?: string;
  revealType: "date" | "string";
}

interface DateReveal extends CountdownListItemBase {
  revealType: "date";
  revealDate: Date;
  dateFormat?: Intl.DateTimeFormatOptions;
}

interface StringReveal extends CountdownListItemBase {
  revealType: "string";
  revealString: string;
  hideRevealString?: boolean;
}

type CountdownListItem = StringReveal | DateReveal;
