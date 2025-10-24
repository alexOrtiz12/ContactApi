import express from "express";
import cors from "cors";
import contactRoutes from "./src/interfaces/routes/contactRoutes.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import healthRoutes from "./src/interfaces/routes/healthRoutes.js"; // <- importar

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setTimeout(300000, () => { 
    console.error("Request timeout: la petición tardó demasiado.");
    if (!res.headersSent) {
      res.status(408).json({ success: false, error: "Request timeout" });
    }
  });
  next();
});

// 🔹 Rutas de la API
app.use("/api/contact", contactRoutes);

// 🔹 Health check endpoint
app.use("/health", healthRoutes);

app.use(errorHandler);

export default app;
