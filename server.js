const express = require("express");
const app = express();
const sequelize = require("./db");

const Employee = require("./models").Employee;
const Divisi = require("./models").Divisi;
const Absensi = require("./models").Absensi;

const employeeRouter = require("./routes/employee");
const divisiRouter = require("./routes/divisi");
const absensiRouter = require("./routes/absensi");

Employee.belongsTo(
  Divisi,
  { foreignKey: "divisiId" },
  { onDelete: "cascade" },
  { onUpdate: "cascade" }
);
Divisi.hasMany(Employee, { onDelete: "cascade" }, { onUpdate: "cascade" });

Employee.hasMany(Absensi, { onDelete: "cascade" }, { onUpdate: "cascade" });
Absensi.belongsTo(
  Employee,
  { foreignKey: "employeeId" },
  { onDelete: "cascade" },
  { onUpdate: "cascade" }
);

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize();

app.use(employeeRouter);
app.use(divisiRouter);
app.use(absensiRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("server running at port 3000");
});
