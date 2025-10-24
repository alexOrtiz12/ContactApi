import express from "express";

const router = express.Router();

// Endpoint de health check
router.get("/", (req, res) => {
  console.log(`[HEALTH] Ping recibido a las ${new Date().toISOString()}`);
  res.status(200).json({ success: true, message: "API está activa ✅" });
});

export default router;
