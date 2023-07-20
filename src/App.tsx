import Header from "./components/Header.tsx";
import PomodoroTimer from "./components/PomodoroTimer.tsx";

export default function App() {
    return (
        <main className={'min-h-screen bg-slate-50 flex flex-col place-items-center'}>
            <Header/>
            <PomodoroTimer/>
        </main>
    )
}
