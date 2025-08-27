const express = require("express");
const router = express.Router();
const heroCtrl = require("../controllers/superhero");
const upload = require("../middleware/upload");

// CRUD
router.post("/", upload.array("images"), heroCtrl.createHero);
router.get("/", heroCtrl.getHeroes);
router.get("/:id", heroCtrl.getHero);
router.put("/:id", heroCtrl.updateHero);
router.delete("/:id", heroCtrl.deleteHero);

module.exports = router;