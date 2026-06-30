import { Router } from "express";
import { mbtiCareerMatch } from "../services/mbtiCareerMatch.ts";

const router = Router();

router.get("/:mbti", async (req, res) => {
  await mbtiCareerMatch.load();
  const mbti = req.params.mbti;
  const careers = mbtiCareerMatch.getCareers(mbti);
  res.json({ mbti, careers });
});

export default router;
