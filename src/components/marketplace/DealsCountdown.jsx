"use client";

import { useEffect, useState } from "react";
import { FiClock, FiZap } from "react-icons/fi";

export default function DealsCountdown({ initialHours = 14, initialMinutes = 32, initialSeconds = 45 }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (num) => String(num).padStart(2, "0");

  return (
    <div className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-purple-500/10 p-2 sm:p-2.5 border border-rose-500/20 backdrop-blur-xs">
      <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow-xs">
        <FiClock className="h-3.5 w-3.5" />
      </div>

      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 dark:text-gray-200">
        <span className="hidden sm:inline text-rose-600 dark:text-rose-400">Flash Sale Ends In:</span>
        <span className="sm:hidden text-rose-600 dark:text-rose-400">Ends In:</span>
        <div className="flex items-center gap-1 font-mono text-xs font-black">
          <span className="rounded-md bg-rose-600 px-1.5 py-0.5 text-white shadow-2xs">
            {format(timeLeft.hours)}
          </span>
          <span className="text-rose-600">:</span>
          <span className="rounded-md bg-rose-600 px-1.5 py-0.5 text-white shadow-2xs">
            {format(timeLeft.minutes)}
          </span>
          <span className="text-rose-600">:</span>
          <span className="rounded-md bg-rose-600 px-1.5 py-0.5 text-white shadow-2xs">
            {format(timeLeft.seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
