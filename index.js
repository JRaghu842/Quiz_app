let express = require("express");
let cors = require("cors");

require("dotenv").config();
const { connection } = require("./configs/db");
const { UserRouter } = require("./routes/user.routes");
const { QuizRouter } = require("./routes/quiz.routes");

let app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend check route.........");
});

app.use("/", UserRouter);
app.use("/", QuizRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`Server is live at port ${process.env.port}`);
    console.log("Conntected to MongoDB Atlas server");
  } catch (error) {}
});
