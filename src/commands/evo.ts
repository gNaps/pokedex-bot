import { Maybe, Pokemon } from "@favware/graphql-pokemon";
import { CommandContext, Context } from "grammy";
import { gqlRequest } from "../api/api";
import { GraphQLPokemonResponse } from "../helpers/helpers.pokemon";
import { MESSAGE } from "../messages/messages";
import { getPokemonEvoQuery } from "../queries/queries.pokemon";

export const evo = async (ctx: CommandContext<Context>) => {
  const { match } = ctx;
  if (!match) {
    ctx.reply("Nessun pokemon indicato");
    return;
  }

  try {
    const { data: pokemonData }: GraphQLPokemonResponse<"getPokemon"> =
      await gqlRequest(getPokemonEvoQuery(match), `GET_POKEMON_EVO_${match}`);
    const { evolutions, preevolutions, evolutionLevel, otherFormes } =
      pokemonData.getPokemon;
    ctx.reply(
      formatMessage(
        match,
        evolutions,
        preevolutions,
        evolutionLevel,
        otherFormes
      ),
      {
        parse_mode: "HTML",
      }
    );
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
  evolutions: Maybe<readonly Pokemon[]> | undefined,
  preevolutions: Maybe<readonly Pokemon[]> | undefined,
  evolutionLevel: Maybe<string> | undefined,
  otherFormes: Maybe<readonly string[]> | undefined
) => {
  let message = "";

  if (!evolutions) {
    message += MESSAGE.EVO.NO_EVO(pokemon);
    message += MESSAGE.NEW_LINE;
  } else {
    for (let i = 0; i < evolutions.length; i++) {
      message += MESSAGE.EVO.EVOLVES_TO(
        pokemon,
        evolutions[i].species,
        evolutions[i].evolutionLevel!
      );
      message += MESSAGE.NEW_LINE;
      message += MESSAGE.NEW_LINE;
      if (evolutions[i].evolutions) {
        const otherEvo = evolutions[i].evolutions;
        for (let j = 0; j < otherEvo!.length; j++) {
          message += MESSAGE.EVO.EVOLVES_TO(
            evolutions[i].species,
            otherEvo![j].species,
            otherEvo![j].evolutionLevel!
          );
          message += MESSAGE.NEW_LINE;
          message += MESSAGE.NEW_LINE;
        }
      }
    }
  }

  if (preevolutions) {
    message += MESSAGE.EVO.EVOLVES_FROM(
      pokemon,
      preevolutions[0].species,
      evolutionLevel!
    );
    message += MESSAGE.NEW_LINE;
  }

  if (otherFormes && otherFormes.length > 0) {
    message += MESSAGE.NEW_LINE;
    message += MESSAGE.POKEMON.OTHER_FORMS(otherFormes);
    message += MESSAGE.NEW_LINE;
  }

  return message;
};
