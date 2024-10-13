import { BackgroundBeams } from "../components/ui/background-beams";

export function Dashboard() {
    return (
        <>
            {/* Background Beams */}
            <BackgroundBeams />

            {/* Main Dashboard Container */}
            <div className="flex items-center justify-center h-screen p-4">
                {/* Sidebar */}
                <div className="bg-black bg-opacity-10 backdrop-blur-sm backdrop-brightness-200 border border-white border-opacity-10 rounded-lg w-1/5 h-[80vh] flex flex-col justify-center items-center mx-2">
                    {/* Sidebar content can go here */}
                    <h2 className="text-white">Sidebar</h2>
                </div>

                {/* Main Component */}
                <div className="bg-custom-dark bg-opacity-10 backdrop-blur-sm backdrop-brightness-200 border border-white border-opacity-10 rounded-lg w-4/5 h-[80vh] flex flex-col justify-center items-center mx-2">
                    {/* Main component content can go here */}
                    <h1 className="text-white">Main Dashboard</h1>
                </div>
            </div>
        </>
    );
}
