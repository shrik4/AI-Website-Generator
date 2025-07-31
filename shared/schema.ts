import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const websiteGenerations = pgTable("website_generations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  description: text("description").notNull(),
  provider: text("provider").notNull(), // openai, gemini, anthropic, openrouter
  model: text("model").notNull(),
  generatedCode: jsonb("generated_code"), // {frontend: string, backend: string}
  status: text("status").notNull().default("pending"), // pending, generating, completed, failed
  error: text("error"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertWebsiteGenerationSchema = createInsertSchema(websiteGenerations).pick({
  description: true,
  provider: true,
  model: true,
});

export const generateWebsiteSchema = z.object({
  description: z.string().min(10, "Description must be at least 10 characters"),
  provider: z.enum(["openai", "gemini", "anthropic", "openrouter"]),
  model: z.string().min(1, "Model is required"),
  apiKey: z.string().min(1, "API key is required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertWebsiteGeneration = z.infer<typeof insertWebsiteGenerationSchema>;
export type WebsiteGeneration = typeof websiteGenerations.$inferSelect;
export type GenerateWebsiteRequest = z.infer<typeof generateWebsiteSchema>;

export interface GeneratedWebsite {
  frontend: string;
  backend: string;
  readme: string;
  requirements: string;
}
