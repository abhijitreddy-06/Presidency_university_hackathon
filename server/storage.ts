import { 
  users, diabetesPredictions, heartDiseasePredictions, kidneyDiseasePredictions, liverDiseasePredictions,
  User, 
  InsertUser,
  DiabetesPrediction,
  InsertDiabetesPrediction,
  HeartDiseasePrediction,
  InsertHeartDiseasePrediction,
  KidneyDiseasePrediction,
  InsertKidneyDiseasePrediction,
  LiverDiseasePrediction,
  InsertLiverDiseasePrediction
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Helper function to convert JS date to SQL date string
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Storage interface for CRUD operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Diabetes prediction operations
  createDiabetesPrediction(prediction: InsertDiabetesPrediction): Promise<DiabetesPrediction>;
  getDiabetesPredictions(userId: number): Promise<DiabetesPrediction[]>;
  getDiabetesPrediction(id: number): Promise<DiabetesPrediction | undefined>;
  
  // Heart disease prediction operations
  createHeartDiseasePrediction(prediction: InsertHeartDiseasePrediction): Promise<HeartDiseasePrediction>;
  getHeartDiseasePredictions(userId: number): Promise<HeartDiseasePrediction[]>;
  getHeartDiseasePrediction(id: number): Promise<HeartDiseasePrediction | undefined>;
  
  // Kidney disease prediction operations
  createKidneyDiseasePrediction(prediction: InsertKidneyDiseasePrediction): Promise<KidneyDiseasePrediction>;
  getKidneyDiseasePredictions(userId: number): Promise<KidneyDiseasePrediction[]>;
  getKidneyDiseasePrediction(id: number): Promise<KidneyDiseasePrediction | undefined>;
  
  // Liver disease prediction operations
  createLiverDiseasePrediction(prediction: InsertLiverDiseasePrediction): Promise<LiverDiseasePrediction>;
  getLiverDiseasePredictions(userId: number): Promise<LiverDiseasePrediction[]>;
  getLiverDiseasePrediction(id: number): Promise<LiverDiseasePrediction | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result.length > 0 ? result[0] : undefined;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result.length > 0 ? result[0] : undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }
  
  // Diabetes prediction methods
  async createDiabetesPrediction(prediction: InsertDiabetesPrediction): Promise<DiabetesPrediction> {
    const now = formatDate(new Date());
    // Convert to snake_case for the database
    const values = {
      age: prediction.age,
      gender: prediction.gender,
      family_history: prediction.familyHistory,
      glucose: prediction.glucose,
      bmi: prediction.bmi,
      blood_pressure: prediction.bloodPressure,
      insulin: prediction.insulin,
      risk_percentage: prediction.riskPercentage,
      created_at: now
    };
    // Add userId if present
    if (prediction.userId !== undefined) {
      Object.assign(values, { user_id: prediction.userId });
    }
    
    const result = await db.insert(diabetesPredictions)
      .values(values)
      .returning();
    return result[0];
  }
  
  async getDiabetesPredictions(userId: number): Promise<DiabetesPrediction[]> {
    return await db.select().from(diabetesPredictions).where(eq(diabetesPredictions.userId, userId));
  }
  
  async getDiabetesPrediction(id: number): Promise<DiabetesPrediction | undefined> {
    const result = await db.select().from(diabetesPredictions).where(eq(diabetesPredictions.id, id));
    return result.length > 0 ? result[0] : undefined;
  }
  
  // Heart disease prediction methods
  async createHeartDiseasePrediction(prediction: InsertHeartDiseasePrediction): Promise<HeartDiseasePrediction> {
    const now = formatDate(new Date());
    // Convert to snake_case for the database
    const values = {
      age: prediction.age,
      gender: prediction.gender,
      chest_pain_type: prediction.chestPainType,
      blood_pressure: prediction.bloodPressure,
      cholesterol: prediction.cholesterol,
      max_heart_rate: prediction.maxHeartRate,
      fasting_blood_sugar: prediction.fastingBloodSugar,
      exercise_angina: prediction.exerciseAngina,
      risk_percentage: prediction.riskPercentage,
      created_at: now
    };
    // Add userId if present
    if (prediction.userId !== undefined) {
      Object.assign(values, { user_id: prediction.userId });
    }
    
    const result = await db.insert(heartDiseasePredictions)
      .values(values)
      .returning();
    return result[0];
  }
  
  async getHeartDiseasePredictions(userId: number): Promise<HeartDiseasePrediction[]> {
    return await db.select().from(heartDiseasePredictions).where(eq(heartDiseasePredictions.userId, userId));
  }
  
  async getHeartDiseasePrediction(id: number): Promise<HeartDiseasePrediction | undefined> {
    const result = await db.select().from(heartDiseasePredictions).where(eq(heartDiseasePredictions.id, id));
    return result.length > 0 ? result[0] : undefined;
  }
  
  // Kidney disease prediction methods
  async createKidneyDiseasePrediction(prediction: InsertKidneyDiseasePrediction): Promise<KidneyDiseasePrediction> {
    const now = formatDate(new Date());
    // Convert to snake_case for the database
    const values = {
      age: prediction.age,
      blood_pressure: prediction.bloodPressure,
      creatinine: prediction.creatinine,
      albumin: prediction.albumin,
      blood_sugar: prediction.bloodSugar,
      hemoglobin: prediction.hemoglobin,
      urea: prediction.urea,
      sodium: prediction.sodium,
      potassium: prediction.potassium,
      risk_percentage: prediction.riskPercentage,
      created_at: now
    };
    // Add userId if present
    if (prediction.userId !== undefined) {
      Object.assign(values, { user_id: prediction.userId });
    }
    
    const result = await db.insert(kidneyDiseasePredictions)
      .values(values)
      .returning();
    return result[0];
  }
  
  async getKidneyDiseasePredictions(userId: number): Promise<KidneyDiseasePrediction[]> {
    return await db.select().from(kidneyDiseasePredictions).where(eq(kidneyDiseasePredictions.userId, userId));
  }
  
  async getKidneyDiseasePrediction(id: number): Promise<KidneyDiseasePrediction | undefined> {
    const result = await db.select().from(kidneyDiseasePredictions).where(eq(kidneyDiseasePredictions.id, id));
    return result.length > 0 ? result[0] : undefined;
  }
  
  // Liver disease prediction methods
  async createLiverDiseasePrediction(prediction: InsertLiverDiseasePrediction): Promise<LiverDiseasePrediction> {
    const now = formatDate(new Date());
    // Convert to snake_case for the database
    const values = {
      age: prediction.age,
      gender: prediction.gender,
      total_bilirubin: prediction.totalBilirubin,
      direct_bilirubin: prediction.directBilirubin,
      alkaline_phosphatase: prediction.alkalinePhosphatase,
      alt: prediction.alt,
      ast: prediction.ast,
      total_proteins: prediction.totalProteins,
      albumin_globulin_ratio: prediction.albuminGlobulinRatio,
      risk_percentage: prediction.riskPercentage,
      created_at: now
    };
    // Add userId if present
    if (prediction.userId !== undefined) {
      Object.assign(values, { user_id: prediction.userId });
    }
    
    const result = await db.insert(liverDiseasePredictions)
      .values(values)
      .returning();
    return result[0];
  }
  
  async getLiverDiseasePredictions(userId: number): Promise<LiverDiseasePrediction[]> {
    return await db.select().from(liverDiseasePredictions).where(eq(liverDiseasePredictions.userId, userId));
  }
  
  async getLiverDiseasePrediction(id: number): Promise<LiverDiseasePrediction | undefined> {
    const result = await db.select().from(liverDiseasePredictions).where(eq(liverDiseasePredictions.id, id));
    return result.length > 0 ? result[0] : undefined;
  }
}

export const storage = new DatabaseStorage();
