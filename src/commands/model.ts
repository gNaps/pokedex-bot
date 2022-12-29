import { Maybe, Stats } from "@favware/graphql-pokemon";
import { CommandContext, Context } from "grammy";
import { gqlRequest } from "../api/api";
import { GraphQLPokemonResponse } from "../helpers/helpers.pokemon";
import { MESSAGE } from "../messages/messages";
import { getPokemonImageQuery } from "../queries/queries.pokemon";

export const model = async (ctx: CommandContext<Context>) => {
  const { match } = ctx;
  if (!match) {
    ctx.reply("Nessun pokemon indicato");
    return;
  }

  try {
    const { data: pokemonData }: GraphQLPokemonResponse<"getPokemon"> =
      await gqlRequest(
        getPokemonImageQuery(match),
        `GET_POKEMON_MODEL_${match}`
      );
    const { shinySprite, shinyBackSprite, sprite, backSprite, otherFormes } =
      pokemonData.getPokemon;

    const messages = formatMessage(match, sprite, backSprite, otherFormes);

    messages.forEach(async (m) => {
      await ctx.reply(m, { disable_web_page_preview: true });
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

export const modelShiny = async (ctx: CommandContext<Context>) => {
  const { match } = ctx;
  if (!match) {
    ctx.reply("Nessun pokemon indicato");
    return;
  }

  try {
    const { data: pokemonData }: GraphQLPokemonResponse<"getPokemon"> =
      await gqlRequest(
        getPokemonImageQuery(match),
        `GET_POKEMON_MODEL_${match}`
      );
    const { shinySprite, shinyBackSprite, sprite, backSprite, otherFormes } =
      pokemonData.getPokemon;

    const messages = formatMessage(
      match,
      shinySprite,
      shinyBackSprite,
      otherFormes
    );

    messages.forEach(async (m) => {
      await ctx.reply(m, { disable_web_page_preview: true });
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
  sprite: string,
  backSprite: string,
  otherFormes: Maybe<readonly string[]> | undefined
) => {
  let message = [];

  message.push(sprite);
  message.push(backSprite);

  if (otherFormes && otherFormes.length > 0) {
    message.push(MESSAGE.POKEMON.OTHER_FORMS(otherFormes));
  }

  return message;
};
