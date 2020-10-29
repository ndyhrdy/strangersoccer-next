import fs from "fs";
import path from "path";

export default (req, res) => {
  let filepath = "";
  try {
    if (!req.query.filename) {
      throw new Error("Please provide data type");
    }
    filepath = path.join("data", req.query.filename);
    if (!fs.existsSync(filepath)) {
      throw new Error("Data not found");
    }
  } catch (error) {
    res.statusCode = 422;
    res.json({
      message: error.message,
    });
    return;
  }

  const content = fs.readFileSync(filepath, { encoding: "utf-8" });
  res.statusCode = 200;
  res.json(content);
};
