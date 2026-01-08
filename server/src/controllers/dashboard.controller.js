import { db } from "../config/db.js";

export const getStats = async (req, res) => {
  const [[u]] = await db.query("SELECT COUNT(*) total FROM users");
  const [[r]] = await db.query("SELECT SUM(amount) total FROM subscriptions");

  res.json({
    users: u.total,
    revenue: r.total || 0,
    systemHealth: "99.9%"
  });
};
