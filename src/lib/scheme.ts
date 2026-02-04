import { z } from "zod";

export const CourseSchema = z.object({
  courseCode: z.string().nullable(),
  courseTitle: z.string().nullable(),
  courseType: z.string().nullable(),
  degree: z.string().nullable(),
  semester: z.number().nullable(),
  pattern: z.string().nullable(),
  courseOutcome: z.array(z.string()).nullable(),

  credits: z.number().nullable(),

  // 👇 allow null from AI
  units: z
    .array(
      z.object({
        unit: z.string(),
        lectures: z.number().nullable(),
        topics: z.array(z.string()).nullable(),
      }),
    )
    .nullable(),

  practicals: z
    .array(
      z.object({
        title: z.string(),
        hours: z.string().nullable(),
      }),
    )
    .nullable(),

  readings: z.array(z.string()).nullable(),
});

export const CoursesResponseSchema = z.object({
  courses: z.array(CourseSchema),
});
