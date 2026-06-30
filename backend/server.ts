import "dotenv/config";
import express from "express";
import cors from "cors";
import { resolve } from "path";

import careersRouter from "./src/routes/careers.ts";
import diagnoseRouter from "./src/routes/diagnose.ts";
import mbtiTestRouter from "./src/routes/mbtiTest.ts";
import eightDimTestRouter from "./src/routes/eightDimTest.ts";
import reportRouter from "./src/routes/report.ts";
import { mbtiCareerMatch } from "./src/services/mbtiCareerMatch.ts";

const app = express();
const PORT = parseInt(process.env.PORT || "3099", 10);

app.use(cors());
app.use(express.json());

// 启动时预加载 CSV
mbtiCareerMatch.load().catch((err) => {
  console.error("加载职业 CSV 失败:", err);
});

app.use("/api/careers", careersRouter);
app.use("/api/diagnose", diagnoseRouter);
app.use("/api/mbti-test", mbtiTestRouter);
app.use("/api/eight-dim-test", eightDimTestRouter);
app.use("/api/report", reportRouter);

// 生产环境：托管前端构建产物
const distPath = resolve(process.cwd(), "..", "frontend", "dist");
app.use(express.static(distPath));
app.get(/.*/, (_req, res) => {
  res.sendFile(resolve(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`MBTI backend listening on http://localhost:${PORT}`);
});
