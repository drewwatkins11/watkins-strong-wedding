export const SectionHeading = ({
  color,
  heading,
}: {
  color?: string;
  heading: string;
}) => {
  return (
    <h2
      className={`text-8xl lg:text-9xl lg:self-start lg:text-left mb-6 -mt-8  ${
        color || "text-wheat"
      }`}
    >
      {heading}
    </h2>
  );
};

export const BodySection = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className={`flex flex-col items-center text-center w-full lg:text-center bg-parchment lg:px-8 py-12 lg:p-24  bg-gradient-to-b from-transparent from-50% to-transparent-15 ${
        className ? className : undefined
      }`}
      {...props}
    >
      {children}
    </div>
  );
};
