import Header from "./components/Header.tsx";
import Tomato from "./components/Tomato.tsx";

export default function App() {
    return (
        <main className={'h-screen bg-slate-50 flex flex-col py-32 justify-between place-items-center'}>
            <Header/>
            <Tomato/>
        </main>
    )
}
