"use client";

import { useState } from "react";

export default function Home() {
    const [prompt, setPrompt] = useState("");
    const [ideas, setIdeas] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsLoading(true); // Show loading spinner
        try {
            const response = await fetch("/api/generate-ideas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch ideas");
            }

            const data = await response.json();
            setIdeas(data.ideas || []);
        } catch (error) {
            console.error("Error generating ideas:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false); // Hide loading spinner
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Creative Brainstorming Assistant
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your topic or prompt..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                    disabled={isLoading}
                >
                    Generate Ideas
                </button>
            </form>
            {isLoading && (
                <div className="flex items-center justify-center mt-6">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300"></div>
                    </div>
                    <p className="ml-4 text-blue-500 font-semibold">Generating ideas...</p>
                </div>
            )}
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Generated Ideas:</h3>
                {ideas.length === 0 ? (
                    <p className="text-gray-500">Your generated ideas will appear here.</p>
                ) : (
                    <ul className="space-y-2">
                        {ideas.map((idea, index) => (
                            <li
                                key={index}
                                className="p-3 bg-gray-100 rounded-lg border border-gray-300"
                            >
                                {idea}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
