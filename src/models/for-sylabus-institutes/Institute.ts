import { Schema, Connection, Model, Document } from "mongoose";

export interface IInstitute extends Document {
  name: string;
  description?: string;
  logoUrl?: string;
  abbreviation: string;
  society?: string;
  affiliation?: string;
  autonomous?: boolean;
  naac?: string;
  location?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const InstituteSchema = new Schema<IInstitute>(
  {
    name: { type: String, required: true },
    description: { type: String },
    logoUrl: { type: String },
    abbreviation: { type: String, required: true },
    society: String,
    affiliation: String,
    autonomous: Boolean,
    naac: String,
    location: String,
  },
  { timestamps: true },
);

/* helpful indexes */
InstituteSchema.index({ abbreviation: 1 }, { unique: true });
InstituteSchema.index({ name: 1 });

/* connection-based model */
export const getInstituteModel = (conn: Connection): Model<IInstitute> => {
  return (
    conn.models.Institute ||
    conn.model<IInstitute>("Institute", InstituteSchema)
  );
};
