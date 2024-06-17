const countdownList: CountdownListItem[] = [
  {
    title: "Planning",
    description:
      "Save the dates have been sent! We're working out a few more details before sending out invites.",
    active: true,
    revealType: "string",
    revealString: "now",
  },
  {
    title: "Invites Sent",
    description:
      "Our invites have been sent and most of the details have been finalized. Put on your dancing shoes and let us know your RSVP!",
    active: false,
    revealType: "string",
    revealString: "mid-July",
  },
  {
    title: "Plans Finalized",
    description:
      "We're a couple weeks out and the plans and the guest list are all being finalized.",
    active: false,
    revealType: "string",
    hideRevealString: true,
    revealString: "Get your invites in by September 23rd!",
  },
  {
    title: "Getting close!",
    description:
      "We're shy of a fortnight and look forward to celebrating with everyone!",
    active: false,
    revealType: "date",
    revealDate: new Date("October 1, 2024"),
  },
  {
    title: "Wedding day!",
    active: false,
    revealType: "date",
    revealDate: new Date("October 12, 2024"),
  },
];

export default function Nav() {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {countdownList.map((stage, index) => (
        <li className="flex justify-between gap-x-6 py-5" key={index}>
          <h2 className="font-bambi">{stage.title}</h2>
          <p>{stage.active && stage.description}</p>
          <p>
            {!stage.active &&
              stage.revealType === "string" &&
              !stage.hideRevealString &&
              stage.revealString}
          </p>
          <p>
            {!stage.active &&
              stage.revealType === "date" &&
              stage.revealDate.toString()}
          </p>
        </li>
      ))}
    </ul>
  );
}

interface CountdownListItemBase {
  title: string;
  active: boolean;
  description?: string;
  revealType: "date" | "string";
}

interface DateReveal extends CountdownListItemBase {
  revealType: "date";
  revealDate: Date;
}

interface StringReveal extends CountdownListItemBase {
  revealType: "string";
  revealString: string;
  hideRevealString?: boolean;
}

type CountdownListItem = StringReveal | DateReveal;
