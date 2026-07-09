const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const users = require("../data/users");
const fs = require("fs");
const path = require("path");

const usersFile = path.join(__dirname, "../data/users.json");

const getUsers = () => {
  const data = fs.readFileSync(usersFile, "utf8");
  return JSON.parse(data);
};

const saveUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const users = getUsers();

    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now(),
      name,
      email,
      password: hashedPassword,
      role: "student",
    };

    users.push(newUser);
    saveUsers(users);
    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = getUsers();
    // Admin Login
    if (email === "admin@gmail.com" && password === "123456") {
      const token = jwt.sign(
        {
          email,
          role: "admin",
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        },
      );

      return res.json({
        success: true,
        token,
        role: "admin",
        name: "Admin",
        email: "admin@gmail.com",
      });
    }

    const user = users.find((user) => user.email === email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.json({
      success: true,
      token,
      role: user.role,
      name: user.name,
      email: user.email,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
