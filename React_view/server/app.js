const express = require("express");
const app = express();
var router = express.Router();

const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
const { OAuth2Client } = require("google-auth-library");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const user_query = "";
const answer_query = [
  { 1: "LoL: LOL은 아주 좋은 게임입니다!!!!!!!!!!" },
  { 2: "Dota: Dota는 아주 재밌는 게임입니다!" },
];
const user_name = "Tester2";

router.post("/", async function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "htpp://localhost:5173");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  const redirectUrl = "http://127.0.0.1:3000/oauth";

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectUrl
  );

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/userinfo.profile openid",
    prompt: "consent",
  });

  res.json({ url: authorizeUrl });
});

app.post("/api/login", (req, res) => {});

app.get("/api/home", (req, res) => {
  res.json(user_name);
});

//초기 로그인 화면

app.get("/api/answer_Query", (req, res) => {
  res.json(answer_query);
});

app.post("/api/user_Query", (req, res) => {
  res.redirect("/api/answer_Query");
});

app.post("/post", (req, res) => {});

app.listen(8080, () => {
  console.log("Sever Start!");
});
