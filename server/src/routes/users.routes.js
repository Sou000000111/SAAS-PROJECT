import express from "express";
const router = express.Router();

// Dummy users (later DB se replace hoga)
let users = [
  { id: 1, name: "Soumyajit Sinha", email: "soumyajit@gmail.com", role: "Admin", status: "Active" },
  { id: 2, name: "Rahul Das", email: "rahul@gmail.com", role: "User", status: "Inactive" },
  { id: 3, name: "Ankit Roy", email: "ankit@gmail.com", role: "User", status: "Active" },
  { id: 4, name: "Puja Sen", email: "puja@gmail.com", role: "Manager", status: "Active" },
];

// ✅ GET USERS (pagination + role filter)
router.get("/", (req, res) => {
  const { page = 1, limit = 3, role, search = "" } = req.query;


  let filteredUsers = role
    ? users.filter((u) => u.role === role)
    : users;

      // 🔍 SEARCH FILTER
   if (search) {
     filteredUsers = filteredUsers.filter(
     (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
    );
  }

  const startIndex = (Number(page) - 1) * Number(limit);
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + Number(limit)
  );

  res.json({
    data: paginatedUsers,
    total: filteredUsers.length,
  });
});

// ✅ CREATE USER (🔥 MISSING ROUTE)
router.post("/", (req, res) => {
  const { name, email, role = "User", status = "Active" } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Name and Email are required",
    });
  }

  const newUser = {
    id: Date.now(), // simple unique id
    name,
    email,
    role,
    status,
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    data: newUser,
  });
});

// ✅ UPDATE USER
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  users = users.map((u) =>
    u.id === id ? { ...u, ...req.body } : u
  );

  res.json({ success: true });
});

// ✅ DELETE USER
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  users = users.filter((u) => u.id !== id);

  res.json({ success: true });
});

// search users by name or email


export default router;
