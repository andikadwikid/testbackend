const { Op } = require("sequelize");
const Absensi = require("../models").Absensi;
const Employee = require("../models").Employee;
const Divisi = require("../models").Divisi;

exports.postAbsen = async (req, res) => {
  try {
    const { employeeId } = req.body;

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    let hours = String(today.getHours());
    let minutes = String(today.getMinutes());
    let seconds = String(today.getSeconds());

    today = `${yyyy}-${mm}-${dd} ${hours}:${minutes}:${seconds}`;

    !employeeId && res.status(400).send({ msg: "employee tidak ditemukan" });

    const checkAbsensi = await Employee.findOne({
      where: {
        id: employeeId,
      },
      include: [
        {
          model: Absensi,
          where: {
            checkin: {
              [Op.lte]: today,
            },
          },
        },
      ],
    });

    //jika sudah absen kirim pesan error
    checkAbsensi && res.status(400).send({ msg: "employee sudah absen" });

    const absensi = await Absensi.create({
      checkin: today,
      checkout: "",
      employeeId: employeeId,
    });

    res.status(201).send({ data: absensi });
  } catch (error) {
    res.status(500).send({ msg: "server error" });
  }
};

exports.getAbsen = async (req, res) => {
  try {
    const absensi = await Absensi.findAll();

    res.status(200).send({ data: absensi });
  } catch (error) {
    res.status(500).send({ msg: "server error" });
  }
};

exports.getAbsenDivisi = async (req, res) => {
  try {
    const { id } = req.params;

    const divisi = await Divisi.findByPk(id);

    !divisi && res.status(400).send({ msg: "divisi tidak ditemukan" });

    const absensi = await Absensi.findAll({
      include: [
        {
          model: Employee,
          where: {
            divisiId: id,
          },
        },
      ],
    });

    res.status(200).send({ data: absensi });
  } catch (error) {
    res.status(500).send({ msg: "server error" });
  }
};

exports.getAbsenId = async (req, res) => {
  try {
    const { id } = req.params;

    const absensi = await Absensi.findByPk(id);

    !absensi && res.status(400).send({ msg: "absensi tidak ditemukan" });

    res.status(200).send({ data: absensi });
  } catch (error) {
    res.status(500).send({ msg: "server error" });
  }
};
