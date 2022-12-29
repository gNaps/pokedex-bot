export const getPokemonEvoQuery = (name: string) => {
  return `{
    getPokemon(pokemon: ${name}) {
      evolutions {
        species,
        evolutionLevel,
        evolutions {
          species,
          evolutionLevel
        }
      }
      preevolutions {
        species,
      }
      evolutionLevel,
      otherFormes
    } 
  }`;
};

export const getPokemonStatsQuery = (name: string) => {
  return `{
    getPokemon(pokemon: ${name}) {
      baseStats {
        attack
        defense
        hp
        specialattack
        specialdefense
        speed
      }
      baseStatsTotal,
      otherFormes
    } 
  }`;
};

export const getPokemonImageQuery = (name: string) => {
  return `{
    getPokemon(pokemon: ${name}) {
      shinySprite
      shinyBackSprite
      sprite
      backSprite
      otherFormes
    } 
  }`;
};

export const getPokemonNumQuery = (name: string) => {
  return `{
    getPokemon(pokemon: ${name}) {
      num
      otherFormes
    } 
  }`;
};
