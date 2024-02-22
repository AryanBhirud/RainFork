import XLSX from "xlsx";
import axios from "axios";

const filePath = "data.xlsx";
const workbook = XLSX.readFile("target_com_data_2022_06_2.xlsx");
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
let rows = [];
const range = XLSX.utils.decode_range(sheet["!ref"]);
for (let rowNum = range.s.r + 1; rowNum <= range.e.r; rowNum++) {
  let row = [];
  let cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: 0 });
  const productName = sheet[cellAddress] ? sheet[cellAddress].v : "";
  row.push(productName);

  cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: 5 });
  const description = sheet[cellAddress] ? sheet[cellAddress].v : "";
  row.push(description);

  cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: 10 });
  const stock = sheet[cellAddress] ? sheet[cellAddress].v : "";
  row.push(stock);

  cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: 2 });
  const brand = sheet[cellAddress] ? sheet[cellAddress].v : "";
  row.push(brand);

  let cellAddress1 = XLSX.utils.encode_cell({ r: rowNum, c: 9 });
  let cellAddress2 = XLSX.utils.encode_cell({ r: rowNum, c: 8 });
  const price =
    (sheet[cellAddress2] ? sheet[cellAddress1].v : "") +
    " " +
    (sheet[cellAddress2] ? sheet[cellAddress2].v : "");
  row.push(price);

  cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: 3 });
  const baseImageUrl = sheet[cellAddress] ? sheet[cellAddress].v : "";
  row.push(baseImageUrl);

  cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: 13 });
  const category = sheet[cellAddress] ? sheet[cellAddress].v : "";
  row.push(category);

  cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: 17 });
  const images = sheet[cellAddress] ? sheet[cellAddress].v.split(" | ") : "";
  row.push(images);
  rows.push(row);
}

const pushData = async () => {
  for (let row of rows) {
    try {
      const product = await axios.post(
        "http://localhost:3001/api/v1/products/new",
        {
          productName: row[0],
          description: row[1],
          stock: row[2],
          brand: row[3],
          price: row[4],
          baseImageUrl: row[5],
          category: row[6],
          images: row[7],
        }
      );
    } catch (err) {
      continue;
    }
  }
};

pushData();
