import axios from "axios";
import zonesData from "../zones.json";

export interface Zone {
  zone: string;
  state: string;
  area: string[];
}

export interface PrayerTimeData {
  hijri: string;
  date: string;
  day: string;
  imsak: string;
  fajr: string;
  syuruk: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface PrayerTimeResponse {
  prayerTime: PrayerTimeData[];
  status: string;
  serverTime: string;
  periodType: string;
  lang: string;
  zone: string;
  bearing: string;
}

export const fetchPrayerTimes = async (zone: string): Promise<PrayerTimeData> => {
  const response = await axios.get<PrayerTimeResponse>(
    `https://www.e-solat.gov.my/index.php?r=esolatApi/takwimsolat&period=today&zone=${zone}`
  );

  return response.data.prayerTime[0];
};

export const getZones = (): Zone[] => {
  return zonesData;
};