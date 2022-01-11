import "dotenv/config.js";
import express from "express";
import "./db/mongoose.js";
import users from "./routes/users.js";
import protectedRoute from "./routes/protected.js"

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/user", users);
app.use("/info", protectedRoute);

app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
);
