"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface Vehicle {
    vehicleNumber: string;
    capacityNo: Number;
    driverName: string;
    driverPhone: string;
}

export default function AddVehicle() {
    const router = useRouter();

    const [vehicle, setVehicle] = useState<Vehicle>({
        vehicleNumber: "",
        capacityNo: 0,
        driverName: "",
        driverPhone: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setVehicle((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const res = await fetch("http://localhost:5000/api/vehicles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(vehicle),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ type: "success", text: "Vehicle added successfully!" });
                setVehicle({ vehicleNumber: "", capacityNo: 0, driverName: "", driverPhone: "" });
            } else {
                setMessage({ type: "error", text: data.error || "Something went wrong" });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Network error. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 p-5">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 animate-fade-in-up">
                <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 mb-6">
                    Add New Vehicle
                </h2>

                {/* Success/Error Message */}
                {message && (
                    <div
                        className={`p-3 mb-4 rounded-lg text-white font-semibold ${
                            message.type === "success" ? "bg-green-500" : "bg-red-500"
                        } animate-fade-in-up`}
                    >
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {["vehicleNumber", "capacityNo", "driverName", "driverPhone"].map((field, idx) => (
                        <div className="relative" key={idx}>
                            <input
                                type={field === "capacity" ? "number" : field === "driverContact" ? "tel" : "text"}
                                name={field}
                                value={(vehicle as any)[field]}
                                onChange={handleChange}
                                required
                                className="peer w-full px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                                placeholder=" "
                            />
                            <label className="absolute left-4 top-3 text-gray-400 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-purple-500 peer-focus:text-sm transition-all">
                                {field
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, (str) => str.toUpperCase())}
                            </label>
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white font-bold rounded-2xl shadow-lg hover:scale-105 transform transition duration-300 disabled:opacity-50"
                    >
                        {loading ? "Adding..." : "Add Vehicle"}
                    </button>
                </form>
            </div>

            {/* Animations */}
            <style jsx global>{`
                @keyframes fade-in-up {
                    0% {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.7s cubic-bezier(0.4, 0, 0.2, 1);
                }
            `}</style>
        </div>
    );
}
