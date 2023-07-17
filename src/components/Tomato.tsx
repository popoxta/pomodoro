import {useEffect, useState} from "react";

export default function Tomato() {
    const [quote, setQuote] = useState('')

    useEffect(() => {
        if (quote === '') {
            fetch('https://type.fit/api/quotes',)
                .then(res => res.json())
                .then(quotes => quotes[Math.floor(Math.random() * quotes.length)])
                .then(quote => setQuote(quote.text))
        }
    }, [])

    const tomatoes: { rest: string, work: string } = {
        rest: '../../tomato-rest.png',
        work: '../../tomato-work.png'
    }

    return (
        <section className={'flex flex-row gap-5 justify-center place-items-center mt-24 mb-20'}>
            <img className={'w-60'} src={tomatoes.work} alt={'Cute Pomodoro'}/>
            <div className={'bg-slate-200 mt-3 px-6 py-7 rounded-lg w-80'}>
                <p>{quote}</p>
            </div>
        </section>
    )
}