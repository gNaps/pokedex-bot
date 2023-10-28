import { Maybe, Stats } from "@favware/graphql-pokemon";
import { CommandContext, Context } from "grammy";
import { gqlRequest } from "../api/api";
import { GraphQLPokemonResponse } from "../helpers/helpers.pokemon";
import { MESSAGE } from "../messages/messages";
import { getPokemonStatsQuery } from "../queries/queries.pokemon";

export const stats = async (ctx: CommandContext<Context>) => {
  const { match } = ctx;
  if (!match) {
    ctx.reply("Nessun pokemon indicato");
    return;
  }

  try {
    const { data: pokemonData }: GraphQLPokemonResponse<"getPokemon"> =
      await gqlRequest(
        getPokemonStatsQuery(match),
        `GET_POKEMON_STATS_${match}`
      );
    const { baseStats, baseStatsTotal, otherFormes } = pokemonData.getPokemon;

    ctx.reply(formatMessage(match, baseStats, baseStatsTotal, otherFormes), {
      parse_mode: "HTML",
    });

    return;
  } catch (error) {
    console.log("err", error);
    ctx.reply(
      "Errore nella richiesta, verifica di aver scritto correttamente il nome del pokemon"
    );
    return;
  }
};

const formatMessage = (
  pokemon: string,
  baseStats: Stats,
  baseStatsTotal: number,
  otherFormes: Maybe<readonly string[]> | undefined
) => {
  let message = "";

  message += MESSAGE.POKEMON.STATS.TITLE(pokemon);
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.POKEMON.STATS.ATTACK(baseStats.attack);
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.POKEMON.STATS.SPECIAL_ATTACK(baseStats.specialattack);
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.POKEMON.STATS.ATTACK(baseStats.defense);
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.POKEMON.STATS.SPECIAL_DEFENSE(baseStats.specialdefense);
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.POKEMON.STATS.SPEED(baseStats.speed);
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.POKEMON.STATS.PS(baseStats.hp);
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.POKEMON.STATS.TOTALE(baseStatsTotal);

  if (otherFormes && otherFormes.length > 0) {
    message += MESSAGE.NEW_LINE;
    message += MESSAGE.POKEMON.OTHER_FORMS(otherFormes);
    message += MESSAGE.NEW_LINE;
  }

  return message;
};
