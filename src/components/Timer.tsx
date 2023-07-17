import {useEffect, useState} from "react";

const ONE_SECOND: 1000 = 1000
const ONE_MINUTE: number = 60 * ONE_SECOND

const POMO_TIMES = {
    WORK: (25 * ONE_MINUTE),
    LONG_BREAK: (15 * ONE_MINUTE),
    SHORT_BREAK: (5 * ONE_MINUTE)
}

export default function Timer() {
    const [timeRemaining, setTimeRemaining] = useState(POMO_TIMES.WORK)
    const [pomosElapsed, setPomosElapsed] = useState(6)
    const [isPaused, setIsPaused] = useState(true)

    const formattedTimeRemaining: Date = new Date(timeRemaining)
    const minutes: string = String(formattedTimeRemaining.getMinutes())
    const seconds: string = String(formattedTimeRemaining.getSeconds()).padStart(2, "0")

    console.log(`pomos elapsed : ${pomosElapsed}`)

    useEffect(() => {
        if (!isPaused && timeRemaining > 0) {
            const timer: number = setInterval(
                () => setTimeRemaining((prev: number) => prev - ONE_SECOND),
                1000
            )
            return () => clearInterval(timer)
        }
    }, [isPaused])

    if (timeRemaining === 0) {
        if (!isPaused) setIsPaused(true)
        const nextPomoCount: number = pomosElapsed === 7 ? 0 : pomosElapsed + 1
        setPomosElapsed(nextPomoCount)
        setTimeRemaining(getNextPomo(nextPomoCount))
    }

    function getNextPomo(nextPomoCount: number): number {
        return nextPomoCount === 7
            ? POMO_TIMES.LONG_BREAK
            : nextPomoCount % 2 !== 0
                ? POMO_TIMES.SHORT_BREAK
                : POMO_TIMES.WORK
    }

    const togglePause = () => setIsPaused(!isPaused)

    return (
        <section className={'flex flex-col place-items-center'}>
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
                <h4 className={'text-2xl font-bold text-slate-900'}>Time to work!</h4>
                <p className={'text-slate-900'}>2 Pomos left until your break!</p>
            </div>
        </section>
    )
}