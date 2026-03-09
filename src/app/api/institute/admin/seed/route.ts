import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { getInstituteModel } from "@/models/for-sylabus-institutes/Institute";
import { getProgramModel } from "@/models/for-sylabus-institutes/Program";

export async function POST(req: Request) {
  try {
    const conn = await connectToDatabase("sylabus-db-institutes");

    const Institute = getInstituteModel(conn);
    const Program = getProgramModel(conn);

    const { institutes } = await req.json();

    if (!Array.isArray(institutes)) {
      return NextResponse.json(
        { error: "institutes array is required" },
        { status: 400 },
      );
    }

    const result: any[] = [];

    for (const inst of institutes) {
      /* ----------------------------- Institute (upsert) ----------------------------- */
      const institute = await Institute.findOneAndUpdate(
        { name: inst.name },
        {
          name: inst.name,
          description: inst.description ?? null,
          logoUrl: inst.logoUrl ?? null,
          abbreviation: inst.abbreviation ?? null,
          society: inst.society ?? null,
          affiliation: inst.affiliation ?? null,
          autonomous: inst.autonomous ?? false,
          naac: inst.naac ?? null,
          location: inst.location ?? null,
        },
        { upsert: true, new: true },
      );

      const programResults: any[] = [];

      /* ----------------------------- Programs (upsert) ----------------------------- */
      for (const prog of inst.programs || []) {
        const program = await Program.findOneAndUpdate(
          {
            instituteId: institute._id as any,
            academicLevel: prog.academicLevel,
            stream: prog.stream,
            degree: prog.degree,
            program: prog.program,
          },
          {
            instituteId: institute._id,
            academicLevel: prog.academicLevel,
            stream: prog.stream,
            degree: prog.degree,
            program: prog.program,
          },
          { upsert: true, new: true },
        );

        programResults.push(program);
      }

      result.push({
        institute,
        programs: programResults,
      });
    }

    return NextResponse.json({
      success: true,
      seeded: result.length,
      data: result,
    });
  } catch (err: any) {
    console.error("Seed error:", err);

    return NextResponse.json(
      { error: err.message || "Seeding failed" },
      { status: 500 },
    );
  }
}
