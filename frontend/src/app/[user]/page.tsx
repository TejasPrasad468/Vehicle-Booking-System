"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function UserPage() {
    const router = useRouter();
    const params = useParams();
    const username = Array.isArray(params.user) ? params.user[0] : params.user;

    const [AdminAssign, setAdminAssign] = useState(true);

    useEffect(() => {
        document.title = AdminAssign
            ? "Admin Tasks - AssignWork"
            : "Worker Tasks - AssignWork";
    }, [AdminAssign]);

    const handleAddVehicle = () => {
        router.push("/addVehicle");
    };

    const handleCheckAvailability = () => {
        router.push("/checkAvailability");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex flex-col items-center py-10 px-2">
            {/* Welcome Header */}
            <div className="mb-10 animate-fade-in-down">
                <h1 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 drop-shadow-lg">
                    Welcome back,{" "}
                    <span className="underline decoration-wavy decoration-2 decoration-pink-400">
                        {username}
                    </span>
                    !
                </h1>
                <p className="text-gray-600 text-center mt-3 text-lg font-medium">
                    🚗 Manage your vehicles efficiently and check availability instantly!
                </p>
            </div>

            {/* Buttons Section */}
            <div className="flex flex-col md:flex-row gap-6 mt-6">
                <button
                    onClick={handleAddVehicle}
                    className="px-8 py-4 rounded-2xl text-white text-lg font-semibold shadow-lg shadow-blue-200/40 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 hover:scale-105 transition-transform duration-300"
                >
                    🛻 Add Vehicle
                </button>

                <button
                    onClick={handleCheckAvailability}
                    className="px-8 py-4 rounded-2xl text-white text-lg font-semibold shadow-lg shadow-purple-200/40 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 hover:scale-105 transition-transform duration-300"
                >
                    🔍 Check Availability
                </button>
            </div>

            {/* Floating Add New Task Button (optional, can remove if not needed) */}
            <div>
                <div className="fixed right-20 bottom-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg shadow-blue-200/30 hover:scale-105 transition-transform duration-300">
                    <a href="/newTask" className="text-3xl leading-none">
                        ➕
                    </a>
                </div>
            </div>

            {/* Animations */}
            <style jsx global>{`
                @keyframes fade-in-down {
                    0% {
                        opacity: 0;
                        transform: translateY(-30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.7s cubic-bezier(0.4, 0, 0.2, 1);
                }
            `}</style>
        </div>
    );
}
