import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { addDays, format, isBefore, startOfDay } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const DatePicker = ({
  selectedDate,
  setSelectedDate,
  styles,
}: {
  selectedDate: Date | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  styles?: string;
}) => {
  const [date, setDate] = useState<Date | undefined>();
  useEffect(() => {
    setSelectedDate(date as Date);
  }, [date, setSelectedDate]);
  const isDateDisabled = (date: Date) => {
    return isBefore(date, startOfDay(new Date()));
  };
  useEffect(() => {
    if (isBefore(selectedDate as Date, startOfDay(new Date()))) {
      setDate(undefined);
    } else {
      setDate(selectedDate as Date);
    }
  }, [selectedDate]);
  return (
    <div className="flex-1 h-full ">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-between text-left font-normal items-center flex outline outline-1 shadow rounded-sm",
              styles,
              !date && " text-black font-medium"
            )}
          >
            <div className="flex items-center font-medium text-base">
              <CalendarIcon className="mr-2 h-5 w-5 " />
              {date ? (
                format(date, "PPP")
              ) : (
                <span className="">Pick a date</span>
              )}
            </div>
            <ChevronDown className="h-4 w-4 opacity-50 " />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-full flex-col space-y-2 p-2 text-base outline outline-primary">
          <Select
            onValueChange={(value) =>
              setDate(addDays(new Date(), parseInt(value)))
            }
            value={(date as Date)?.toISOString() || ""}
          >
            <SelectTrigger className="text-base outline outline-2 ">
              <SelectValue placeholder="Select">
                {date ? format(date, "PPP") : "Select"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent position="popper" className="">
              <SelectItem className="text-base" value="0">
                Today
              </SelectItem>
              <SelectItem className="text-base" value="1">
                Tomorrow
              </SelectItem>
              <SelectItem className="text-base" value="3">
                In 3 days
              </SelectItem>
              <SelectItem className="text-base" value="7">
                In a week
              </SelectItem>
            </SelectContent>
          </Select>
          <div className="rounded-sm text-base">
            <Calendar
              mode="single"
              disabled={isDateDisabled}
              selected={date}
              onSelect={setDate}
              defaultMonth={date}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
