import express from "express";
const router = express.Router();

router.get("/stats", (req, res) => {
  res.json({
    totalUsers: 120,
    activeUsers: 87,
    revenue: 45200,
    churnRate: 2.3
  });
});

export default router;
