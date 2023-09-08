"use client";

import { useRef, useState, useEffect } from "react";

export default function PomodoroTimer() {
  const [remainingTime, setRemainingTime] = useState<number>(1500000);

  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  const [timerState, setTimerState] = useState<string>("Play"); // Play, Pause
  const [audioState, setAudioState] = useState<string>("Unmute"); // Unmute, Mute

  const [timerMode, setTimerMode] = useState<string>("Study"); // Study, Rest

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (timerRunning) {
      if (remainingTime <= 0) {
        resetTimer();
      } else {
        interval = setInterval(() => setRemainingTime(remainingTime - 10), 10);
      }
    }

    return () => clearInterval(interval);
  }, [timerRunning, remainingTime]);

  function toggleTimerState() {
    if (timerState === "Play") {
      setTimerState("Pause");
      setTimerRunning(true);
    } else if (timerState === "Pause") {
      setTimerState("Play");
      setTimerRunning(false);
    }
  }

  function resetTimer() {
    setTimerRunning(false);

    setTimerState("Play");

    if (timerMode === "Study") {
      setRemainingTime(1500000);
    } else if (timerMode === "Rest") {
      setRemainingTime(300000);
    }
  }

  function toggleAudioState() {
    if (audioState === "Unmute") {
      setAudioState("Mute");
    } else if (audioState === "Mute") {
      setAudioState("Unmute");
    }
  }

  function toggleTimerMode() {
    setTimerRunning(false);

    if (timerMode === "Study") {
      setTimerState("Play");
      setTimerMode("Rest");
      setRemainingTime(300000);
    } else if (timerMode === "Rest") {
      setTimerState("Play");
      setTimerMode("Study");
      setRemainingTime(1500000);
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <p className="font-bold select-none text-7xl font-jetbrains-mono md:text-9xl">
        {Math.floor(remainingTime / 60 / 1000).toLocaleString(undefined, { minimumIntegerDigits: 2 })}
        <span>:</span>
        {Math.floor((remainingTime / 1000) % 60).toLocaleString(undefined, { minimumIntegerDigits: 2 })}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            className="inline-flex p-2 transition-colors rounded-md hover:bg-blue-200"
            aria-label="Toggle Timer State"
            type="button"
            onClick={toggleTimerState}
          >
            {timerState === "Play" && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            )}
            {timerState === "Pause" && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
              </svg>
            )}
          </button>
          <button
            className="inline-flex p-2 transition-colors rounded-md hover:bg-blue-200"
            aria-label="Reset Timer"
            type="button"
            onClick={resetTimer}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {/*<button
            className="inline-flex p-2 transition-colors rounded-md hover:bg-blue-200"
            aria-label="Toggle Audio State"
            type="button"
            onClick={toggleAudioState}
          >
            {audioState === "Unmute" && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M10 3.75a.75.75 0 00-1.264-.546L4.703 7H3.167a.75.75 0 00-.7.48A6.985 6.985 0 002 10c0 .887.165 1.737.468 2.52.111.29.39.48.7.48h1.535l4.033 3.796A.75.75 0 0010 16.25V3.75zM15.95 5.05a.75.75 0 00-1.06 1.061 5.5 5.5 0 010 7.778.75.75 0 001.06 1.06 7 7 0 000-9.899z" />
                <path d="M13.829 7.172a.75.75 0 00-1.061 1.06 2.5 2.5 0 010 3.536.75.75 0 001.06 1.06 4 4 0 000-5.656z" />
              </svg>
            )}
            {audioState === "Mute" && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M9.547 3.062A.75.75 0 0110 3.75v12.5a.75.75 0 01-1.264.546L4.703 13H3.167a.75.75 0 01-.7-.48A6.985 6.985 0 012 10c0-.887.165-1.737.468-2.52a.75.75 0 01.7-.48h1.535l4.033-3.796a.75.75 0 01.811-.142zM13.28 7.22a.75.75 0 10-1.06 1.06L13.94 10l-1.72 1.72a.75.75 0 001.06 1.06L15 11.06l1.72 1.72a.75.75 0 101.06-1.06L16.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L15 8.94l-1.72-1.72z" />
              </svg>
            )}
          </button>
          <button
            className="inline-flex p-2 transition-colors rounded-md hover:bg-blue-200"
            aria-label="Toggle Audio State"
            type="button"
            onClick={toggleAudioState}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          </button>*/}
        </div>
        <button
          className="inline-flex p-2 transition-colors rounded-md hover:bg-blue-200"
          aria-label="Toggle Timer Mode"
          type="button"
          onClick={toggleTimerMode}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path
              fillRule="evenodd"
              d="M13.2 2.24a.75.75 0 00.04 1.06l2.1 1.95H6.75a.75.75 0 000 1.5h8.59l-2.1 1.95a.75.75 0 101.02 1.1l3.5-3.25a.75.75 0 000-1.1l-3.5-3.25a.75.75 0 00-1.06.04zm-6.4 8a.75.75 0 00-1.06-.04l-3.5 3.25a.75.75 0 000 1.1l3.5 3.25a.75.75 0 101.02-1.1l-2.1-1.95h8.59a.75.75 0 000-1.5H4.66l2.1-1.95a.75.75 0 00.04-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
