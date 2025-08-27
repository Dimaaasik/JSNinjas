const mongoose = require("mongoose");

const SuperheroSchema = new mongoose.Schema({
    nickname: { type: String, required: true },
    real_name: { type: String },
    origin_description: { type: String },
    superpowers: { type: String },
    catch_phrase: { type: String },
    images: [{ type: String }] // зберігаємо URL або шлях до файлу
}, { timestamps: true });

module.exports = mongoose.model("Superhero", SuperheroSchema);