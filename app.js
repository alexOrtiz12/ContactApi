import express from "express";
import cors from "cors";
import contactRoutes from "./src/interfaces/routes/contactRoutes.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setTimeout(120000, () => { 
    console.error("Request timeout: la petición tardó demasiado.");
    if (!res.headersSent) {
      res.status(408).json({ success: false, error: "Request timeout" });
    }
  });
  next();
});

app.use("/api/contact", contactRoutes);

app.use(errorHandler);

export default app;


