import express from "express";
import path from "path";
import { spawn, ChildProcess } from "child_process";
import { createServer as createViteServer } from "vite";

let flaskProcess: ChildProcess | null = null;

function startFlaskBackend() {
  console.log("[Node Server] Spawning Python Flask API backend (app.py) on port 5000...");
  flaskProcess = spawn("python3", ["app.py"], {
    env: { ...process.env, PORT: "5000" },
    stdio: "inherit"
  });

  flaskProcess.on("error", (err) => {
    console.error("[Node Server] Failed to start Python Flask process:", err);
  });

  flaskProcess.on("exit", (code) => {
    console.log(`[Node Server] Python Flask process exited with code ${code}`);
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;
  const FLASK_URL = "https://student-performance-project-y2wl.onrender.com";

  // Start Python Flask API backend
  startFlaskBackend();

  app.use(express.json());

  // Proxy /api/* requests directly to Python Flask Backend
  app.use("/api", async (req, res) => {
    const targetUrl = `${FLASK_URL}${req.url}`;
    try {
      const options: RequestInit = {
        method: req.method,
        headers: {
          "Content-Type": req.headers["content-type"] || "application/json"
        }
      };

      if (["POST", "PUT", "PATCH"].includes(req.method) && req.body && Object.keys(req.body).length > 0) {
        options.body = JSON.stringify(req.body);
      }

      const flaskRes = await fetch(targetUrl, options);
      const data = await flaskRes.text();
      
      res.status(flaskRes.status);
      res.setHeader("Content-Type", flaskRes.headers.get("content-type") || "application/json");
      res.send(data);
    } catch (err: any) {
      console.error(`[Proxy Error] Failed to proxy ${req.method} /api${req.url} to Flask:`, err.message);
      res.status(502).json({
        status: "error",
        message: "Failed to connect to Python Flask backend API. Ensuring backend is initializing...",
        details: err.message
      });
    }
  });

  // Serve React Frontend via Vite Middleware (Dev) or Static Files (Production)
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Node Server] Running on http://0.0.0.0:${PORT} (Proxying /api to Flask)`);
  });
}

startServer();
