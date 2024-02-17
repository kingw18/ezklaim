import Header from "../components/Header";
import InputCard from "../components/InputCard";

export default function Home() {
    return (
        <div className="flex flex-col h-screen w-screen bg-zinc-600" >
            <div className="w-full flex ">
                <Header />
            </div>
            <div className="h-full w-full flex justify-center items-center" >
                <InputCard />
            </div>
        </div>
    );
}