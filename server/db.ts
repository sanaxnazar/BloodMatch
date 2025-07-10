import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Check for Supabase connection string or fallback
const databaseUrl = process.env.DATABASE_URL || process.env.SUPABASE_URL;

let pool: Pool | null = null;
let db: any = null;

if (!databaseUrl) {
  console.warn("Database URL not found. Please ensure Supabase is properly connected.");
  // Use null values for development - this will be replaced when Supabase is fully configured
  pool = null;
  db = null;
} else {
  pool = new Pool({ connectionString: databaseUrl });
  db = drizzle({ client: pool, schema });
}

export { pool, db };