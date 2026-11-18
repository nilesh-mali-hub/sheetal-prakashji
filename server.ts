import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import { createClient } from "@libsql/client";
import fs from "fs";

async function startServer() {
  // Ensure data directory exists
  if (!fs.existsSync("data")) {
    fs.mkdirSync("data");
  }

  // Initialize schema with fallback if DB is corrupted
  let db = createClient({
    url: "file:data/wedding.db",
  });

  const initSchema = async (client: typeof db) => {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS rsvps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        mobile TEXT NOT NULL,
        guestsCount INTEGER NOT NULL,
        attending INTEGER DEFAULT 1,
        dietaryRequirements TEXT DEFAULT '',
        mealPreference TEXT,
        accommodation TEXT,
        message TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const columnsResult = await client.execute("PRAGMA table_info(rsvps)");
    const existingColumns = new Set(columnsResult.rows.map((row) => String(row.name)));
    if (!existingColumns.has("attending")) {
      await client.execute("ALTER TABLE rsvps ADD COLUMN attending INTEGER DEFAULT 1");
    }
    if (!existingColumns.has("dietaryRequirements")) {
      await client.execute("ALTER TABLE rsvps ADD COLUMN dietaryRequirements TEXT DEFAULT ''");
    }

    await client.execute(`
      CREATE TABLE IF NOT EXISTS wishes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        message TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  };

  try {
    await initSchema(db);
  } catch (err) {
    console.error("Database error during schema initialization, recreating database:", err);
    try {
      if (fs.existsSync("data/wedding.db")) fs.unlinkSync("data/wedding.db");
      if (fs.existsSync("data/wedding.db-journal")) fs.unlinkSync("data/wedding.db-journal");
    } catch (e) {
      console.error("Failed to delete corrupted database file:", e);
    }
    db = createClient({ url: "file:data/wedding.db" });
    await initSchema(db);
  }

  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());
  app.use(express.static(path.join(process.cwd(), "public")));

  // API Routes
  app.get("/api/rsvps", async (req, res) => {
    try {
      const result = await db.execute("SELECT * FROM rsvps ORDER BY createdAt DESC");
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch RSVPs" });
    }
  });

  app.post("/api/rsvps", async (req, res) => {
    try {
      const {
        name,
        mobile,
        guestsCount,
        attending = true,
        dietaryRequirements = "",
        mealPreference,
        accommodation = "",
        message,
      } = req.body;
      const isAttending = attending === false || attending === "no" || attending === 0 ? 0 : 1;
      const cleanDietary = typeof dietaryRequirements === "string" ? dietaryRequirements.trim() : "";
      await db.execute({
        sql: "INSERT INTO rsvps (name, mobile, guestsCount, attending, dietaryRequirements, mealPreference, accommodation, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        args: [
          name,
          mobile,
          isAttending ? guestsCount : 0,
          isAttending,
          cleanDietary,
          mealPreference || (isAttending ? cleanDietary || "Attending" : "Unable to Attend"),
          accommodation,
          message || "",
        ],
      });
      res.status(201).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to submit RSVP" });
    }
  });

  app.get("/api/wishes", async (req, res) => {
    try {
      const result = await db.execute("SELECT * FROM wishes ORDER BY createdAt DESC");
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch wishes" });
    }
  });

  app.post("/api/wishes", async (req, res) => {
    try {
      const { name, message } = req.body;
      await db.execute({
        sql: "INSERT INTO wishes (name, message) VALUES (?, ?)",
        args: [name, message]
      });
      res.status(201).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to submit wish" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, { index: false }));
    app.get("*all", (req, res) => {
      const htmlPath = path.join(distPath, "index.html");
      const appUrl = (process.env.APP_URL || "").replace(/\/$/, "");
      if (appUrl && fs.existsSync(htmlPath)) {
        const html = fs
          .readFileSync(htmlPath, "utf-8")
          .replace(/https:\/\/sheetal-prakashji\.vercel\.app/g, appUrl);
        res.type("html").send(html);
        return;
      }
      res.sendFile(htmlPath);
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
