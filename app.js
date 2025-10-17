import express from "express";
import cors from "cors";
import contactRoutes from "./src/interfaces/routes/contactRoutes.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contact", contactRoutes);

app.use(errorHandler);

export default app;


