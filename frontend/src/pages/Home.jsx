import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getHeroes } from "../api/superheroes";
import HeroCard from "../components/HeroCard";

export default function Home() {
    const [page, setPage] = useState(1);
    const { data, isLoading } = useQuery({
        queryKey: ["heroes", page],
        queryFn: () => getHeroes(page).then(res => res.data),
    });

    if (isLoading) return <p className="text-center dark:text-white">Loading...</p>;

    return (
        <div className="p-6 dark:bg-gray-900 dark:text-white min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Popular superheroes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
                {data.heroes.map(hero => <HeroCard key={hero._id} hero={hero} />)}
            </div>

            <div className="flex justify-center mt-6 space-x-4">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                    className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span>Page {data.currentPage} / {data.totalPages}</span>
                <button
                    disabled={page === data.totalPages}
                    onClick={() => setPage(p => p + 1)}
                    className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

