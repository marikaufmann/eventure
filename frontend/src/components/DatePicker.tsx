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
  handleSearch,
}: {
  selectedDate: Date | string;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | string>>;
  handleSearch: () => void;
  styles?: string;
}) => {
  const [date, setDate] = useState<Date | undefined>();
  useEffect(() => {
    setSelectedDate(date as Date);
    handleSearch();
  }, [date, setSelectedDate, handleSearch]);
  const isDateDisabled = (date: Date) => {
    return isBefore(date, startOfDay(new Date()));
  };
  useEffect(() => {
    if (isBefore(selectedDate, startOfDay(new Date()))) {
      setDate(undefined);
    } else {
      setDate(selectedDate as Date);
    }
  }, []);
  return (
    <div className="flex-1 h-full ">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-between text-left font-normal items-center flex ",
              styles,
              !date && " text-black font-medium"
            )}
          >
            <div className="flex items-center font-medium">
              <CalendarIcon className="mr-2 h-4 w-4 " />
              {date ? (
                format(date, "PPP")
              ) : (
                <span className="">Pick a date</span>
              )}
            </div>
            <ChevronDown className="h-4 w-4 opacity-50 " />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-full flex-col space-y-2 p-2 ">
          <Select
            onValueChange={(value) =>
              setDate(addDays(new Date(), parseInt(value)))
            }
            value={(date as Date)?.toISOString() || ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="0">Today</SelectItem>
              <SelectItem value="1">Tomorrow</SelectItem>
              <SelectItem value="3">In 3 days</SelectItem>
              <SelectItem value="7">In a week</SelectItem>
            </SelectContent>
          </Select>
          <div className="rounded-md ">
            <Calendar
              className=""
              mode="single"
              disabled={isDateDisabled}
              selected={date}
              onSelect={setDate}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
