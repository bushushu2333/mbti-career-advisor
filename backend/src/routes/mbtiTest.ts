import { Router } from "express";
import { calculateMbti, getMbtiQuestions } from "../services/mbtiTestEngine.ts";

const router = Router();

router.get("/questions", (_req, res) => {
  res.json({ questions: getMbtiQuestions() });
});

router.post("/", (req, res) => {
  const { answers } = req.body as { answers: number[] };
  const result = calculateMbti(answers);
  res.json(result);
});

export default router;
