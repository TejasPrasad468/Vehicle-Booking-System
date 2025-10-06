'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ENDPOINTS } from "@/config/api";

export default function SignupPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        // Handle signup logic here
        console.log("here");
        if (password != confirm) {
            alert("Password Not Matched");
            return;
        }
        // const res = fetch('http://localhost:5000/api/users/create', {
        const res = fetch(ENDPOINTS.userCreate, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ userName: username, emailId: email, password }),
        });
        res.then(response => {
            if (response.ok) {
                console.log("Signup successful");
                router.push('/login');
                // Redirect or show success message
            } else {
                return response.json().then(data => {
                    console.error("Signup error:", data.error);
                    // Show error message to user
                });
            }
        }).catch(error => {
            console.error("Network error during signup:", error);           
            // Show network error message to user
        });
        // setUsername('');
        // setEmail('');
        // setPassword('');
        // setConfirm('');
        // e.preventDefault();
        console.log("Form reset after submission");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                            autoComplete="username"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="confirm">
                            Confirm Password
                        </label>
                        <input
                            id="confirm"
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            value={confirm}
                            onChange={e => setConfirm(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition"
                    >
                        Sign Up
                    </button>
                    <p className="text-center text-gray-600 mt-4">
                        Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login here</a>
                    </p>
                </form>
            </div>
        </div>
    );
}