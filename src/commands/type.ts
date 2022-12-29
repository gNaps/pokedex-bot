import { CommandContext, Context } from "grammy";
import type { Maybe, Query, TypeMatchup } from "@favware/graphql-pokemon";
import {
  getPokemonTypeQuery,
  getTypeMatchUpQuery,
} from "../queries/queries.type";
import { checkIsType } from "../helpers/helpers.type";
import { gqlRequest } from "../api/api";
import { MESSAGE } from "../messages/messages";
import { GraphQLPokemonResponse } from "../helpers/helpers.pokemon";

export const type = async (ctx: CommandContext<Context>) => {
  const { match } = ctx;
  if (!match) {
    ctx.reply("Nessun pokemon o tipo indicato");
    return;
  }

  const isType = checkIsType(match);

  try {
    if (!isType) {
      // A pokemon is request, get pokemon types name
      const { data: pokemonData }: GraphQLPokemonResponse<"getPokemon"> =
        await gqlRequest(
          getPokemonTypeQuery(match),
          `GET_POKEMON_TYPE_${match}`
        );
      const { types: typesArray, otherFormes } = pokemonData.getPokemon;
      const types = typesArray.map((t: any) => t.name.toLowerCase());

      // Get matchup for the types
      const { data: typesData }: GraphQLPokemonResponse<"getTypeMatchup"> =
        await gqlRequest(
          getTypeMatchUpQuery(types[0], types[1] ?? ""),
          `GET_MATCHUP_${types[0]}${types[1] ? `_${types[1]}` : ""}`
        );

      ctx.reply(
        formatMessage(match, types, typesData.getTypeMatchup, otherFormes),
        {
          parse_mode: "HTML",
        }
      );
      return;
    } else {
      // A type si requested, get type matchup
      const { data } = await gqlRequest(
        getTypeMatchUpQuery(match),
        `GET_MATCHUP_${match}`
      );
      ctx.reply(formatMessage("", [match], data.getTypeMatchup, []), {
        parse_mode: "HTML",
      });
      return;
    }
  } catch (err) {
    console.log("err", err);
    ctx.reply(
      "Errore nella richiesta, verifica di aver scritto correttamente il nome del pokemon o del tipo"
    );
    return;
  }
};

const formatMessage = (
  pokemonName: string,
  types: string[],
  matchUp: Omit<TypeMatchup, "__typename">,
  otherFormes: Maybe<readonly string[]> | undefined
) => {
  let message = pokemonName
    ? MESSAGE.TYPE.POKEMON_TYPES_TITLE(pokemonName, types)
    : MESSAGE.TYPE.TYPES_TITLE(types[0]);

  message += MESSAGE.NEW_LINE;
  message += MESSAGE.NEW_LINE;

  const {
    doubleEffectiveTypes: defDoubleEffectiveTypes,
    doubleResistedTypes: defDoubleResistedTypes,
    effectiveTypes: defEffectiveTypes,
    effectlessTypes: defEffectlessTypes,
    resistedTypes: defResistedTypes,
  } = matchUp.defending;

  message += MESSAGE.TYPE.DEFENDING.TITLE;
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.TYPE.DEFENDING.DOUBLE_EFFECTIVE(defDoubleEffectiveTypes);
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.TYPE.DEFENDING.EFFECTIVE(defEffectiveTypes);
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.TYPE.DEFENDING.RESISTED(defResistedTypes);
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.TYPE.DEFENDING.DOUBLE_RESISTED(defDoubleResistedTypes);
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.TYPE.DEFENDING.EFFECTLESS(defEffectlessTypes);
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.NEW_LINE;

  const {
    //doubleEffectiveTypes: atkDoubleEffectiveTypes,
    //doubleResistedTypes: atkDoubleResistedTypes,
    effectiveTypes: atkEffectiveTypes,
    effectlessTypes: atkEffectlessTypes,
    resistedTypes: atkResistedTypes,
  } = matchUp.attacking;

  message += MESSAGE.TYPE.ATTACKING.TITLE;
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.NEW_LINE;
  //message += MESSAGE.TYPE.ATTACKING.DOUBLE_EFFECTIVE(atkDoubleEffectiveTypes);
  message += MESSAGE.TYPE.ATTACKING.EFFECTIVE(atkEffectiveTypes);
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.TYPE.ATTACKING.RESISTED(atkResistedTypes);
  //message += MESSAGE.TYPE.ATTACKING.DOUBLE_RESISTED(atkDoubleResistedTypes);
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.TYPE.ATTACKING.EFFECTLESS(atkEffectlessTypes);
  message += MESSAGE.NEW_LINE;
  message += MESSAGE.NEW_LINE;

  if (otherFormes && otherFormes.length > 0) {
    message += MESSAGE.POKEMON.OTHER_FORMS(otherFormes);
    message += MESSAGE.NEW_LINE;
  }

  return message;
};
