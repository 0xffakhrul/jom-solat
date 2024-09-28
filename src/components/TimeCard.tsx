import { FC } from "react";
import { PrayerTimeData } from "../api/request";
import { format, parse } from "date-fns";

interface TimeCardProps {
  data: PrayerTimeData;
}

const TimeCard: FC<TimeCardProps> = ({ data }) => {
  const formatDate = (timeString: string) => {
    try {
      const date = parse(timeString, "HH:mm:ss", new Date());
      return format(date, "h:mm a");
    } catch (error) {
      console.error("Error formatting time:", error);
    }
  };

  const formatDayName = (day: string) => {
    switch (day) {
      case "Monday":
        day = "Isnin";
        break;
      case "Tuesday":
        day = "Selasa";
        break;
      case "Wednesday":
        day = "Rabu";
        break;
      case "Thursday":
        day = "Khamis";
        break;
      case "Friday":
        day = "Jumaat";
        break;
      case "Saturday":
        day = "Sabtu";
        break;
      case "Sunday":
        day = "Ahad";
        break;

      default:
        day = day;
        break;
    }
    return day;
  };
  return (
    <div>
      <h2 className="py-4">
        {formatDayName(data.day)}, {data.date}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="rounded-lg p-4 bg-blue-50 text-lg">
          <p className="font-semibold ">Imsak</p>
          <p>{formatDate(data.imsak)}</p>
        </div>
        <div className="rounded-lg p-4 bg-blue-50 text-lg">
          <p className="font-semibold">Subuh</p>
          <p>{formatDate(data.fajr)}</p>
        </div>
        <div className="rounded-lg p-4 bg-blue-50 text-lg">
          <p className="font-semibold">Syuruk</p>
          <p>{formatDate(data.syuruk)}</p>
        </div>
        <div className="rounded-lg p-4 bg-blue-50 text-lg">
          <p className="font-semibold">Zuhur</p>
          <p>{formatDate(data.dhuhr)}</p>
        </div>
        <div className="rounded-lg p-4 bg-blue-50 text-lg">
          <p className="font-semibold">Asar</p>
          <p>{formatDate(data.asr)}</p>
        </div>
        <div className="rounded-lg p-4 bg-blue-50 text-lg">
          <p className="font-semibold">Maghrib</p>
          <p>{formatDate(data.maghrib)}</p>
        </div>
        <div className="rounded-lg p-4 bg-blue-50 text-lg">
          <p className="font-semibold">Isyak</p>
          <p>{formatDate(data.isha)}</p>
        </div>
      </div>
    </div>
  );
};

export default TimeCard;
