import { Link } from "react-router-dom";
import { API_URL } from "../api/config";

export default function HeroCard({ hero }) {
    const imageUrl = hero.images?.[0] ? `${API_URL}${hero.images[0]}` : "https://via.placeholder.com/150";

    return (
        <div className="hero-card bg-gray-200 dark:bg-gray-800 rounded-xl shadow-md border
            p-4 flex flex-col w-60 h-80 mx-auto hover:scale-105 transition">
            <img
                src={imageUrl}
                alt={hero.nickname}
                className="w-full h-32 object-contain rounded-md mb-3"
            />
            <h2 className="text-lg font-semibold text-black dark:text-white truncate">{hero.nickname}</h2>
            <h3 className="text-sm font-semibold text-black dark:text-gray-300 truncate">{hero.real_name}</h3>
            <h3 className="text-sm font-semibold text-black dark:text-gray-300 truncate">{hero.catch_phrase}</h3>

            <Link
                to={`/hero/${hero._id}`}
                className="mt-auto bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-900 text-center"
            >
                View
            </Link>
        </div>
    );
}

