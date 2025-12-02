import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const { type } = req.query;

    // map ประเภท → ไฟล์จริง
    const fileMap = {
      normal: "onlinelottonormal.json",
      vip: "onlinelottovip.json",
    };

    // ตั้งค่า default (ถ้าไม่ส่ง type ให้ใช้ normal)
    const fileName = fileMap[type] || fileMap["normal"];

    const filePath = path.join(process.cwd(), fileName);
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(jsonData);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);

  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
