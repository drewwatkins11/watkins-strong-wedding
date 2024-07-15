import { BodySection, SectionHeading } from "@/components/common";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <BodySection
      id="where"
      className="!bg-parchment text-black !h-full font-montserrat"
    >
      <SectionHeading heading="rsvp" color="black" />
      {children}
    </BodySection>
  );
}
