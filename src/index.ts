import { Bot, webhookCallback } from "grammy";
import { evo } from "./commands/evo";
import express from "express";
import * as dotenv from "dotenv";
import { type } from "./commands/type";
import { help } from "./commands/help";
import { stats } from "./commands/stats";
import { model, modelShiny } from "./commands/model";

dotenv.config();
const ENVIRONMENT = process.env.NODE_ENV || "";
const BOT_TOKEN = process.env.BOT_TOKEN || "";
const SECRET_PATH = process.env.SECRET_PATH || "";

const bot = new Bot(BOT_TOKEN);

bot.command("start", (ctx) => ctx.reply("Welcome bro!"));
bot.command("info", (ctx) => ctx.reply("Pokedex Bot made by napsryu"));
bot.command("evo", (ctx) => evo(ctx));
bot.command("type", (ctx) => type(ctx));
bot.command("stats", (ctx) => stats(ctx));
bot.command("model", (ctx) => model(ctx));
bot.command("shiny", (ctx) => modelShiny(ctx));
bot.command("help", (ctx) => help(ctx));

const production = () => {
  const port = 8000;
  const app = express();
  app.use(express.json());
  app.use(`/${SECRET_PATH}`, webhookCallback(bot, "express"));
  app.use((_req, res) => res.status(200).send());

  app.listen(port, () => console.log(`listening on port ${port}`));
};

const development = () => {
  bot.start();
};

ENVIRONMENT === "production" ? production() : development();
