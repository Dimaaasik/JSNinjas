import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createHero } from "../api/superheroes";
import { toast } from "react-toastify";

export default function CreateHero() {
    const [form, setForm] = useState({
        nickname: "",
        real_name: "",
        origin_description: "",
        superpowers: "",
        catch_phrase: ""
    });
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };

    const handleRemoveFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(form).forEach(([k, v]) => formData.append(k, v));
        files.forEach((f) => formData.append("images", f));

        try {
            await createHero(formData);
            toast.success("Hero created successfully! 🎉");
            navigate("/");
        } catch (err) {
            toast.error("Failed to create hero ❌");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-bold">Add Hero</h1>

            {Object.keys(form).map((key) => (
                <input
                    key={key}
                    type="text"
                    name={key}
                    placeholder={key}
                    value={form[key]}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
            ))}

            <input type="file" multiple onChange={handleFileChange} />

            {files.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {files.map((file, idx) => (
                        <div
                            key={idx}
                            className="relative w-20 h-20 overflow-hidden rounded-md border"
                        >
                            <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="w-full h-full object-cover"
                            />

                            <button
                                type="button"
                                onClick={() => handleRemoveFile(idx)}
                                className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs hover:bg-red-700"
                                title="Remove"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Create
            </button>
        </form>
    );
}

