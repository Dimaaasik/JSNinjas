const Superhero = require("../models/Superhero");

// Create
exports.createHero = async (req, res) => {
    try {
        const { nickname, real_name, origin_description, superpowers, catch_phrase } = req.body;
        const images = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];

        const hero = new Superhero({
            nickname,
            real_name,
            origin_description,
            superpowers,
            catch_phrase,
            images
        });

        await hero.save();
        res.status(201).json(hero);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all
exports.getHeroes = async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query;
        const heroes = await Superhero.find()
            .select("nickname images real_name catch_phrase")
            .limit(limit * 1)
            .skip((page - 1) * limit);
        const count = await Superhero.countDocuments();
        res.json({ heroes, totalPages: Math.ceil(count / limit), currentPage: page });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get by id
exports.getHero = async (req, res) => {
    try {
        const hero = await Superhero.findById(req.params.id);
        if (!hero) return res.status(404).json({ message: "Hero not found" });
        res.json(hero);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update
exports.updateHero = async (req, res) => {
    try {
        const { nickname, real_name, origin_description, superpowers, catch_phrase } = req.body;
        const hero = await Superhero.findByIdAndUpdate(
            req.params.id,
            { nickname, real_name, origin_description, superpowers, catch_phrase },
            { new: true }
        );
        res.json(hero);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete
exports.deleteHero = async (req, res) => {
    try {
        await Superhero.findByIdAndDelete(req.params.id);
        res.json({ message: "Hero deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
