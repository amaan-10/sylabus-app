import mongoose, { Schema, models, Model } from "mongoose";

interface Subject {
  id: string;
  board: string;
  medium: string;
  classKey: string;
  subjectSlug: string;
  programOutcomes: string[];
  taxonomySet: any[];
  chapters: any[];
  createdAt?: Date;
  updatedAt?: Date;
}

const QuestionSchema = new Schema(
  {
    id: String,
    type: String,
    difficulty: String,
    courseOutcomes: String,
    taxonomy: String,
    marks: Number,
    text: String,
    options: [String],
    answer: String,
    tags: [String],
    imageUrl: String,
    subQuestions: [String],
  },
  { _id: false }
);

const ChapterSchema = new Schema(
  {
    id: String,
    chapterNumber: Number,
    title: String,
    slug: String,
    description: String,
    topics: [String],
    learningObjectives: [String],
    courseOutcomes: [String], // CO1, CO2...
    questions: [QuestionSchema],
  },
  { _id: false }
);

const taxonomySchema = new Schema({
  level: String,
  name: String,
  description: String,
  actionVerbs: [String],
});

const SubjectSchema = new Schema<Subject>(
  {
    id: String,
    board: String,
    medium: String,
    classKey: String,
    subjectSlug: String,
    programOutcomes: [String],
    taxonomySet: [taxonomySchema], // Remember, Apply...
    chapters: [ChapterSchema],
  },
  { timestamps: true }
);

const Subject = models.Subject || mongoose.model("Subject", SubjectSchema);

export default Subject;
