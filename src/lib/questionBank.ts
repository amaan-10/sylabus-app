// lib/questionBank.ts
import { connectToDatabase } from "./mongodb";
import { SubjectQuestionBankModel } from "@/models/subjectQuestionBank";
import type { SubjectQuestionBank, Chapter, Question } from "@/models/subjectQuestionBank";

type SubjectKey = {
  board: string;
  medium: string;
  classKey: string;
  subjectSlug: string;
};

// 1. Get entire subject with all chapters + questions
export async function getSubjectQuestionBank(
  key: SubjectKey
): Promise<SubjectQuestionBank | null> {
  await connectToDatabase();

  const subject = await SubjectQuestionBankModel.findOne(key).lean<SubjectQuestionBank | null>();
  return subject;
}

// 2. Get a single chapter by slug
export async function getChapterBySlug(
  key: SubjectKey,
  chapterSlug: string
): Promise<Chapter | null> {
  const subject = await getSubjectQuestionBank(key);
  if (!subject) return null;

  const chapter = subject.chapters.find((ch) => ch.slug === chapterSlug);
  return chapter ?? null;
}

// 3. Get all questions for a chapter
export async function getQuestionsForChapter(
  key: SubjectKey,
  chapterSlug: string
): Promise<Question[]> {
  const chapter = await getChapterBySlug(key, chapterSlug);
  return chapter?.questions ?? [];
}

// 4. Get filtered questions (by type / difficulty etc.)
export async function getFilteredQuestions(
  key: SubjectKey,
  chapterSlug: string,
  opts?: { type?: string; difficulty?: string }
): Promise<Question[]> {
  const questions = await getQuestionsForChapter(key, chapterSlug);

  return questions.filter((q) => {
    if (opts?.type && q.type !== opts.type) return false;
    if (opts?.difficulty && q.difficulty !== opts.difficulty) return false;
    return true;
  });
}
