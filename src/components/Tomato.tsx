export default function Tomato() {
    const tomatoes: { rest: string, work: string } = {
        rest: '../../tomato-rest.png',
        work: '../../tomato-work.png'
    }
    return (
        <section className={'flex flex-row gap-3 justify-center place-items-center'}>
            <img className={'w-52'} src={tomatoes.work} alt={'Cute Pomodoro'}/>
            <div className={'bg-slate-200 mt-3 p-5 rounded-lg max-w-xs'}>
                <p>Motivational quote placeholderMotivational quote placeholderMotivational quoter</p>
            </div>
        </section>
    )
}