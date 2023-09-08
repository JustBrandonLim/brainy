import PomodoroTimer from "@components/pomodoro-timer";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center grow">
      <PomodoroTimer />
    </section>
  );
}
