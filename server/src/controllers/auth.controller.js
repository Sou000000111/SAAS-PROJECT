export const login = (req, res) => {
  console.log("🔥 LOGIN API HIT");
  console.log(req.body);

  return res.status(200).json({
    token: "test-token",
    user: {
      id: "123",
      email: req.body.email,
    },
  });
};
