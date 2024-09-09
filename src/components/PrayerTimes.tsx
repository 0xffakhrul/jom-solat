import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchPrayerTimes, getZones, PrayerTimeData } from "../api/request";
import SelectZone from "./SelectZone";
import TimeCard from "./TimeCard";
import { LoaderCircle, Moon } from "lucide-react";

export const PrayerTimes = () => {
  const zones = getZones();
  const [selectedZone, setSelectedZone] = useState<string>(zones[0].zone);

  const { data, isLoading, isError } = useQuery<PrayerTimeData, Error>({
    queryKey: ["prayerTimes", selectedZone],
    queryFn: () => fetchPrayerTimes(selectedZone),
  });

  if (isLoading)
    return (
      <div>
        <LoaderCircle className="animate-spin h-16 w-16"/>
      </div>
    );
  if (isError) return <div>Error fetching prayer times</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Moon className="w-8 h-8" />
        <h1 className="font-semibold text-4xl">Jom Solat</h1>
      </div>
      <div className="bg-white rounded-lg p-6 shadow max-w-4xl mx-auto">
        {/* <p>Waktu solat seterusnya...</p> */}
        <SelectZone
          onZoneChange={setSelectedZone}
          zones={zones}
          selectedZone={selectedZone}
        />
        {data && <TimeCard data={data} />}
      </div>
    </div>
  );
};
