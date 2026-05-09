import { Progress } from "../ui/progress";

type Props = {
  value: number;
  header?: {
    leftText: string;
    rightText: string;
  };
  footer?: {
    rightText: string;
  };
};

export default function ProgressBar({ value, header, footer }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {header && (
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-foreground/70">
            {header.leftText}
          </span>
          <span className="text-xs font-semibold text-foreground">
            {header.rightText}
          </span>
        </div>
      )}
      <Progress value={value} />
      {footer && (
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-success">{value}%</span>
          <span className="text-xs font-semibold text-foreground/70">
            {footer.rightText}
          </span>
        </div>
      )}
    </div>
  );
}
