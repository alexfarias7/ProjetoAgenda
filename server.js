import Express from "express";
import routes from "./routes.js";
import path from "path";
import Mongoose from "mongoose";
import dotEnv from "dotenv";
import { fileURLToPath } from "url";
import meuMiddleware from "./src/middlewares/midleware.js";
import { checaErro , csurfMiddlaware} from "./src/middlewares/midleware.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "connect-flash";
//import helmet from "helmet";
import csurf from "csurf";

const dados = dotEnv.config();

Mongoose.connect(process.env.ConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 
})
  .then(() => {
    app.emit("pronto");
  })
  .catch((e) => console.log(e));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = Express(); 

const sessionOpitons = session({
  secret: "hdgdygd",
  store: MongoStore.create({ mongoUrl: process.env.ConnectionString }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});


app.use(sessionOpitons);
app.use(flash());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json())
app.use(Express.static(path.resolve(__dirname, "public")));

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(csurf())

//* midlewares próprios
app.use(csurfMiddlaware)
app.use(meuMiddleware);
app.use(checaErro)

app.use(routes);

app.on("pronto", () => {
  app.listen(3000, () => {
    console.log(" acessar http://localhost:3000");
    console.log("servidor executando");
  });
});

//* req=> é o que o cliente esta enviando
//* res=> é a resposta entregada ao cliente
