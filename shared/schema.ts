import { pgTable, text, serial, integer, boolean, real, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
});

// Diabetes predictions table
export const diabetesPredictions = pgTable("diabetes_predictions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  age: integer("age").notNull(),
  gender: text("gender").notNull(),
  familyHistory: boolean("family_history").notNull(),
  glucose: real("glucose").notNull(),
  bmi: real("bmi").notNull(),
  bloodPressure: integer("blood_pressure").notNull(),
  insulin: real("insulin").notNull(),
  riskPercentage: real("risk_percentage").notNull(),
  createdAt: date("created_at").notNull(),
});

export const insertDiabetesPredictionSchema = createInsertSchema(diabetesPredictions).omit({
  id: true,
  createdAt: true,
});

// Heart disease predictions table
export const heartDiseasePredictions = pgTable("heart_disease_predictions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  age: integer("age").notNull(),
  gender: text("gender").notNull(),
  chestPainType: text("chest_pain_type").notNull(),
  cholesterol: real("cholesterol").notNull(),
  maxHeartRate: integer("max_heart_rate").notNull(),
  bloodPressure: integer("blood_pressure").notNull(),
  fastingBloodSugar: integer("fasting_blood_sugar").notNull(),
  exerciseAngina: boolean("exercise_angina").notNull(),
  riskPercentage: real("risk_percentage").notNull(),
  createdAt: date("created_at").notNull(),
});

export const insertHeartDiseasePredictionSchema = createInsertSchema(heartDiseasePredictions).omit({
  id: true,
  createdAt: true,
});

// Kidney disease predictions table
export const kidneyDiseasePredictions = pgTable("kidney_disease_predictions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  age: integer("age").notNull(),
  bloodPressure: integer("blood_pressure").notNull(),
  creatinine: real("creatinine").notNull(),
  albumin: real("albumin").notNull(),
  bloodSugar: real("blood_sugar").notNull(),
  hemoglobin: real("hemoglobin").notNull(),
  urea: real("urea").notNull(),
  sodium: real("sodium").notNull(),
  potassium: real("potassium").notNull(),
  riskPercentage: real("risk_percentage").notNull(),
  createdAt: date("created_at").notNull(),
});

export const insertKidneyDiseasePredictionSchema = createInsertSchema(kidneyDiseasePredictions).omit({
  id: true,
  createdAt: true,
});

// Liver disease predictions table
export const liverDiseasePredictions = pgTable("liver_disease_predictions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  age: integer("age").notNull(),
  gender: text("gender").notNull(),
  totalBilirubin: real("total_bilirubin").notNull(),
  directBilirubin: real("direct_bilirubin").notNull(),
  alkalinePhosphatase: real("alkaline_phosphatase").notNull(),
  alt: real("alt").notNull(),
  ast: real("ast").notNull(),
  totalProteins: real("total_proteins").notNull(),
  albuminGlobulinRatio: real("albumin_globulin_ratio").notNull(),
  riskPercentage: real("risk_percentage").notNull(),
  createdAt: date("created_at").notNull(),
});

export const insertLiverDiseasePredictionSchema = createInsertSchema(liverDiseasePredictions).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertDiabetesPrediction = z.infer<typeof insertDiabetesPredictionSchema>;
export type DiabetesPrediction = typeof diabetesPredictions.$inferSelect;

export type InsertHeartDiseasePrediction = z.infer<typeof insertHeartDiseasePredictionSchema>;
export type HeartDiseasePrediction = typeof heartDiseasePredictions.$inferSelect;

export type InsertKidneyDiseasePrediction = z.infer<typeof insertKidneyDiseasePredictionSchema>;
export type KidneyDiseasePrediction = typeof kidneyDiseasePredictions.$inferSelect;

export type InsertLiverDiseasePrediction = z.infer<typeof insertLiverDiseasePredictionSchema>;
export type LiverDiseasePrediction = typeof liverDiseasePredictions.$inferSelect;
