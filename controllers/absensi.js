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

<<<<<<< HEAD
    today = `${yyyy}-${mm}-${dd} ${hours}:${minutes}:${seconds}`;

    !employeeId && res.status(400).send({ msg: "employee tidak ditemukan" });

    const checkAbsensi = await Employee.findOne({
      where: {
        id: employeeId,
=======
  today = `${yyyy}-${mm}-${dd} ${hours}:${minutes}:${seconds}`;
  
  //cek apakah employee ada atau tidak
  !employeeId && res.status(400).send({ msg: "employee tidak ditemukan" });

  //cek apakah employee sudah absen hari ini atau belum
  const checkAbsensi = await Absensi.findOne({
    where: {
      employeeId: employeeId,
      checkin: {
        [Op.lte]: today,
>>>>>>> af0c8feb5da3741cdf897f4d129dc07e4a4370fc
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

<<<<<<< HEAD
    //jika sudah absen kirim pesan error
    checkAbsensi && res.status(400).send({ msg: "employee sudah absen" });
=======
  //jika sudah absen kirim pesan error
  checkAbsensi && res.status(400).send({ msg: "employee sudah absen" });
>>>>>>> af0c8feb5da3741cdf897f4d129dc07e4a4370fc

    const absensi = await Absensi.create({
      checkin: today,
      checkout: "",
      employeeId: employeeId,
    });

<<<<<<< HEAD
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
=======
  res.status(201).send({ data: absensi });
};

exports.getAbsen = async (req, res) => {

  const absensi = await Absensi.findAll();

  res.status(200).send({ data: absensi });
>>>>>>> af0c8feb5da3741cdf897f4d129dc07e4a4370fc
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
