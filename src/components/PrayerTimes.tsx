import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchPrayerTimes, getZones, PrayerTimeData } from "../api/request";
import SelectZone from "./SelectZone";
import TimeCard from "./TimeCard";
import { LoaderCircle, Moon } from "lucide-react";
import { getNextPrayer, formatPrayerTime } from "../utils/timeUtils";

export const PrayerTimes = () => {
  const zones = getZones();
  const [selectedZone, setSelectedZone] = useState<string>(zones[0].zone);

  const { data, isLoading, isError } = useQuery<PrayerTimeData, Error>({
    queryKey: ["prayerTimes", selectedZone],
    queryFn: () => fetchPrayerTimes(selectedZone),
  });

  const formatPrayerName = (name: string) => {
    switch (name) {
      case "Fajr":
        name = "Subuh";
        break;
      case "Dhuhr":
        name = "Zohor";
        break;
      case "Asr":
        name = "Asar";
        break;
      case "Isha":
        name = "Isyak";
        break;
      default:
        name = name;
        break;
    }

    return name;
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin h-16 w-16" />
      </div>
    );
  if (isError) return <div>Error fetching prayer times</div>;

  const nextPrayer = data ? getNextPrayer(data) : null;

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-2">
        <Moon className="w-8 h-8" />
        <h1 className="font-semibold text-4xl">Jom Solat</h1>
      </div>
      <div className="bg-white rounded-lg p-6 shadow max-w-4xl mx-auto">
        <SelectZone
          onZoneChange={setSelectedZone}
          zones={zones}
          selectedZone={selectedZone}
        />
        {nextPrayer && (
          <div className="mt-4 py-4 space-y-2 bg-blue-500 px-3 rounded-lg text-white">
            <p className="text-lg text-gray-100">Waktu solat seterusnya:</p>
            <p className="text-4xl font-semibold">
              {formatPrayerName(nextPrayer.name)}
            </p>
            <p className="text-2xl">{formatPrayerTime(nextPrayer.time)}</p>
          </div>
        )}
        {data && <TimeCard data={data} />}
      </div>
    </div>
  );
};
