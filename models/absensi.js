"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Absensi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Absensi.belongsTo(models.Employee);
    }
  }
  Absensi.init(
    {
      checkin: DataTypes.DATE,
      checkout: DataTypes.DATE,
      employeeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Absensi",
    }
  );
  return Absensi;
};
