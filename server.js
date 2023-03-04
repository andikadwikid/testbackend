const express = require("express");
const app = express();

const employeeRouter = require("./routes/employee");
const divisiRouter = require("./routes/divisi");
const absensiRouter = require("./routes/absensi");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(employeeRouter);
app.use(divisiRouter);
app.use(absensiRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("server running at port 3000");
});
