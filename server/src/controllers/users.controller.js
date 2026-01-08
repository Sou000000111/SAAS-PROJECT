import { db } from "../config/db.js";

export const getUsers = async (req, res) => {
  const [rows] = await db.query(
    "SELECT id,name,email,role FROM users"
  );
  res.json(rows);
};

export const createUser = async (req, res) => {
  const { name, email, role, status } = req.body;

  const newUser = {
    id: Date.now(),
    name,
    email,
    role,
    status,
  };

  res.status(201).json({
    success: true,
    data: newUser,
  });
};
