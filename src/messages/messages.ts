import { formatterPokemonName } from "../helpers/helpers.pokemon";
import { formatterType } from "../helpers/helpers.type";

export const MESSAGE = {
  TYPE: {
    POKEMON_TYPES_TITLE: (name: string, types: string[]) =>
      `${formatterPokemonName(name)} è di tipo ${types
        .map((t) => formatterType(t))
        .join(" - ")}`,
    TYPES_TITLE: (type: string) => formatterType(type),
    DEFENDING: {
      TITLE: `🛡️ <strong>DIFESA</strong>`,
      DOUBLE_EFFECTIVE: (types: readonly string[]) =>
        `<strong>Superdebolezze</strong> <em>(danno 4x)</em>: ${
          types.length > 0
            ? types.map((t) => formatterType(t)).join(" - ")
            : `❌`
        }`,
      DOUBLE_RESISTED: (types: readonly string[]) =>
        `<strong>Superesistenze</strong> <em>(danno 0.25x)</em>: ${
          types.length > 0
            ? types.map((t) => formatterType(t)).join(" - ")
            : `❌`
        }`,
      EFFECTIVE: (types: readonly string[]) =>
        `<strong>Debolezze</strong> <em>(danno 2x)</em>: ${
          types.length > 0
            ? types.map((t) => formatterType(t)).join(" - ")
            : `❌`
        }`,
      EFFECTLESS: (types: readonly string[]) =>
        `<strong>Immunità</strong> <em>(danno 0x)</em>: ${
          types.length > 0
            ? types.map((t) => formatterType(t)).join(" - ")
            : `❌`
        }`,
      RESISTED: (types: readonly string[]) =>
        `<strong>Resistenze</strong> <em>(danno 0.5x)</em>: ${
          types.length > 0
            ? types.map((t) => formatterType(t)).join(" - ")
            : `❌`
        }`,
    },
    ATTACKING: {
      TITLE: `⚔️ <strong>ATTACCO</strong>`,
      DOUBLE_EFFECTIVE: (types: readonly string[]) =>
        `<strong>Molto superefficace</strong> <em>(danno 4x)</em>: ${
          types.length > 0
            ? types.map((t) => formatterType(t)).join(" - ")
            : `❌`
        }`,
      DOUBLE_RESISTED: (types: readonly string[]) =>
        `<strong>Pochissimo efficace</strong> <em>(danno 0.25x)</em>: ${
          types.length > 0
            ? types.map((t) => formatterType(t)).join(" - ")
            : `❌`
        }`,
      EFFECTIVE: (types: readonly string[]) =>
        `<strong>Superefficace</strong> <em>(danno 2x)</em>: ${
          types.length > 0
            ? types.map((t) => formatterType(t)).join(" - ")
            : `❌`
        }`,
      EFFECTLESS: (types: readonly string[]) =>
        `<strong>Senza effetto</strong> <em>(danno 0x)</em>: ${
          types.length > 0
            ? types.map((t) => formatterType(t)).join(" - ")
            : `❌`
        }`,
      RESISTED: (types: readonly string[]) =>
        `<strong>Poco efficace</strong> <em>(danno 0.5x)</em>: ${
          types.length > 0
            ? types.map((t) => formatterType(t)).join(" - ")
            : `❌`
        }`,
    },
  },
  POKEMON: {
    OTHER_FORMS: (of: readonly string[]) =>
      `Attenzione, se stai cercando altre forme prova con: ${of.join(" - ")}`,
    STATS: {
      TITLE: (name: string) => `${name} ha le seguenti statistiche:`,
      TOTALE: (total: number) => `Per un totale di ${total}`,
      ATTACK: (stat: number) => `⚔️ Attacco ${stat}`,
      SPECIAL_ATTACK: (stat: number) => `⭐ Attacco speciale ${stat}`,
      DEFENSE: (stat: number) => `🛡️ Difesa ${stat}`,
      SPECIAL_DEFENSE: (stat: number) => `✨ Difesa speciale ${stat}`,
      SPEED: (stat: number) => `⚡ Velocità ${stat}`,
      PS: (stat: number) => `💚 PS ${stat}`,
    },
  },
  EVO: {
    EVOLVES_TO: (name: string, evoName: string, level: string) =>
      `<strong>${formatterPokemonName(
        name
      )}</strong> ➡️ <strong>${formatterPokemonName(
        evoName
      )}</strong> tramite il trigger: <pre>${
        isNaN(Number(level)) ? level : `Lv ${level}`
      }</pre>`,
    NO_EVO: (name: string) => `${formatterPokemonName(name)} non si evolve`,
    EVOLVES_FROM: (name: string, preEvo: string, level: string) =>
      `<strong>${formatterPokemonName(
        name
      )}</strong> ⬅️ <strong>${formatterPokemonName(
        preEvo
      )}</strong> tramite il trigger: <pre>${
        isNaN(Number(level)) ? level : `Lv ${level}`
      }</pre>`,
  },
  NEW_LINE: `
`,
};
