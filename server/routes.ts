import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check route
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Basic API routes
  app.get('/api/users', async (req, res) => {
    try {
      // This will use mock data for now since database isn't connected
      res.json({ users: [] });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
