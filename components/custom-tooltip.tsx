import { ValueType } from "recharts/types/component/DefaultTooltipContent";

export const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active: boolean | undefined;
  payload: ValueType | undefined;
  label: string;
}) => {
  if (active && payload && label) {
    return (
      <div className="bg-white p-4 shadow-md rounded-md border">
        <p className="text-lg font-medium mb-1">{label}</p>
        <p className="">
          Contribution value: <b>{payload}</b>
        </p>
      </div>
    );
  }

  return null;
};
