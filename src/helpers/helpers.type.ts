export const formatterType = (name: string) => {
  switch (name) {
    case "normal":
      return name.charAt(0).toUpperCase() + name.slice(1) + "⚪";
    case "fire":
      return name.charAt(0).toUpperCase() + name.slice(1) + "🔥";
    case "water":
      return name.charAt(0).toUpperCase() + name.slice(1) + "🌊";
    case "grass":
      return name.charAt(0).toUpperCase() + name.slice(1) + "🌿";
    case "electric":
      return name.charAt(0).toUpperCase() + name.slice(1) + "⚡";
    case "fighting":
      return name.charAt(0).toUpperCase() + name.slice(1) + "🦶";
    case "ice":
      return name.charAt(0).toUpperCase() + name.slice(1) + "❄️";
    case "poison":
      return name.charAt(0).toUpperCase() + name.slice(1) + "💀";
    case "ground":
      return name.charAt(0).toUpperCase() + name.slice(1) + "🌍";
    case "flying":
      return name.charAt(0).toUpperCase() + name.slice(1) + "🪶";
    case "psychic":
      return name.charAt(0).toUpperCase() + name.slice(1) + "🧠";
    case "rock":
      return name.charAt(0).toUpperCase() + name.slice(1) + "🪨";
    case "ghost":
      return name.charAt(0).toUpperCase() + name.slice(1) + "👻";
    case "dark":
      return name.charAt(0).toUpperCase() + name.slice(1) + "⚫";
    case "dragon":
      return name.charAt(0).toUpperCase() + name.slice(1) + "🐉";
    case "steel":
      return name.charAt(0).toUpperCase() + name.slice(1) + "🤖";
    case "fairy":
      return name.charAt(0).toUpperCase() + name.slice(1) + "🧚";
    case "bug":
      return name.charAt(0).toUpperCase() + name.slice(1) + "🐛";
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
