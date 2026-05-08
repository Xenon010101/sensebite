import { type User, type InsertUser, type Analysis } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAnalysis(id: string): Promise<Analysis | undefined>;
  getUserAnalyses(userId: string): Promise<Analysis[]>;
  createAnalysis(
    userId: string,
    ingredients: string,
    explanation: string,
    confidence?: number
  ): Promise<Analysis>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private analyses: Map<string, Analysis>;

  constructor() {
    this.users = new Map();
    this.analyses = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getAnalysis(id: string): Promise<Analysis | undefined> {
    return this.analyses.get(id);
  }

  async getUserAnalyses(userId: string): Promise<Analysis[]> {
    return Array.from(this.analyses.values()).filter(
      (a) => a.userId === userId
    );
  }

  async createAnalysis(
    userId: string,
    ingredients: string,
    explanation: string,
    confidence?: number
  ): Promise<Analysis> {
    const id = randomUUID();
    const analysis: Analysis = {
      id,
      userId,
      ingredients,
      explanation,
      confidence: confidence || 0,
      createdAt: new Date(),
    };
    this.analyses.set(id, analysis);
    return analysis;
  }
}

export const storage = new MemStorage();
