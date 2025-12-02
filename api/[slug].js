import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { slug, type } = req.query;

  try {
    const fileMap = {
      normal: "onlinelottonormal.json",
      vip: "onlinelottovip.json",
    };

    const fileName = fileMap[type] || fileMap["normal"];
    const filePath = path.join(process.cwd(), fileName);

    const jsonData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(jsonData);

    const item = data.find((i) => {
      if (i.normal) return i.normal.slug === slug;
      if (i.vip) return i.vip.online_lotto.slug === slug;
      return false;
    });

    res.setHeader("Access-Control-Allow-Origin", "*");

    if (!item) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(200).json(item);

  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
