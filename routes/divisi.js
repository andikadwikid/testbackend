const router = require("express").Router();

const {
  postDivisi,
  getDivisi,
  getDivisiById,
  updateDivisi,
  deleteDivisi,
} = require("../controllers/divisi");

router.post("/divisi", postDivisi);
router.get("/divisi", getDivisi);
router.get("/divisi/:id", getDivisiById);
router.put("/divisi/:id", updateDivisi);
router.delete("/divisi/:id", deleteDivisi);

module.exports = router;
