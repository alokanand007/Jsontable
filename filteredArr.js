const dataArr = require("./db.json");
// console.log(dataArr);
const arrData = Object.values(dataArr);
console.log(arrData);

const fs = require("fs");

try {
  const dbPort = JSON.stringify({
    ports: arrData,
  });
  const filePath = "db2.json";

  fs.writeFileSync(filePath, dbPort);
  console.log("File successfully written!");
} catch (err) {
  console.error("Error:", err);
}
