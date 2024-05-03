import { useState } from 'react';

export type MonthlyTimeRange = {
  year: number;
  month: number;
};

export const nextMonth = (range: MonthlyTimeRange) => ({
  year: range.month === 12 ? range.year + 1 : range.year,
  month: range.month === 12 ? 1 : range.month + 1,
});

export const prevMonth = (range: MonthlyTimeRange) => ({
  year: range.month === 1 ? range.year - 1 : range.year,
  month: range.month === 1 ? 12 : range.month - 1,
});

export const monthlyTimeRangeToTime = (range: MonthlyTimeRange) =>
  `${range.year}-${String(range.month).padStart(2, '0')}-01T00:00:00.000Z`;

export const useMonthlyTimeRange = (initial?: MonthlyTimeRange) => {
  const [range, setRange] = useState<MonthlyTimeRange>(
    initial ?? {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    }
  );

  const next = () => setRange(nextMonth);
  const prev = () => setRange(prevMonth);

  return { range, next, prev, set: setRange };
};

export type DailyTimeRange = {
  year: number;
  month: number;
  day: number;
};

export const nextDay = (range: DailyTimeRange) => {
  const date = new Date(range.year, range.month - 1, range.day + 1);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
};

export const prevDay = (range: DailyTimeRange) => {
  const date = new Date(range.year, range.month - 1, range.day - 1);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
};

export const dailyTimeRangeToTime = (range: DailyTimeRange) =>
  `${range.year}-${String(range.month).padStart(2, '0')}-${String(
    range.day
  ).padStart(2, '0')}T00:00:00.000Z`;

export const useDailyTimeRange = (initial?: DailyTimeRange) => {
  const [range, setRange] = useState<DailyTimeRange>(
    initial ?? {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    }
  );

  const next = () => setRange(nextDay);
  const prev = () => setRange(prevDay);

  return { range, next, prev, set: setRange };
};
