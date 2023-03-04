const Employee = require("../models").Employee;
const Divisi = require("../models").Divisi;

exports.postEmployee = async (req, res) => {
  try {
    const { name, divisiId } = req.body;

    const employee = await Employee.create({
      name,
      divisiId,
    });

    !divisiId && res.status(400).send({ msg: "disivi harus diisi" });

    const divisi = await Divisi.findByPk(divisiId);

    !divisi && res.status(400).send({ msg: "divisi tidak ditemukan" });

    res.status(201).send({ data: employee });
  } catch (error) {
    console.log(error);
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findAll();

    res.status(200).send({ data: employee });
  } catch (error) {
    console.log(error);
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByPk(id);

    !employee && res.status(400).send({ msg: "employee tidak ditemukan" });

    res.status(200).send({ data: employee });
  } catch (error) {
    console.log(error);
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, divisiId } = req.body;

    const employee = await Employee.findByPk(id);

    !employee && res.status(400).send({ msg: "employee tidak ditemukan" });

    employee.name = name;
    employee.divisiId = divisiId;

    await employee.save();

    res.status(200).send({ data: employee });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByPk(id);

    !employee && res.status(400).send({ msg: "employee tidak ditemukan" });

    await employee.destroy();

    res.status(200).send({ msg: "employee berhasil dihapus" });
  } catch (error) {
    console.log(error);
  }
};
