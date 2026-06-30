import { Router } from "express";
import { calculateEightDim, getEightDimQuestions } from "../services/eightDimEngine.ts";

const router = Router();

router.get("/questions", (_req, res) => {
  res.json({ questions: getEightDimQuestions() });
});

router.post("/", (req, res) => {
  const { answers } = req.body as { answers: number[] };
  const result = calculateEightDim(answers);
  res.json(result);
});

export default router;
