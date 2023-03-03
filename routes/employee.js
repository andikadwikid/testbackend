const router = require("express").Router();

const {
  postEmployee,
  getEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employee");

router.post("/employee", postEmployee);
router.get("/employee", getEmployee);
router.get("/employee/:id", getEmployeeById);
router.put("/employee/:id", updateEmployee);
router.delete("/employee/:id", deleteEmployee);

module.exports = router;
