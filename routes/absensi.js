const router = require("express").Router();

const {
  postAbsen,
  getAbsen,
  getAbsenDivisi,
  getAbsenId,
} = require("../controllers/absensi");

router.post("/absen", postAbsen);
router.get("/absen", getAbsen);
router.get("/absen/:id", getAbsenId);
router.get("/absen/divisi/:id", getAbsenDivisi);

module.exports = router;
