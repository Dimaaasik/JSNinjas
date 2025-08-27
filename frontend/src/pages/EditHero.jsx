import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getHero, updateHero } from "../api/superheroes";

export default function EditHero() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: hero, isLoading } = useQuery({
        queryKey: ["hero", id],
        queryFn: () => getHero(id).then(res => res.data),
    });

    const [formData, setFormData] = useState({
        nickname: "",
        real_name: "",
        catch_phrase: "",
        origin_description: "",
        superpowers: "",
    });

    useEffect(() => {
        if (hero) {
            setFormData({
                nickname: hero.nickname || "",
                real_name: hero.real_name || "",
                catch_phrase: hero.catch_phrase || "",
                origin_description: hero.origin_description || "",
                superpowers: hero.superpowers || "",
            });
        }
    }, [hero]);


    const mutation = useMutation({
        mutationFn: (updatedHero) => updateHero(id, updatedHero),
        onSuccess: () => {
            queryClient.invalidateQueries(["hero", id]);
            navigate(`/hero/${id}`);
            toast.success("Hero updated successfully!");
        },
        onError: () => {
            toast.error("Error updating hero.");
        }
    });

    if (isLoading) return <p className="text-center">Loading...</p>;

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        for (const [key, value] of Object.entries(formData)) {
            if (!value.trim()) {
                toast.error(`Field "${key}" cannot be empty`);
                return;
            }
        }

        mutation.mutate(formData);
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Hero</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    name="nickname"
                    placeholder="Nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    name="real_name"
                    placeholder="Real Name"
                    value={formData.real_name}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    name="catch_phrase"
                    placeholder="Catch Phrase"
                    value={formData.catch_phrase}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    name="origin_description"
                    placeholder="Origin Description"
                    value={formData.origin_description}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    name="superpowers"
                    placeholder="Superpowers"
                    value={formData.superpowers}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    disabled={mutation.isLoading}
                >
                    {mutation.isLoading ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
}