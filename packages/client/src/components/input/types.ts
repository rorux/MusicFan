export type InputProps = {
  type: string;
  name: string;
  value: string;
  onChange?: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  isInvalid?: boolean;
  invalidFeedback?: string | null;
  placeholder: string;
  icon: JSX.Element;
};
