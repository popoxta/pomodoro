import Header from "./components/Header.tsx";
import Tomato from "./components/Tomato.tsx";
import PomodoroTimer from "./components/PomodoroTimer.tsx";

export default function App() {
    return (
        <main className={'h-screen bg-slate-50 flex flex-col place-items-center'}>
            <Header/>
            <Tomato/>
            <PomodoroTimer/>
        </main>
    )
}
