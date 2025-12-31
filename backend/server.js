import express from "express";
import cors from "cors";
import checkRoute from "./routes/checkRoute.js";

const app = express();
app.use(cors());
app.use("/api", checkRoute);

app.listen(5001, () => {
  console.log("Server running on port 5001");
});
