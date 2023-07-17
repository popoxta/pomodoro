import {useEffect, useState} from "react";

export default function Tomato({pomosElapsed}: { pomosElapsed: number }) {
    const [allQuotes, setAllQuotes] = useState([] as { text: string }[])
    const [quote, setQuote] = useState('')

    const isBreak = pomosElapsed % 2 !== 0

    useEffect(() => {
        if (allQuotes.length) return
        fetch('https://type.fit/api/quotes',)
            .then(res => res.json())
            .then(quotes => setAllQuotes(quotes))
    }, [])

    useEffect(() => {
        if (!allQuotes?.length || isBreak) return
        setQuote(allQuotes[Math.floor(Math.random() * allQuotes.length)].text)
    }, [pomosElapsed, allQuotes])

    const tomatoes: { rest: string, work: string } = {
        rest: '../../tomato-rest.png',
        work: '../../tomato-work.png'
    }

    return (
        <div className={'flex flex-col gap-5 justify-center place-items-center my-8 sm:my-16 sm:flex-row'}>
            <img className={'w-60'} src={isBreak ? tomatoes.rest : tomatoes.work} alt={'Cute Pomodoro'}/>
            <div className={'bg-slate-200 mt-3 px-6 py-7 rounded-lg w-80'}>
                <p>{quote}</p>
            </div>
        </div>
    )
}