import { z } from "zod";

export const analyzeResponseSchema = z.object({
  explanation: z.string(),
  warnings: z.array(z.string()).optional(),
  confidence: z.number().min(0).max(100).optional(),
  analysisId: z.string(),
});

export const chatResponseSchema = z.object({
  response: z.string(),
  followUpSuggestions: z.array(z.string()).optional(),
});

export const authResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    username: z.string(),
  }),
  message: z.string(),
});

export const errorResponseSchema = z.object({
  message: z.string(),
  code: z.string().optional(),
});

export const userProfileSchema = z.object({
  id: z.string(),
  username: z.string(),
  createdAt: z.date(),
});

export const analysisHistorySchema = z.array(
  z.object({
    id: z.string(),
    ingredients: z.string(),
    explanation: z.string(),
    createdAt: z.date(),
  })
);

export type AnalyzeResponse = z.infer<typeof analyzeResponseSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
export type UserProfile = z.infer<typeof userProfileSchema>;
export type AnalysisHistory = z.infer<typeof analysisHistorySchema>;
