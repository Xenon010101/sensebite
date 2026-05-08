import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeIngredients, answerFollowUp } from "./services/llm";
import { extractTextFromImage } from "./services/ocr";
import { insertUserSchema, analyzeSchema } from "@shared/schema";
import bcryptjs from "bcryptjs";

const SALT_ROUNDS = 10;

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // POST /api/analyze - Analyze ingredients
  app.post("/api/analyze", async (req, res) => {
    try {
      const { ingredients, imageBase64 } = analyzeSchema.parse(req.body);

      let textToAnalyze = ingredients;

      // Extract text from image if provided
      if (imageBase64) {
        try {
          textToAnalyze = await extractTextFromImage(imageBase64);
        } catch (error) {
          console.error("OCR failed, using provided text");
        }
      }

      // Get AI analysis
      const { explanation, confidence } =
        await analyzeIngredients(textToAnalyze);

      // Save to storage if user is logged in
      let analysisId = "temp-" + Date.now().toString();
      if (req.user) {
        const analysis = await storage.createAnalysis(
          req.user.id,
          textToAnalyze,
          explanation,
          confidence
        );
        analysisId = analysis.id;
      }

      res.json({
        explanation,
        confidence,
        analysisId,
      });
    } catch (error: any) {
      console.error("Analyze error:", error);
      res.status(400).json({
        message: error.message || "Failed to analyze ingredients",
      });
    }
  });

  // POST /api/chat - Answer follow-up questions
  app.post("/api/chat", async (req, res) => {
    try {
      const { ingredients, originalExplanation, question } = req.body;

      if (!ingredients || !originalExplanation || !question) {
        return res
          .status(400)
          .json({ message: "Missing required fields" });
      }

      const response = await answerFollowUp(
        ingredients,
        originalExplanation,
        question
      );

      res.json({ response });
    } catch (error: any) {
      console.error("Chat error:", error);
      res.status(500).json({
        message: error.message || "Failed to process chat message",
      });
    }
  });

  // POST /api/auth/register - User registration
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { username, password } = insertUserSchema.parse(req.body);

      // Check if user exists
      const existing = await storage.getUserByUsername(username);
      if (existing) {
        return res.status(400).json({ message: "Username already taken" });
      }

      // Hash password
      const hashedPassword = await bcryptjs.hash(password, SALT_ROUNDS);

      // Create user
      const user = await storage.createUser({
        username,
        password: hashedPassword,
      });

      // Set session
      if (req.session) {
        req.session.userId = user.id;
      }

      res.json({
        user: { id: user.id, username: user.username },
        message: "Registration successful",
      });
    } catch (error: any) {
      console.error("Register error:", error);
      res.status(400).json({
        message: error.message || "Registration failed",
      });
    }
  });

  // POST /api/auth/login - User login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password required" });
      }

      // Find user
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Check password
      const valid = await bcryptjs.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Set session
      if (req.session) {
        req.session.userId = user.id;
      }

      res.json({
        user: { id: user.id, username: user.username },
        message: "Login successful",
      });
    } catch (error: any) {
      console.error("Login error:", error);
      res.status(500).json({
        message: error.message || "Login failed",
      });
    }
  });

  // POST /api/auth/logout - User logout
  app.post("/api/auth/logout", (req, res) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: "Logout failed" });
        }
        res.json({ message: "Logout successful" });
      });
    } else {
      res.json({ message: "Not logged in" });
    }
  });

  // GET /api/user/profile - Get user profile
  app.get("/api/user/profile", (req, res) => {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // In a real app, fetch from database
    res.json({
      id: req.session.userId,
      username: "User",
      createdAt: new Date(),
    });
  });

  // GET /api/user/analyses - Get user's analyses
  app.get("/api/user/analyses", async (req, res) => {
    try {
      if (!req.session || !req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const analyses = await storage.getUserAnalyses(req.session.userId);
      res.json(analyses);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch" });
    }
  });

  return httpServer;
}
