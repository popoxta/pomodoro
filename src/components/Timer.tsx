export default function Timer() {
    return (
        <section className={'flex flex-col place-items-center'}>
            <div>
                <h3 className={'text-red-700 text-3xl font-bold'}>12:26</h3>
            </div>
            <hr className={'w-64 h-0.5 border-slate-300 my-5'}/>
            <div className={'text-center'}>
                <h4 className={'text-2xl font-bold text-slate-900'}>Time to work!</h4>
                <p className={'text-slate-900'}>2 Pomos left until your break!</p>
            </div>
        </section>
    )
}