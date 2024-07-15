import { BodySection, SectionHeading } from "@/components/common";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-parchment pt-4">
      <Link href="/" className="text-ember underline ml-4">
        {"<"} Return to wedding details
      </Link>
      <BodySection
        id="rsvp"
        className="!bg-parchment text-black !h-full !min-h-full font-montserrat self-stretch"
      >
        <SectionHeading heading="rsvp" color="black" />
        {children}
      </BodySection>
    </div>
  );
}
