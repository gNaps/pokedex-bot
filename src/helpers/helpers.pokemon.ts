import { Query } from "@favware/graphql-pokemon";
import { CommandContext, Context } from "grammy";

export const getPokemon = async (
  ctx: CommandContext<Context>,
  pokedex: any
) => {
  try {
    const item: any = ctx.match;

    if (!item) {
      ctx.reply("Non hai indicato nessun pokemon");
      return;
    }
    const pokemon: any = await pokedex.getPokemonByName(item);

    if (!pokemon) {
      ctx.reply("Nessun pokemon trovato");
      return;
    }

    return pokemon;
  } catch (err) {
    ctx.reply("Nessun pokemon trovato con questo nome");
  }
};

export interface GraphQLPokemonResponse<
  K extends keyof Omit<Query, "__typename">
> {
  data: Record<K, Omit<Query[K], "__typename">>;
}

export const formatterPokemonName = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const imagePokemon = (type: string, id: number, name: string) => {
  let image = "";
  switch (type) {
    case "home":
      image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
      break;
    case "artwork":
      image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      break;
    case "sprite":
      image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
      break;
    case "model":
      image = `https://play.pokemonshowdown.com/sprites/ani-shiny/${name}.gif`;
    default:
      break;
  }

  return image;
};
