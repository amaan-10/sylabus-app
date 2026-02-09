import { NextResponse } from "next/server";
import { connectToInstituteDB } from "@/lib/db-connect/sylabus-db-institutes";
import Institute from "@/models/for-sylabus-institutes/Institute";
import Program from "@/models/for-sylabus-institutes/Program";

export async function POST(req: Request) {
  try {
    await connectToInstituteDB();

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
            instituteId: institute._id,
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

// curl -X POST http://localhost:3000/api/institute/admin/seed -H "Content-Type: application/json" --data-binary "@scripts/aisc.json"
