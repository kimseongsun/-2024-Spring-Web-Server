const express = require("express");
const app = express();
// var router = express.Router();

const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const jwtDecode = require("jwt-decode");

dotenv.config();
const { OAuth2Client } = require("google-auth-library");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const cors = require("cors");
// app.use(cors());
//프록시 적용 안되는거 땜빵

const user_query = "";
const answer_query = [
  { 1: "LoL: LOL은 아주 좋은 게임입니다!!!!!!!!!!" },
  { 2: "Dota: Dota는 아주 재밌는 게임입니다!" },
];
let user_name = "";
//수정 필요함.

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.post("/login", async (req, res) => {
  console.log("AXIOS 성공!");
  const access_token = String(req.headers.authorization.split("[0]")); // 액세스 토큰 추출
  console.log("ACCESS Token:", access_token);
  // 토큰 검증
  // try {
  //   const response = await axios.get(
  //     `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${access_token}`
  //   );
  //   const userData = response.data;

  //   // userData를 사용하여 사용자를 인증하거나 데이터베이스에 저장할 수 있습니다.
  //   console.log(userData);

  //   res.status(200).json({ message: "User authenticated", user: userData });
  // } catch (error) {
  //   res
  //     .status(401)
  //     .json({ message: "Token verification failed", error: error.message });
  //   //PROXY 설정은 해결됨, 여기서 Token을 반환하지 못함
  // }

  const decode_token = jwtDecode.jwtDecode(access_token);
  console.log("Decoded Token:", decode_token);
  user_name = decode_token.name;
});

// app.post("/api/login", async function (req, res, next) {
//   const redirectUrl = "/oauth";

//   const oAuth2Client = new OAuth2Client(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     redirectUrl
//   );

//   const authorizeUrl = oAuth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: "https://www.googleapis.com/auth/userinfo.profile openid",
//     prompt: "consent",
//   });

//   res.json({ url: authorizeUrl });
// });

// async function getUserData(access_token) {
//   const response = await fetch(
//     `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
//   );
//   const data = await response.json();
//   console.log("data", data);
// }

// app.get("/oauth", async function (req, res, next) {
//   const code = req.query.code;
//   try {
//     const redirectUrl = "/oauth";
//     const oAuth2Client = new OAuth2Client(
//       process.env.CLIENT_ID,
//       process.env.CLIENT_SECRET,
//       redirectUrl
//     );
//     const res = await oAuth2Client.getToken(code);
//     await oAuth2Client.setCredentials(res.tokens);
//     console.log("Tokens acquired");
//     const user = oAuth2Client.setCredentials;
//     console.log("credentials", user);
//     await getUserData(user.access_token);
//   } catch (err) {
//     console.log("Error with signig in google");
//   }
// });

// app.post("/api/login", (req, res) => {});

app.get("/home", async (req, res) => {
  console.log("AXIOS 성공!");
  res.json(user_name);
});

//초기 로그인 화면

app.get("/answer_Query", async (req, res) => {
  console.log("answer_Query Get Axios 성공!");
  res.json(answer_query);
});

app.post("/api/user_Query", (req, res) => {
  res.redirect("/api/answer_Query");
});

app.post("/post", (req, res) => {});

app.listen(8080, () => {
  console.log("Sever Start!");
});
