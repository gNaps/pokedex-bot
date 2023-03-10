export const formatterType = (name: string) => {
  switch (name) {
    case "normal":
      return name.charAt(0).toUpperCase() + name.slice(1) + "âŠ";
    case "fire":
      return name.charAt(0).toUpperCase() + name.slice(1) + "ðĨ";
    case "water":
      return name.charAt(0).toUpperCase() + name.slice(1) + "ð";
    case "grass":
      return name.charAt(0).toUpperCase() + name.slice(1) + "ðŋ";
    case "electric":
      return name.charAt(0).toUpperCase() + name.slice(1) + "âĄ";
    case "fighting":
      return name.charAt(0).toUpperCase() + name.slice(1) + "ðĶķ";
    case "ice":
      return name.charAt(0).toUpperCase() + name.slice(1) + "âïļ";
    case "poison":
      return name.charAt(0).toUpperCase() + name.slice(1) + "ð";
    case "ground":
      return name.charAt(0).toUpperCase() + name.slice(1) + "ð";
    case "flying":
      return name.charAt(0).toUpperCase() + name.slice(1) + "ðŠķ";
    case "psychic":
      return name.charAt(0).toUpperCase() + name.slice(1) + "ð§ ";
    case "rock":
      return name.charAt(0).toUpperCase() + name.slice(1) + "ðŠĻ";
    case "ghost":
      return name.charAt(0).toUpperCase() + name.slice(1) + "ðŧ";
    case "dark":
      return name.charAt(0).toUpperCase() + name.slice(1) + "âŦ";
    case "dragon":
      return name.charAt(0).toUpperCase() + name.slice(1) + "ð";
    case "steel":
      return name.charAt(0).toUpperCase() + name.slice(1) + "ðĪ";
    case "fairy":
      return name.charAt(0).toUpperCase() + name.slice(1) + "ð§";
    case "bug":
      return name.charAt(0).toUpperCase() + name.slice(1) + "ð";
    default:
      break;
  }
  return "";
};

export const checkIsType = (type: string) => {
  const typesArray = [
    "normal",
    "fire",
    "water",
    "grass",
    "electric",
    "fighting",
    "ice",
    "poison",
    "ground",
    "flying",
    "psychic",
    "rock",
    "ghost",
    "dark",
    "dragon",
    "steel",
    "fairy",
    "bug",
  ];
  return typesArray.some((t) => t === type);
};
