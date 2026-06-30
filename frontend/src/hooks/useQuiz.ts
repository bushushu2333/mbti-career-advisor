import { useState, useCallback } from "react";

interface UseQuizReturn {
  answers: number[];
  currentPage: number;
  setAnswer: (questionIndex: number, optionIndex: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  isComplete: boolean;
  totalPages: number;
  questionsPerPage: number;
  reset: () => void;
}

export function useQuiz(
  totalQuestions: number,
  questionsPerPage = 4
): UseQuizReturn {
  const [answers, setAnswers] = useState<number[]>(
    Array(totalQuestions).fill(-1)
  );
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);

  const setAnswer = useCallback((questionIndex: number, optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = optionIndex;
      return next;
    });
  }, []);

  const nextPage = useCallback(() => {
    setCurrentPage((p) => Math.min(p + 1, totalPages - 1));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((p) => Math.max(p - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setAnswers(Array(totalQuestions).fill(-1));
    setCurrentPage(0);
  }, [totalQuestions]);

  const isComplete = answers.every((a) => a !== -1);

  return {
    answers,
    currentPage,
    setAnswer,
    nextPage,
    prevPage,
    isComplete,
    totalPages,
    questionsPerPage,
    reset,
  };
}
