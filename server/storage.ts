import { 
  type User, 
  type InsertUser, 
  type WebsiteGeneration, 
  type InsertWebsiteGeneration,
  type GeneratedWebsite 
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createWebsiteGeneration(generation: InsertWebsiteGeneration): Promise<WebsiteGeneration>;
  getWebsiteGeneration(id: string): Promise<WebsiteGeneration | undefined>;
  updateWebsiteGeneration(id: string, updates: Partial<WebsiteGeneration>): Promise<WebsiteGeneration | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private websiteGenerations: Map<string, WebsiteGeneration>;

  constructor() {
    this.users = new Map();
    this.websiteGenerations = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createWebsiteGeneration(insertGeneration: InsertWebsiteGeneration): Promise<WebsiteGeneration> {
    const id = randomUUID();
    const generation: WebsiteGeneration = {
      ...insertGeneration,
      id,
      generatedCode: null,
      status: "pending",
      error: null,
      createdAt: new Date(),
    };
    this.websiteGenerations.set(id, generation);
    return generation;
  }

  async getWebsiteGeneration(id: string): Promise<WebsiteGeneration | undefined> {
    return this.websiteGenerations.get(id);
  }

  async updateWebsiteGeneration(id: string, updates: Partial<WebsiteGeneration>): Promise<WebsiteGeneration | undefined> {
    const existing = this.websiteGenerations.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.websiteGenerations.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
