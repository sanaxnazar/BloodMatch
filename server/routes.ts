import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertDonationSchema, insertMatchSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid user data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const user = await storage.updateUser(id, updates);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  app.get("/api/users/blood-group/:bloodGroup/:userType", async (req, res) => {
    try {
      const { bloodGroup, userType } = req.params;
      const users = await storage.getUsersByBloodGroup(bloodGroup, userType);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users by blood group" });
    }
  });

  app.get("/api/users/location/:location/:userType", async (req, res) => {
    try {
      const { location, userType } = req.params;
      const users = await storage.getUsersByLocation(location, userType);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users by location" });
    }
  });

  // Donation routes
  app.get("/api/donations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const donation = await storage.getDonation(id);
      if (!donation) {
        return res.status(404).json({ error: "Donation not found" });
      }
      res.json(donation);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch donation" });
    }
  });

  app.post("/api/donations", async (req, res) => {
    try {
      const donationData = insertDonationSchema.parse(req.body);
      const donation = await storage.createDonation(donationData);
      res.status(201).json(donation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid donation data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create donation" });
    }
  });

  app.put("/api/donations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const donation = await storage.updateDonation(id, updates);
      if (!donation) {
        return res.status(404).json({ error: "Donation not found" });
      }
      res.json(donation);
    } catch (error) {
      res.status(500).json({ error: "Failed to update donation" });
    }
  });

  app.get("/api/donations/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const donations = await storage.getDonationsByUser(userId);
      res.json(donations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user donations" });
    }
  });

  app.get("/api/donations/blood-group/:bloodGroup", async (req, res) => {
    try {
      const { bloodGroup } = req.params;
      const donations = await storage.getDonationsByBloodGroup(bloodGroup);
      res.json(donations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch donations by blood group" });
    }
  });

  // Match routes
  app.get("/api/matches/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const match = await storage.getMatch(id);
      if (!match) {
        return res.status(404).json({ error: "Match not found" });
      }
      res.json(match);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch match" });
    }
  });

  app.post("/api/matches", async (req, res) => {
    try {
      const matchData = insertMatchSchema.parse(req.body);
      const match = await storage.createMatch(matchData);
      res.status(201).json(match);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid match data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create match" });
    }
  });

  app.put("/api/matches/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const match = await storage.updateMatch(id, updates);
      if (!match) {
        return res.status(404).json({ error: "Match not found" });
      }
      res.json(match);
    } catch (error) {
      res.status(500).json({ error: "Failed to update match" });
    }
  });

  app.get("/api/matches/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const matches = await storage.getMatchesForUser(userId);
      res.json(matches);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user matches" });
    }
  });

  app.get("/api/matches/find/:bloodGroup/:location", async (req, res) => {
    try {
      const { bloodGroup, location } = req.params;
      const matches = await storage.findPotentialMatches(bloodGroup, location);
      res.json(matches);
    } catch (error) {
      res.status(500).json({ error: "Failed to find potential matches" });
    }
  });

  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      // Note: In a real application, you would hash and compare passwords
      res.json({ user: { ...user, password: undefined }, token: "mock-jwt-token" });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }
      const user = await storage.createUser(userData);
      res.status(201).json({ user: { ...user, password: undefined }, token: "mock-jwt-token" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid user data", details: error.errors });
      }
      res.status(500).json({ error: "Registration failed" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
