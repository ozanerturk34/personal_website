import { format } from "date-fns";

interface DateLabelProps {
  date: string;
}

const DATE_FORMAT = "LLL d, yyyy";

const DateLabel = ({ date }: DateLabelProps) => {
  return (
    <p className="card-date inline">{format(new Date(date), DATE_FORMAT)}</p>
  );
};

export default DateLabel;
