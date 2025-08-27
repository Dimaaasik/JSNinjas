import axios from "axios";

export const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const getHeroes = (page = 1) =>
    API.get(`/superheroes?page=${page}&limit=5`);

export const getHero = (id) => API.get(`/superheroes/${id}`);

export const createHero = (formData) =>
    API.post("/superheroes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

export const updateHero = (id, data) => API.put(`/superheroes/${id}`, data);

export const deleteHero = (id) => API.delete(`/superheroes/${id}`);
