import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const analyses = pgTable("analyses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  ingredients: text("ingredients").notNull(),
  explanation: text("explanation").notNull(),
  confidence: integer("confidence"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const analyzeSchema = z.object({
  ingredients: z.string().min(10, "Ingredient list too short"),
  imageBase64: z.string().optional(),
});

export const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Analysis = typeof analyses.$inferSelect;
export type AnalyzeInput = z.infer<typeof analyzeSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
