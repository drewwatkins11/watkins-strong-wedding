"use client";

import { updateInvite } from "@/app/actions";
import { useEffect, useState, useTransition } from "react";
import { ControlButtons, CountInput } from "./controls";

export default function FoodChoice(props) {
  const {
    pageId,
    inviteDetails,
    onComplete,
    onBack,
  }: {
    pageId: string;
    inviteDetails: Guest;
    onComplete: (notionResponse: Guest) => void;
    onBack: () => void;
  } = props;

  const [beef, setBeef] = useState<number>(
    inviteDetails.dinnerPicks.beefDinnerCount ||
      // @ts-ignore
      inviteDetails.guestCount.claimed +
        // @ts-ignore
        inviteDetails.children.claimed +
        // @ts-ignore
        inviteDetails.plusOnes.claimed ||
      0
  );
  const [salmon, setSalmon] = useState<number>(
    inviteDetails.dinnerPicks.salmonDinnerCount || 0
  );
  const [child, setChild] = useState<number>(
    inviteDetails.dinnerPicks.childDinnerCount || 0
  );
  const [infant, setInfant] = useState<number>(
    inviteDetails.dinnerPicks.infantDinnerCount || 0
  );
  const [vegeterian, setVegeterian] = useState<number>(
    inviteDetails.dinnerPicks.vegeterianDinnerCount || 0
  );

  const [totalDinners, setTotalDinners] = useState<number>(
    beef + (salmon || 0) + (child || 0) + (vegeterian || 0) + (infant || 0)
  );

  const updateDinnerCount = (
    dinnerType: "beef" | "salmon" | "child" | "vegeterian" | "infant",
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
          if (beef > 0 && action === "add") setBeef(beef - count);
        setSalmon(salmon + count);
        break;
      case "child":
        // @ts-ignore
        if (totalDinners + count > inviteDetails.guestCount.claimed)
          if (beef > 0 && action === "add") setBeef(beef - count);
        setChild(child + count);
        break;
      case "infant":
        // @ts-ignore
        setInfant(infant + count);
        break;
      case "vegeterian":
        // @ts-ignore
        if (totalDinners + count > inviteDetails.guestCount.claimed)
          if (beef > 0 && action === "add") setBeef(beef - count);
        setVegeterian(vegeterian + count);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setTotalDinners(
      beef + (salmon || 0) + (child || 0) + (vegeterian || 0) + (infant || 0)
    );
  }, [beef, salmon, child, vegeterian, infant]);

  const [isPending, startTransition] = useTransition();

  const submitGuests = () => {
    startTransition(async () => {
      await updateInvite(pageId, {
        dinnerPicks: {
          beefDinnerCount: beef,
          salmonDinnerCount: salmon,
          childDinnerCount: child,
          vegeterianDinnerCount: vegeterian,
        },
      }).then((res) => onComplete(res));
    });
  };

  return (
    <div className="flex flex-col justify-center items-center p">
      <div className="rose prose-p:text-lg prose-p:mb-4 prose-p:mt-0 prose-p:w-full">
        <h4>Dinner Selections</h4>
        <p>
          Dinner will by catered by Chef Michael Jarzenski of "Feel Good BBQ
          Catering". We'll be serving buffet style and offering a "Steamship" as
          our featured meal.
        </p>
        <p>
          From the menu: "...a whole leg of beef, slow-smoked and served at a
          carving station with creamy horseradish and roasted red pepper coulis"
        </p>
        <p className="italic">
          (and our mounths have been watering since we set the menu in
          February!)
        </p>
        <p className="!text-base">
          For those who have an aversion to beef, we will also be offering
          smoked salmon, along with alternative options for vegeterians and
          children
          <br />
          (chef's choice for both).
        </p>
      </div>
      <div className="flex flex-col gap-8 !text-black">
        <CountInput
          questionText="How many people in your party will be eating beef?"
          value={beef}
          incBehavior={{
            callback: () => updateDinnerCount("beef", "add"),
            // @ts-ignore
            disabled: beef >= inviteDetails.totalAttendees,
          }}
          dIncBehavior={{
            callback: () => updateDinnerCount("beef", "subtract"),
            disabled: beef <= 0,
          }}
        />
        <CountInput
          questionText="How many people in your party would prefer smoked salmon?"
          value={salmon}
          incBehavior={{
            callback: () => updateDinnerCount("salmon", "add"),
            // @ts-ignore
            disabled: salmon >= inviteDetails.totalAttendees,
          }}
          dIncBehavior={{
            callback: () => updateDinnerCount("salmon", "subtract"),
            disabled: salmon <= 0,
          }}
        />
        <CountInput
          questionText="How many people in your party would prefer a vegeterian meal?"
          value={vegeterian}
          incBehavior={{
            callback: () => updateDinnerCount("vegeterian", "add"),
            // @ts-ignore
            disabled: vegeterian >= inviteDetails.totalAttendees,
          }}
          dIncBehavior={{
            callback: () => updateDinnerCount("vegeterian", "subtract"),
            disabled: vegeterian <= 0,
          }}
        />
        {inviteDetails.children.claimed &&
          inviteDetails.children.claimed > 0 && (
            <CountInput
              questionText="How many children's meals should we plan on?"
              value={child}
              incBehavior={{
                callback: () => updateDinnerCount("child", "add"),
                // @ts-ignore
                disabled: child >= inviteDetails.children.claimed - infant,
              }}
              dIncBehavior={{
                callback: () => updateDinnerCount("child", "subtract"),
                disabled: child <= 0,
              }}
            >
              <p className="italic text-base lg:mx-auto prose">
                Children are welcome to eat one of the main meals, but we will
                have an option for chicken fingers or similar (chef's choice)
                for picky eaters.
              </p>
            </CountInput>
          )}
        {inviteDetails.children.claimed &&
          inviteDetails.children.claimed > 0 && (
            <CountInput
              questionText="How many children won't be eating?"
              value={infant}
              incBehavior={{
                callback: () => updateDinnerCount("infant", "add"),
                // @ts-ignore
                disabled: infant >= inviteDetails.children.claimed,
              }}
              dIncBehavior={{
                callback: () => updateDinnerCount("infant", "subtract"),
                disabled: infant <= 0,
              }}
            >
              <p className="italic text-base lg:mx-auto prose">
                If you have an infant or toddler who won't be eating, please let
                us know.
              </p>
            </CountInput>
          )}
        <ControlButtons
          onBack={onBack}
          isPending={isPending}
          onContinue={submitGuests}
          continueDisabled={
            isPending || totalDinners !== inviteDetails.totalAttendees
          }
          errorText={
            totalDinners !== inviteDetails.totalAttendees
              ? `Total meals must match total guests. You have ${inviteDetails.totalAttendees} guests registered, but have selected ${totalDinners} meals.`
              : undefined
          }
        />
      </div>
    </div>
  );
}
