import {useEffect, useState} from "react";
import {Timer} from "../types/timer.ts";
import Tomato from "./Tomato.tsx";

const ONE_SECOND: 1000 = 1000
const ONE_MINUTE: number = 60 * ONE_SECOND

const POMO_TIMES: {
    WORK: Timer,
    LONG_BREAK: Timer,
    SHORT_BREAK: Timer
} = {
    WORK: {
        text: 'Time to work!',
        time: (0.3 * ONE_MINUTE)
    },
    LONG_BREAK: {
        text: 'Time for a long break!',
        time: (0.2 * ONE_MINUTE)
    },
    SHORT_BREAK: {
        text: 'Time to rest!',
        time: (0.1 * ONE_MINUTE)
    }
}

/**
 * Returns the relevant pomo timer / set based on the current pomodoro count.
 * If even, returns WORK
 * If uneven, returns SHORT_BREAK
 * If 7, returns LONG_BREAK
 * @param nextPomoCount
 */
function calculatePomo(nextPomoCount: number): Timer {
    return nextPomoCount === 7
        ? POMO_TIMES.LONG_BREAK
        : nextPomoCount % 2 !== 0
            ? POMO_TIMES.SHORT_BREAK
            : POMO_TIMES.WORK
}

export default function PomodoroTimer() {
    const [timeRemaining, setTimeRemaining] = useState(POMO_TIMES.WORK.time)
    const [pomosElapsed, setPomosElapsed] = useState(0)
    const [isPaused, setIsPaused] = useState(true)

    const formattedTimeRemaining: Date = new Date(timeRemaining)
    const minutes: string = String(formattedTimeRemaining.getMinutes())
    const seconds: string = String(formattedTimeRemaining.getSeconds()).padStart(2, "0")

    const currentPomo: Timer = calculatePomo(pomosElapsed)
    const pomosUntilBreak: number = 4 - Math.ceil((pomosElapsed) / 2);

    useEffect(() => {
        if (!isPaused && timeRemaining > 0) {
            const timer: number = setInterval(
                () => setTimeRemaining((prev: number) => prev - ONE_SECOND),
                ONE_SECOND
            )
            return () => clearInterval(timer)
        }
    }, [isPaused])

    if (timeRemaining === 0) {
        if (!isPaused) setIsPaused(true)
        const nextPomoCount: number = pomosElapsed === 7 ? 0 : pomosElapsed + 1
        setTimeRemaining(calculatePomo(nextPomoCount).time)
        setPomosElapsed(nextPomoCount)
    }

    const togglePause = () => setIsPaused(!isPaused)

    return (
        <section className={'flex flex-col place-items-center'}>
            <Tomato pomosElapsed={pomosElapsed}/>
            <div>
                <h3 className={'text-red-700 text-3xl font-bold'}>
                    {minutes}:{seconds}
                    <i
                        className={`ml-3 text-slate-400 hover:text-slate-500 cursor-pointer transition-colors 
                        fa-solid ${isPaused ? 'fa-play' : 'fa-pause'}`}
                        onClick={togglePause}/>
                </h3>
            </div>
            <hr className={'w-64 h-0.5 border-slate-300 my-5'}/>
            <div className={'text-center'}>
                <h4 className={'text-2xl font-bold text-slate-900'}>{currentPomo.text}</h4>
                <p className={'text-slate-900'}>
                    {pomosUntilBreak > 0
                        ? `${pomosUntilBreak} Pomos left until your break!`
                        : 'Enjoy your well-deserved long break!'
                    }
                </p>
            </div>
        </section>
    )
}