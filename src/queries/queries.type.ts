export const getTypeMatchUpQuery = (
  primaryType: string,
  secondaryType: string = ""
) => {
  return `{
    getTypeMatchup(primaryType: ${primaryType} ${
    secondaryType ? `, secondaryType: ${secondaryType}` : ""
  }) {
      defending {
        doubleEffectiveTypes
        doubleResistedTypes
        effectiveTypes
        effectlessTypes
        normalTypes
        resistedTypes
      }
      attacking {
        doubleEffectiveTypes
        doubleResistedTypes
        effectiveTypes
        effectlessTypes
        normalTypes
        resistedTypes
      }
    }
  }`;
};

export const getPokemonTypeQuery = (name: string) => {
  return `{
    getPokemon(pokemon: ${name}) {
      types {
        name
      }
      otherFormes
    }
  }`;
};
