import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  bloodGroup: text("blood_group").notNull(),
  location: text("location").notNull(),
  age: integer("age").notNull(),
  weight: decimal("weight"),
  userType: text("user_type").notNull(), // 'donor' or 'seeker'
  isAvailable: boolean("is_available").default(true),
  lastDonation: timestamp("last_donation"),
  medicalConditions: text("medical_conditions"),
  emergencyContact: text("emergency_contact"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  donorId: integer("donor_id").references(() => users.id),
  seekerId: integer("seeker_id").references(() => users.id),
  bloodGroup: text("blood_group").notNull(),
  amount: decimal("amount"), // in ml
  donationType: text("donation_type").notNull(), // 'whole_blood', 'platelets', 'plasma'
  location: text("location").notNull(),
  status: text("status").notNull().default('pending'), // 'pending', 'completed', 'cancelled'
  urgency: text("urgency").notNull().default('normal'), // 'critical', 'normal'
  scheduledDate: timestamp("scheduled_date"),
  completedDate: timestamp("completed_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  donorId: integer("donor_id").references(() => users.id),
  seekerId: integer("seeker_id").references(() => users.id),
  bloodGroup: text("blood_group").notNull(),
  distance: decimal("distance"), // in miles/km
  compatibilityScore: integer("compatibility_score"), // 0-100
  status: text("status").notNull().default('pending'), // 'pending', 'accepted', 'declined'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  donatedDonations: many(donations, { relationName: "donor" }),
  receivedDonations: many(donations, { relationName: "seeker" }),
  donorMatches: many(matches, { relationName: "donor" }),
  seekerMatches: many(matches, { relationName: "seeker" }),
}));

export const donationsRelations = relations(donations, ({ one }) => ({
  donor: one(users, {
    fields: [donations.donorId],
    references: [users.id],
    relationName: "donor",
  }),
  seeker: one(users, {
    fields: [donations.seekerId],
    references: [users.id],
    relationName: "seeker",
  }),
}));

export const matchesRelations = relations(matches, ({ one }) => ({
  donor: one(users, {
    fields: [matches.donorId],
    references: [users.id],
    relationName: "donor",
  }),
  seeker: one(users, {
    fields: [matches.seekerId],
    references: [users.id],
    relationName: "seeker",
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertDonationSchema = createInsertSchema(donations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMatchSchema = createInsertSchema(matches).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type Donation = typeof donations.$inferSelect;
export type InsertMatch = z.infer<typeof insertMatchSchema>;
export type Match = typeof matches.$inferSelect;
