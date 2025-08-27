import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getHero, deleteHero } from "../api/superheroes";
import { API_URL } from "../api/config";
import { toast } from "react-toastify";

export default function HeroDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useQuery({
        queryKey: ["hero", id],
        queryFn: () => getHero(id).then(res => res.data),
    });

    if (isLoading) return <p className="text-center">Loading...</p>;
    const hero = data;

    const handleDelete = async () => {
        try {
            await deleteHero(id);
            toast.success("Hero deleted successfully! 🗑️");
            navigate("/");
        } catch (err) {
            toast.error("Failed to delete hero ❌");
        }
    };

    const handleEdit = () => {
        navigate(`/edit/${id}`);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">{hero.nickname}</h1>
            <p className="italic">{hero.catch_phrase}</p>
            <div className="flex gap-4 mt-4 flex-wrap">
                {hero.images.map((img, i) => (
                    <img
                        key={i}
                        src={`${API_URL}${img}`}
                        alt="hero"
                        className="w-48 h-48 object-contain rounded"
                    />
                ))}
            </div>
            <p className="mt-4"><b>Real name:</b> {hero.real_name}</p>
            <p><b>Origin:</b> {hero.origin_description}</p>
            <p><b>Powers:</b> {hero.superpowers}</p>

            <div className="flex gap-4 mt-6">
                <button
                    onClick={handleEdit}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

