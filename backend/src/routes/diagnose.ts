import { Router } from "express";
import { inferMbti } from "../services/eightDimensionDiagnosis.ts";
import type { DiagnoseRequest } from "../types/index.ts";

const router = Router();

router.post("/", (req, res) => {
  const body = req.body as DiagnoseRequest;
  const result = inferMbti(body);
  res.json(result);
});

export default router;
