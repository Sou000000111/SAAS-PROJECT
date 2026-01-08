import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  const { range = "month" } = req.query;

  // 🔹 Dummy real-like data (later DB/MySQL se aayega)
  const dataByRange = {
    today: {
      stats: {
        totalUsers: 1250,
        activeUsers: 820,
        revenue: 12000,
        growth: 3,
        newSignups: 12,
        churnRate: 1.2,
        avgSession: "3m 10s",
        bounceRate: 18,
        activePercent: 72,
        inactivePercent: 28,
      },
      chart: [
        { name: "10 AM", users: 120 },
        { name: "12 PM", users: 240 },
        { name: "2 PM", users: 380 },
        { name: "4 PM", users: 520 },
      ],
    },

    week: {
      stats: {
        totalUsers: 1250,
        activeUsers: 910,
        revenue: 85000,
        growth: 12,
        newSignups: 42,
        churnRate: 2.3,
        avgSession: "4m 18s",
        bounceRate: 17,
        activePercent: 78,
        inactivePercent: 22,
      },
      chart: [
        { name: "Mon", users: 200 },
        { name: "Tue", users: 300 },
        { name: "Wed", users: 450 },
        { name: "Thu", users: 600 },
        { name: "Fri", users: 780 },
      ],
    },

    month: {
      stats: {
        totalUsers: 1250,
        activeUsers: 980,
        revenue: 240000,
        growth: 18,
        newSignups: 180,
        churnRate: 1.9,
        avgSession: "4m 45s",
        bounceRate: 14,
        activePercent: 82,
        inactivePercent: 18,
      },
      chart: [
        { name: "Week 1", users: 300 },
        { name: "Week 2", users: 520 },
        { name: "Week 3", users: 760 },
        { name: "Week 4", users: 980 },
      ],
    },
  };

  res.json(dataByRange[range]);
});

export default router;
