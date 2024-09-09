import axios from "axios";

export interface zone {
  zone: string;
  state: string;
  area: string[];
}

export interface PrayerTime {
  prayerTime: {
    date: string;
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  }[];
}

export const fetchPrayerTimes = async (zone: string) => {
  const response = await axios.get<PrayerTime>(
    `https://www.e-solat.gov.my/index.php?r=esolatApi/takwimsolat&period=today&zone=${zone}`
  );

  const prayerTimes = response.data.prayerTime[0];

  return {
    date: prayerTimes.date,
    fajr: prayerTimes.fajr,
    dhuhr: prayerTimes.dhuhr,
    asr: prayerTimes.asr,
    maghrib: prayerTimes.maghrib,
    isha: prayerTimes.isha,
  };
};
