const Divisi = require("../models").Divisi;

exports.postDivisi = async (req, res) => {
  try {
    const { name } = req.body;

    const divisi = await Divisi.create({ name });

    res.status(201).send({ data: divisi });
  } catch (error) {
    res.status(500).send({ msg: "server error" });
  }
};

exports.getDivisi = async (req, res) => {
  try {
    const divisi = await Divisi.findAll();

    res.status(200).send({ data: divisi });
  } catch (error) {
    res.status(500).send({ msg: "server error" });
  }
};

exports.getDivisiById = async (req, res) => {
  try {
    const { id } = req.params;

    const divisi = await Divisi.findByPk(id);

    !divisi && res.status(400).send({ msg: "divisi tidak ditemukan" });

    res.status(200).send({ data: divisi });
  } catch (error) {
    res.status(500).send({ msg: "server error" });
  }
};

exports.updateDivisi = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const divisi = await Divisi.findByPk(id);

    !divisi && res.status(400).send({ msg: "divisi tidak ditemukan" });

    divisi.name = name;

    await divisi.save();

    res.status(200).send({ data: divisi });
  } catch (error) {
    res.status(500).send({ msg: "server error" });
  }
};

exports.deleteDivisi = async (req, res) => {
  try {
    const { id } = req.params;

    const divisi = await Divisi.findByPk(id);

    !divisi && res.status(400).send({ msg: "divisi tidak ditemukan" });

    await divisi.destroy();

    res.status(200).send({ msg: "divisi berhasil dihapus" });
  } catch (error) {
    res.status(500).send({ msg: "server error" });
  }
};
