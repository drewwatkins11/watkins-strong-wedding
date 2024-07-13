"use client";

import { updateInvite } from "@/app/actions";
import { useEffect, useState, useTransition } from "react";

export default function FoodChoice(props) {
  const {
    pageId,
    inviteDetails,
    onComplete,
  }: { pageId: string; inviteDetails: Guest; onComplete: () => any } = props;

  const [beef, setBeef] = useState<number>(
    inviteDetails.dinnerPicks.beefDinnerCount ||
      // @ts-ignore
      inviteDetails.guestCount.claimed + inviteDetails.plusOnes.claimed ||
      0
  );
  const [salmon, setSalmon] = useState<number>(
    inviteDetails.dinnerPicks.salmonDinnerCount || 0
  );
  const [child, setChild] = useState<number>(
    inviteDetails.dinnerPicks.childDinnerCount || 0
  );
  const [vegan, setVegan] = useState<number>(
    inviteDetails.dinnerPicks.veganDinnerCount || 0
  );

  const [totalDinners, setTotalDinners] = useState<number>(
    beef + (salmon || 0) + (child || 0) + (vegan || 0)
  );

  const updateDinnerCount = (
    dinnerType: "beef" | "salmon" | "child" | "vegan",
    action: "add" | "subtract"
  ) => {
    const count = action === "add" ? 1 : -1;
    switch (dinnerType) {
      case "beef":
        if (beef > 0 || action === "add") setBeef(beef + count);
        break;
      case "salmon":
        // @ts-ignore
        if (totalDinners + count > inviteDetails.guestCount.claimed)
          if (beef > 0) setBeef(beef - count);
        setSalmon(salmon + count);
        break;
      case "child":
        // @ts-ignore
        if (totalDinners + count > inviteDetails.guestCount.claimed)
          if (beef > 0) setBeef(beef - count);
        setChild(child + count);
        break;
      case "vegan":
        // @ts-ignore
        if (totalDinners + count > inviteDetails.guestCount.claimed)
          if (beef > 0) setBeef(beef - count);
        setVegan(vegan + count);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setTotalDinners(beef + (salmon || 0) + (child || 0) + (vegan || 0));
  }, [beef, salmon, child, vegan]);

  const [isPending, startTransition] = useTransition();

  const submitGuests = () => {
    startTransition(async () => {
      await updateInvite(pageId, {
        dinnerPicks: {
          beefDinnerCount: beef,
          salmonDinnerCount: salmon,
          childDinnerCount: child,
          veganDinnerCount: vegan,
        },
      }).then(onComplete);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h4>Dinner Selections</h4>
      <p>
        Dinner will by catered by Chef Michael Jarzenski of "Feel Good BBQ
        Catering". We'll be serving buffet style and offering a "Steamship" as
        our featured meal (a whole leg of beef, slow-smoked and served at a
        carving station with creamy horseradish and roasted red pepper coulis).{" "}
        <i>
          (and our months have been watering since we set the menu in February!)
        </i>
      </p>
      <p>
        For those who have an aversion to beef, we will also be offering smoked
        salmon, along with alternative options for children and vegans (chef's
        choice for both).{" "}
      </p>
      <div className="flex flex-col gap-8 !text-black">
        <p>How many people in your party will be eating beef?</p>
        <div className="flex flex-row gap-8 items-center mx-auto">
          <button
            className="btn btn-circle"
            onClick={() => updateDinnerCount("beef", "subtract")}
            disabled={beef <= 0}
          >
            -
          </button>
          <div>{beef.toString()}</div>
          <button
            className="btn btn-circle"
            onClick={() => updateDinnerCount("beef", "add")}
            // @ts-ignore
            disabled={beef >= inviteDetails.guestCount.claimed}
          >
            +
          </button>
        </div>
        <div className="flex flex-col gap-8 !text-black">
          <p>How many people in your party would prefer smoked salmon?</p>
          <div className="flex flex-row gap-8 items-center mx-auto">
            <button
              className="btn btn-circle"
              onClick={() => updateDinnerCount("salmon", "subtract")}
              disabled={salmon <= 0}
            >
              -
            </button>
            <div>{salmon?.toString()}</div>
            <button
              className="btn btn-circle"
              onClick={() => updateDinnerCount("salmon", "add")}
              // @ts-ignore
              disabled={salmon >= inviteDetails.guestCount.claimed}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-8 !text-black">
          <p>
            How many people in your party would prefer a vegan meal (chef's
            choice)?
          </p>
          <div className="flex flex-row gap-8 items-center mx-auto">
            <button
              className="btn btn-circle"
              onClick={() => updateDinnerCount("vegan", "subtract")}
              disabled={vegan <= 0}
            >
              -
            </button>
            <div>{vegan?.toString()}</div>
            <button
              className="btn btn-circle"
              onClick={() => updateDinnerCount("vegan", "add")}
              // @ts-ignore
              disabled={vegan >= inviteDetails.guestCount.claimed}
            >
              +
            </button>
          </div>
        </div>
        {inviteDetails.children.claimed &&
          inviteDetails.children.claimed > 0 && (
            <div className="flex flex-col gap-8 !text-black">
              <p>How many children's meals should we plan on?</p>
              <p>
                <i>
                  Children are welcome to eat one of the main meals, but we will
                  have an option for chicken fingers or similar (chef's choice)
                  for picky eaters or kids who won't eat a lot.
                </i>
              </p>
              <div className="flex flex-row gap-8 items-center mx-auto">
                <button
                  className="btn btn-circle"
                  onClick={() => updateDinnerCount("child", "subtract")}
                  disabled={salmon <= 0}
                >
                  -
                </button>
                <div>{child?.toString()}</div>
                <button
                  className="btn btn-circle"
                  onClick={() => updateDinnerCount("child", "add")}
                  // @ts-ignore
                  disabled={child >= inviteDetails.children.claimed}
                >
                  +
                </button>
              </div>
            </div>
          )}

        <button
          className="btn"
          disabled={
            // @ts-ignore
            isPending || totalDinners !== inviteDetails.guestCount.claimed
          }
          onClick={submitGuests}
        >
          {isPending ? "saving" : "continue"}
        </button>
      </div>
    </div>
  );
}
