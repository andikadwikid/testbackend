"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Divisi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Divisi.hasMany(
        models.Employee,
        { foreignKey: "divisiId" },
        { onDelete: "cascade" },
        { onUpdate: "cascade" }
      );
    }
  }
  Divisi.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Divisi",
    }
  );
  return Divisi;
};
