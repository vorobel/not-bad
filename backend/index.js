import express from "express";
import ip from "ip";
import cors from "cors";
import dotenv from "dotenv";
import Response from "./domain/response.js";
import logger from "./utils/logger.js";
import HttpStatus from "./controller/user.controller.js";

dotenv.config();
const PORT = 3005;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  const response = new Response(
    HttpStatus.OK.code,
    HttpStatus.OK.status,
    "Welcome to the backend",
    {
      email: "jack.sparrow@gmail.com",
      firstName: "Jack",
      lastName: "Sparrow",
      imageUrl: "https://xsgames.co/randomusers/assets/avatars/male/3.jpg",
      phone: "+48123456789",
    }
  );
  res.json(response);
});

app.listen(PORT, () => {
  logger.info(`Server is running on: ${ip.address()}:${PORT}`);
});
