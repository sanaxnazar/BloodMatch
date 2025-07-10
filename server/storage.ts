import { users, donations, matches, type User, type InsertUser, type Donation, type InsertDonation, type Match, type InsertMatch } from "@shared/schema";
import { db } from "./db";
import { eq, and, sql } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined>;
  getUsersByBloodGroup(bloodGroup: string, userType: string): Promise<User[]>;
  getUsersByLocation(location: string, userType: string): Promise<User[]>;
  
  // Donation methods
  getDonation(id: number): Promise<Donation | undefined>;
  createDonation(donation: InsertDonation): Promise<Donation>;
  updateDonation(id: number, updates: Partial<InsertDonation>): Promise<Donation | undefined>;
  getDonationsByUser(userId: number): Promise<Donation[]>;
  getDonationsByBloodGroup(bloodGroup: string): Promise<Donation[]>;
  
  // Match methods
  getMatch(id: number): Promise<Match | undefined>;
  createMatch(match: InsertMatch): Promise<Match>;
  updateMatch(id: number, updates: Partial<InsertMatch>): Promise<Match | undefined>;
  getMatchesForUser(userId: number): Promise<Match[]>;
  findPotentialMatches(bloodGroup: string, location: string): Promise<Match[]>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getUsersByBloodGroup(bloodGroup: string, userType: string): Promise<User[]> {
    return await db
      .select()
      .from(users)
      .where(and(
        eq(users.bloodGroup, bloodGroup),
        eq(users.userType, userType),
        eq(users.isAvailable, true)
      ));
  }

  async getUsersByLocation(location: string, userType: string): Promise<User[]> {
    return await db
      .select()
      .from(users)
      .where(and(
        eq(users.location, location),
        eq(users.userType, userType),
        eq(users.isAvailable, true)
      ));
  }

  // Donation methods
  async getDonation(id: number): Promise<Donation | undefined> {
    const [donation] = await db.select().from(donations).where(eq(donations.id, id));
    return donation || undefined;
  }

  async createDonation(insertDonation: InsertDonation): Promise<Donation> {
    const [donation] = await db
      .insert(donations)
      .values(insertDonation)
      .returning();
    return donation;
  }

  async updateDonation(id: number, updates: Partial<InsertDonation>): Promise<Donation | undefined> {
    const [donation] = await db
      .update(donations)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(donations.id, id))
      .returning();
    return donation || undefined;
  }

  async getDonationsByUser(userId: number): Promise<Donation[]> {
    return await db
      .select()
      .from(donations)
      .where(eq(donations.donorId, userId));
  }

  async getDonationsByBloodGroup(bloodGroup: string): Promise<Donation[]> {
    return await db
      .select()
      .from(donations)
      .where(eq(donations.bloodGroup, bloodGroup));
  }

  // Match methods
  async getMatch(id: number): Promise<Match | undefined> {
    const [match] = await db.select().from(matches).where(eq(matches.id, id));
    return match || undefined;
  }

  async createMatch(insertMatch: InsertMatch): Promise<Match> {
    const [match] = await db
      .insert(matches)
      .values(insertMatch)
      .returning();
    return match;
  }

  async updateMatch(id: number, updates: Partial<InsertMatch>): Promise<Match | undefined> {
    const [match] = await db
      .update(matches)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(matches.id, id))
      .returning();
    return match || undefined;
  }

  async getMatchesForUser(userId: number): Promise<Match[]> {
    return await db
      .select()
      .from(matches)
      .where(eq(matches.donorId, userId));
  }

  async findPotentialMatches(bloodGroup: string, location: string): Promise<Match[]> {
    return await db
      .select()
      .from(matches)
      .where(and(
        eq(matches.bloodGroup, bloodGroup),
        eq(matches.status, 'pending')
      ));
  }
}

export const storage = new DatabaseStorage();
