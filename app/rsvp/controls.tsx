import { MouseEventHandler } from "react";

export const FormButton = (props: ButtonProps) => {
  const { isPending, disabled, pendingLabel, label, className, ...rest } =
    props;
  return (
    <button
      className={`btn btn-primary mt-4 mx-auto ${className}`}
      disabled={disabled || isPending}
      {...rest}
    >
      {isPending ? pendingLabel || "saving" : label || "continue"}
    </button>
  );
};

export const FormBackButton = (props: BackButtonProps) => {
  const { disabled, label, className, ...rest } = props;
  return (
    <button
      className={`btn btn-link mt-1 mx-auto ${className}`}
      disabled={disabled}
      {...rest}
    >
      {label || "go back"}
    </button>
  );
};

export const ControlButtons = (props: ControlButtonProps) => {
  const {
    isPending,
    onBack,
    onContinue,
    backDisabled,
    continueDisabled,
    labels,
    errorText,
    continueProps,
    backProps,
  } = props;
  return (
    <div className="flex flex-col w-full mt-6">
      <hr className="border mb-6 mt-0 border-black w-full mx-auto" />
      {errorText && (
        <p className="italic text-burntOrange lg:mx-auto lg:w-2/3">
          {errorText}
        </p>
      )}
      {!!onContinue && (
        <FormButton
          {...continueProps}
          onClick={(e) => onContinue(e)}
          isPending={isPending}
          disabled={isPending || continueDisabled}
          label={labels?.continueLabel}
          pendingLabel={labels?.continuePendingLabel}
        />
      )}
      {!!onBack && (
        <FormBackButton
          {...backProps}
          onClick={(e) => onBack(e)}
          disabled={isPending || backDisabled}
          label={labels?.backLabel}
        />
      )}
    </div>
  );
};

export const BoolInput = (props: BoolInputProps) => {
  const {
    questionText,
    value,
    updateFn,
    yesLabel,
    noLabel,
    children,
    className,
    ...rest
  } = props;
  return (
    <div className={`flex flex-col items-center ${className}`} {...rest}>
      {questionText && (
        <p className="font-bold" style={{ marginBottom: "0px !important" }}>
          {questionText}
        </p>
      )}
      {children}
      <div className="flex flex-row gap-4 mt-4">
        <button
          className={`btn ${value === false ? "btn-secondary" : ""}`}
          onClick={() => updateFn(false)}
        >
          {noLabel || "No"}
        </button>
        <button
          className={`btn ${value === true ? "btn-secondary" : ""}`}
          onClick={() => updateFn(true)}
        >
          {yesLabel || "Yes"}
        </button>
      </div>
    </div>
  );
};

export const CountInput = (props: CountInputProps) => {
  const {
    questionText,
    value,
    children,
    incBehavior: { callback: incCallback, disabled: incDisabled },
    dIncBehavior: { callback: dIncCallback, disabled: dIncDisabled },
    className,
    ...rest
  } = props;

  return (
    <div className={`flex flex-col items-center ${className}`} {...rest}>
      {questionText && <p className="font-bold mb-0">{questionText}</p>}
      {children}
      <div className="flex flex-row gap-8 items-center mx-auto mt-4">
        <button
          className={`btn btn-circle btn-active btn-secondary ${
            !dIncDisabled && "text-white text-lg"
          }`}
          onClick={dIncCallback}
          disabled={dIncDisabled}
        >
          -
        </button>
        <div className="w-5 font-semibold">{value.toString()}</div>
        <button
          className={`btn btn-circle  btn-active btn-secondary ${
            !incDisabled && "text-white text-lg"
          }`}
          onClick={incCallback}
          disabled={incDisabled}
        >
          +
        </button>
      </div>
    </div>
  );
};

interface IncrementBehavior {
  callback: (x?: any) => any;
  disabled?: boolean;
}

interface CountInputProps extends React.HTMLAttributes<HTMLDivElement> {
  questionText?: string;
  children?: React.ReactNode;
  value: number;
  incBehavior: IncrementBehavior;
  dIncBehavior: IncrementBehavior;
}

interface BoolInputProps extends React.HTMLAttributes<HTMLDivElement> {
  questionText?: string;
  children?: React.ReactNode;
  value: boolean | null | undefined;
  updateFn: (attending: boolean) => void;
  yesLabel?: string;
  noLabel?: string;
}

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  isPending?: boolean;
  disabled?: boolean;
  pendingLabel?: string;
  label?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

interface BackButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  label?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

interface ControlButtonLabels {
  backLabel?: string;
  continueLabel?: string;
  continuePendingLabel?: string;
}

interface ControlButtonProps {
  onBack?: MouseEventHandler<HTMLButtonElement>;
  onContinue?: MouseEventHandler<HTMLButtonElement>;
  backDisabled?: boolean;
  continueDisabled?: boolean;
  disabled?: boolean;
  isPending?: boolean;
  errorText?: string;
  labels?: ControlButtonLabels;
  continueProps?: React.HTMLAttributes<HTMLButtonElement>;
  backProps?: React.HTMLAttributes<HTMLButtonElement>;
}
