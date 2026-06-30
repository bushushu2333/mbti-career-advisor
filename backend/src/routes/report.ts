import { Router } from "express";
import { generateReportStream } from "../services/llmReportGenerator.ts";
import type { ReportRequest } from "../types/index.ts";

const router = Router();

router.post("/", async (req, res) => {
  const reportReq = req.body as ReportRequest;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    for await (const chunk of generateReportStream(reportReq)) {
      res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
    }
    res.write("data: [DONE]\n\n");
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.write(`data: ${JSON.stringify({ error: message })}\n\n`);
  } finally {
    res.end();
  }
});

export default router;
