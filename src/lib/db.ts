import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { KundliData } from "./astronomy/ephemeris";

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "user" | "admin";
  tier: "free" | "pro" | "premium";
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  savedBirthProfileId?: string;
}

export interface BirthProfile {
  id: string;
  userId: string;
  name: string;
  birthDate: string;
  birthTime: string;
  place: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: number;
  gender?: string;
  chartData?: KundliData;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

export interface AIConversation {
  id: string;
  userId: string;
  title: string;
  birthProfileId?: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: "free" | "pro" | "premium";
  status: "active" | "cancelled" | "expired";
  amount: number;
  currency: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface DatabaseSchema {
  users: User[];
  birthProfiles: BirthProfile[];
  conversations: AIConversation[];
  subscriptions: Subscription[];
  adminSettings: {
    systemNotice?: string;
    aiRateLimitPerDay: {
      free: number;
      pro: number;
      premium: number;
    };
    totalAiQueriesCount: number;
  };
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "database.json");

function ensureDirectoryExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Initial seed data
function getInitialData(): DatabaseSchema {
  const salt = bcrypt.genSaltSync(10);
  const adminPasswordHash = bcrypt.hashSync("admin123", salt);
  const userPasswordHash = bcrypt.hashSync("user123", salt);

  const adminId = "usr_admin_1";
  const demoUserId = "usr_demo_2";

  return {
    users: [
      {
        id: adminId,
        name: "Astroverse Admin",
        email: "admin@astroverse.com",
        passwordHash: adminPasswordHash,
        role: "admin",
        tier: "premium",
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
      },
      {
        id: demoUserId,
        name: "Aryavrat Sharma",
        email: "user@astroverse.com",
        passwordHash: userPasswordHash,
        role: "user",
        tier: "pro",
        createdAt: "2026-02-15T10:30:00.000Z",
        updatedAt: "2026-02-15T10:30:00.000Z",
      },
    ],
    birthProfiles: [
      {
        id: "prof_sample_1",
        userId: demoUserId,
        name: "Aryavrat Sharma",
        birthDate: "1995-10-24",
        birthTime: "07:30",
        place: "New Delhi",
        country: "India",
        latitude: 28.6139,
        longitude: 77.2090,
        timezone: 5.5,
        gender: "Male",
        createdAt: "2026-02-15T10:35:00.000Z",
      },
    ],
    conversations: [
      {
        id: "conv_sample_1",
        userId: demoUserId,
        title: "Career & Dasha Analysis",
        messages: [
          {
            id: "msg_1",
            role: "user",
            content: "What does my 10th house indicate for career prospects in technology and leadership?",
            timestamp: "2026-02-15T10:40:00.000Z",
          },
          {
            id: "msg_2",
            role: "assistant",
            content: "Namaste Aryavrat. In your Vedic birth chart, your 10th house of Karma & Profession is ruled by the Sun. With Sun favorably placed and blessed by Jupiter's divine Drishti (5th aspect), you have strong executive potential. Your current Rahu Mahadasha with Jupiter Antardasha activates high growth in innovative, technology-driven, and strategic fields.",
            timestamp: "2026-02-15T10:40:15.000Z",
          },
        ],
        createdAt: "2026-02-15T10:40:00.000Z",
        updatedAt: "2026-02-15T10:40:15.000Z",
      },
    ],
    subscriptions: [
      {
        id: "sub_1",
        userId: demoUserId,
        planId: "pro",
        status: "active",
        amount: 999,
        currency: "INR",
        razorpayPaymentId: "pay_sample_test_123",
        startDate: "2026-02-15T10:30:00.000Z",
        endDate: "2027-02-15T10:30:00.000Z",
        createdAt: "2026-02-15T10:30:00.000Z",
      },
    ],
    adminSettings: {
      systemNotice: "Cosmic alignments are particularly potent during this month's Guru-Shukra transit.",
      aiRateLimitPerDay: {
        free: 5,
        pro: 50,
        premium: 200,
      },
      totalAiQueriesCount: 148,
    },
  };
}

export function readDatabase(): DatabaseSchema {
  ensureDirectoryExists();
  if (!fs.existsSync(DB_FILE)) {
    const initial = getInitialData();
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), "utf8");
    return initial;
  }
  try {
    const content = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(content);
  } catch {
    const initial = getInitialData();
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), "utf8");
    return initial;
  }
}

export function writeDatabase(data: DatabaseSchema): void {
  ensureDirectoryExists();
  const tmpFile = `${DB_FILE}.tmp`;
  fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), "utf8");
  fs.renameSync(tmpFile, DB_FILE);
}

// User Helpers
export function findUserByEmail(email: string): User | undefined {
  const db = readDatabase();
  return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): User | undefined {
  const db = readDatabase();
  return db.users.find((u) => u.id === id);
}

export function createUser(userData: {
  name: string;
  email: string;
  passwordHash: string;
  role?: "user" | "admin";
  tier?: "free" | "pro" | "premium";
}): User {
  const db = readDatabase();
  const id = `usr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  const now = new Date().toISOString();
  const newUser: User = {
    id,
    name: userData.name,
    email: userData.email,
    passwordHash: userData.passwordHash,
    role: userData.role || "user",
    tier: userData.tier || "free",
    createdAt: now,
    updatedAt: now,
  };
  db.users.push(newUser);
  writeDatabase(db);
  return newUser;
}

export function updateUser(id: string, updates: Partial<User>): User | undefined {
  const db = readDatabase();
  const idx = db.users.findIndex((u) => u.id === id);
  if (idx === -1) return undefined;
  db.users[idx] = {
    ...db.users[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  writeDatabase(db);
  return db.users[idx];
}

export function deleteUser(id: string): boolean {
  const db = readDatabase();
  const initialLen = db.users.length;
  db.users = db.users.filter((u) => u.id !== id);
  if (db.users.length < initialLen) {
    writeDatabase(db);
    return true;
  }
  return false;
}

// Birth Profile Helpers
export function saveBirthProfile(profile: Omit<BirthProfile, "id" | "createdAt">): BirthProfile {
  const db = readDatabase();
  const id = `prof_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  const newProfile: BirthProfile = {
    id,
    ...profile,
    createdAt: new Date().toISOString(),
  };
  db.birthProfiles.push(newProfile);
  writeDatabase(db);
  return newProfile;
}

export function getBirthProfilesByUserId(userId: string): BirthProfile[] {
  const db = readDatabase();
  return db.birthProfiles.filter((p) => p.userId === userId);
}

// Conversation Helpers
export function saveAIConversation(
  userId: string,
  title: string,
  messages: ChatMessage[],
  conversationId?: string
): AIConversation {
  const db = readDatabase();
  const now = new Date().toISOString();
  if (conversationId) {
    const idx = db.conversations.findIndex((c) => c.id === conversationId);
    if (idx !== -1) {
      db.conversations[idx].messages = messages;
      db.conversations[idx].updatedAt = now;
      if (title) db.conversations[idx].title = title;
      writeDatabase(db);
      return db.conversations[idx];
    }
  }

  const id = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  const newConv: AIConversation = {
    id,
    userId,
    title,
    messages,
    createdAt: now,
    updatedAt: now,
  };
  db.conversations.push(newConv);
  db.adminSettings.totalAiQueriesCount += messages.filter((m) => m.role === "user").length;
  writeDatabase(db);
  return newConv;
}

export function getConversationsByUserId(userId: string): AIConversation[] {
  const db = readDatabase();
  return db.conversations
    .filter((c) => c.userId === userId)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

// Subscription Helpers
export function recordSubscription(
  userId: string,
  planId: "free" | "pro" | "premium",
  amount: number,
  razorpayOrderId?: string,
  razorpayPaymentId?: string
): Subscription {
  const db = readDatabase();
  const now = new Date();
  const endDate = new Date(now.getTime() + 365 * 86400000); // 1 year
  const sub: Subscription = {
    id: `sub_${Date.now()}`,
    userId,
    planId,
    status: "active",
    amount,
    currency: "INR",
    razorpayOrderId,
    razorpayPaymentId,
    startDate: now.toISOString(),
    endDate: endDate.toISOString(),
    createdAt: now.toISOString(),
  };

  db.subscriptions.push(sub);

  // Upgrade user tier
  const user = db.users.find((u) => u.id === userId);
  if (user) {
    user.tier = planId;
    user.updatedAt = now.toISOString();
  }

  writeDatabase(db);
  return sub;
}

// Admin Analytics
export function getAdminStats() {
  const db = readDatabase();
  const totalUsers = db.users.length;
  const activeSubs = db.subscriptions.filter((s) => s.status === "active").length;
  const totalRevenue = db.subscriptions.reduce((sum, s) => sum + s.amount, 0);
  const totalConversations = db.conversations.length;
  const totalProfiles = db.birthProfiles.length;

  return {
    totalUsers,
    activeSubscriptions: activeSubs,
    totalRevenue,
    totalConversations,
    totalProfiles,
    totalAiQueries: db.adminSettings.totalAiQueriesCount,
    users: db.users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      tier: u.tier,
      createdAt: u.createdAt,
    })),
    subscriptions: db.subscriptions,
  };
}
