"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Employee.belongsTo(models.Divisi);
      Employee.hasMany(
        models.Absensi,
        { foreignKey: "employeeId" },
        { onDelete: "cascade" },
        { onUpdate: "cascade" }
      );
    }
  }
  Employee.init(
    {
      name: DataTypes.STRING,
      divisiId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Employee",
    }
  );

  return Employee;
};
