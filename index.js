import express from "express";
import { v4 as uuidv4 } from "uuid";

import cors from "cors";
import dotenv from "dotenv";
import mongodb from "mongodb";
import bodyParser from "body-parser";


dotenv.config();

const MongoClient = mongodb.MongoClient;
const mongo = new MongoClient(process.env.DB_URL, { useUnifiedTopology: true });
const app = express();
const PORT = process.env.PORT || 8080;

mongo.connect();
const credentials = mongo.db("NSP").collection("art-abode");
console.log(credentials);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// parse application/json
app.use(express.json());

app.post("/signUp", async (req, res) => {
  const token = uuidv4();
  try {
    const { body } = req;
    await credentials.insertOne({
      name: body.name,
      email: body.email,
      password: body.pass,
      token: token,
      favourites: [],
    });
    res.send({ status: true });
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  const body = req.body;
  const email = body.email;
  const password = body.pass;

  const user = await credentials.findOne({
    email: email,
  });

  if (user) {
    if (user.password === password) {
      res.type("application/json");
      res.send({ token: user.token, status: true });
    } else {
      res.send({
        status: false,
      });
    }
  } else {
    res.send({ status: null });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(PORT, () => console.log("APi is running on http://localhost:8080"));