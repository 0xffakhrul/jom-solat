import { parse, isAfter } from "date-fns";
import { PrayerTimeData } from "../api/request";

export interface PrayerTime {
  name: string;
  time: string;
}

export const getNextPrayer = (
  prayerTimes: PrayerTimeData
): PrayerTime | null => {
  const now = new Date();
  const prayers: PrayerTime[] = [
    { name: "Imsak", time: prayerTimes.imsak },
    { name: "Fajr", time: prayerTimes.fajr },
    { name: "Syuruk", time: prayerTimes.syuruk },
    { name: "Dhuhr", time: prayerTimes.dhuhr },
    { name: "Asr", time: prayerTimes.asr },
    { name: "Maghrib", time: prayerTimes.maghrib },
    { name: "Isha", time: prayerTimes.isha },
  ];

  for (const prayer of prayers) {
    const prayerTime = parse(prayer.time, "HH:mm:ss", now);
    if (isAfter(prayerTime, now)) {
      return prayer;
    }
  }

  //if all prayers have passed, return the first prayer of the next day
  return prayers[0];
};

export const formatPrayerTime = (time: string): string => {
  try {
    const date = parse(time, "HH:mm:ss", new Date());
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch (error) {
    console.error("Error formatting time:", error);
    return time;
  }
};
