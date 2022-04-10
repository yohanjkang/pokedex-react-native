export function ShadeColor(color, percent) {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
}

export const typeNames = {
  bug: 1,
  dark: 1,
  dragon: 1,
  electric: 1,
  fairy: 1,
  fighting: 1,
  fire: 1,
  flying: 1,
  ghost: 1,
  grass: 1,
  ground: 1,
  ice: 1,
  normal: 1,
  poison: 1,
  psychic: 1,
  rock: 1,
  steel: 1,
  water: 1,
};

export function EffectivenessCalculator(type1, type2) {
  const types = { ...typeNames };

  switch (type1) {
    case "bug":
      // Weak against
      types["flying"] *= 2;
      types["rock"] *= 2;
      types["fire"] *= 2;

      // Resistant to
      types["fighting"] /= 2;
      types["ground"] /= 2;
      types["grass"] /= 2;
      break;

    case "dark":
      // Weak against
      types["fighting"] *= 2;
      types["bug"] *= 2;
      types["fairy"] *= 2;

      // Resistant to
      types["ghost"] /= 2;
      types["dark"] /= 2;
      types["psychic"] = 0;
      break;

    case "dragon":
      // Weak against
      types["ice"] *= 2;
      types["dragon"] *= 2;
      types["fairy"] *= 2;

      // Resistant to
      types["fire"] /= 2;
      types["water"] /= 2;
      types["electric"] /= 2;
      types["grass"] /= 2;
      break;

    case "electric":
      // Weak against
      types["ground"] *= 2;

      // Resistant to
      types["electric"] /= 2;
      types["flying"] /= 2;
      types["steel"] /= 2;
      break;

    case "fairy":
      // Weak against
      types["poison"] *= 2;
      types["steel"] *= 2;

      // Resistant to
      types["fighting"] /= 2;
      types["bug"] /= 2;
      types["dark"] /= 2;
      types["dragon"] = 0;
      break;

    case "fighting":
      // Weak against
      types["flying"] *= 2;
      types["psychic"] *= 2;
      types["fairy"] *= 2;

      // Resistant to
      types["bug"] /= 2;
      types["rock"] /= 2;
      types["dark"] /= 2;
      break;

    case "fire":
      // Weak against
      types["water"] *= 2;
      types["ground"] *= 2;
      types["rock"] *= 2;

      // Resistant to
      types["fire"] /= 2;
      types["grass"] /= 2;
      types["ice"] /= 2;
      types["steel"] /= 2;
      types["fairy"] /= 2;
      break;

    case "flying":
      // Weak against
      types["electric"] *= 2;
      types["ice"] *= 2;
      types["rock"] *= 2;

      // Resistant to
      types["grass"] /= 2;
      types["fighting"] /= 2;
      types["bug"] /= 2;
      types["ground"] = 0;
      break;

    case "ghost":
      // Weak against
      types["ghost"] *= 2;
      types["dark"] *= 2;

      // Resistant to
      types["bug"] /= 2;
      types["normal"] = 0;
      types["fighting"] = 0;
      break;

    case "grass":
      // Weak against
      types["fire"] *= 2;
      types["ice"] *= 2;
      types["poison"] *= 2;
      types["flying"] *= 2;
      types["bug"] *= 2;

      // Resistant to
      types["water"] /= 2;
      types["electric"] /= 2;
      types["grass"] /= 2;
      types["ground"] /= 2;
      break;

    case "ground":
      // Weak against
      types["water"] *= 2;
      types["grass"] *= 2;
      types["ice"] *= 2;

      // Resistant to
      types["poison"] /= 2;
      types["rock"] /= 2;
      types["electric"] = 0;
      break;

    case "ice":
      // Weak against
      types["fire"] *= 2;
      types["fighting"] *= 2;
      types["rock"] *= 2;
      types["steel"] *= 2;

      // Resistant to
      types["ice"] /= 2;
      break;

    case "normal":
      // Weak against
      types["fighting"] *= 2;

      // Resistant to
      types["ghost"] = 0;
      break;

    case "poison":
      // Weak against
      types["ground"] *= 2;
      types["psychic"] *= 2;

      // Resistant to
      types["grass"] /= 2;
      types["fighting"] /= 2;
      types["poison"] /= 2;
      types["bug"] /= 2;
      types["fairy"] /= 2;
      break;

    case "psychic":
      // Weak against
      types["bug"] *= 2;
      types["ghost"] *= 2;
      types["dark"] *= 2;

      // Resistant to
      types["fighting"] /= 2;
      types["psychic"] /= 2;
      break;

    case "rock":
      // Weak against
      types["water"] *= 2;
      types["grass"] *= 2;
      types["fighting"] *= 2;
      types["ground"] *= 2;
      types["steel"] *= 2;

      // Resistant to
      types["normal"] /= 2;
      types["fire"] /= 2;
      types["poison"] /= 2;
      types["flying"] /= 2;
      break;

    case "steel":
      // Weak against
      types["fire"] *= 2;
      types["fighting"] *= 2;
      types["ground"] *= 2;

      // Resistant to
      types["normal"] /= 2;
      types["grass"] /= 2;
      types["ice"] /= 2;
      types["flying"] /= 2;
      types["psychic"] /= 2;
      types["bug"] /= 2;
      types["rock"] /= 2;
      types["dragon"] /= 2;
      types["steel"] /= 2;
      types["fairy"] /= 2;
      types["poison"] = 0;
      break;

    case "water":
      // Weak against
      types["electric"] *= 2;
      types["grass"] *= 2;

      // Resistant to
      types["fire"] /= 2;
      types["water"] /= 2;
      types["ice"] /= 2;
      types["steel"] /= 2;
      break;
  }

  if (!type2) return types;

  switch (type2) {
    case "bug":
      // Weak against
      types["flying"] *= 2;
      types["rock"] *= 2;
      types["fire"] *= 2;

      // Resistant to
      types["fighting"] /= 2;
      types["ground"] /= 2;
      types["grass"] /= 2;
      break;

    case "dark":
      // Weak against
      types["fighting"] *= 2;
      types["bug"] *= 2;
      types["fairy"] *= 2;

      // Resistant to
      types["ghost"] /= 2;
      types["dark"] /= 2;
      types["psychic"] = 0;
      break;

    case "dragon":
      // Weak against
      types["ice"] *= 2;
      types["dragon"] *= 2;
      types["fairy"] *= 2;

      // Resistant to
      types["fire"] /= 2;
      types["water"] /= 2;
      types["electric"] /= 2;
      types["grass"] /= 2;
      break;

    case "electric":
      // Weak against
      types["ground"] *= 2;

      // Resistant to
      types["electric"] /= 2;
      types["flying"] /= 2;
      types["steel"] /= 2;
      break;

    case "fairy":
      // Weak against
      types["poison"] *= 2;
      types["steel"] *= 2;

      // Resistant to
      types["fighting"] /= 2;
      types["bug"] /= 2;
      types["dark"] /= 2;
      types["dragon"] = 0;
      break;

    case "fighting":
      // Weak against
      types["flying"] *= 2;
      types["psychic"] *= 2;
      types["fairy"] *= 2;

      // Resistant to
      types["bug"] /= 2;
      types["rock"] /= 2;
      types["dark"] /= 2;
      break;

    case "fire":
      // Weak against
      types["water"] *= 2;
      types["ground"] *= 2;
      types["rock"] *= 2;

      // Resistant to
      types["fire"] /= 2;
      types["grass"] /= 2;
      types["ice"] /= 2;
      types["steel"] /= 2;
      types["fairy"] /= 2;
      break;

    case "flying":
      // Weak against
      types["electric"] *= 2;
      types["ice"] *= 2;
      types["rock"] *= 2;

      // Resistant to
      types["grass"] /= 2;
      types["fighting"] /= 2;
      types["bug"] /= 2;
      types["ground"] = 0;
      break;

    case "ghost":
      // Weak against
      types["ghost"] *= 2;
      types["dark"] *= 2;

      // Resistant to
      types["bug"] /= 2;
      types["normal"] = 0;
      types["fighting"] = 0;
      break;

    case "grass":
      // Weak against
      types["fire"] *= 2;
      types["ice"] *= 2;
      types["poison"] *= 2;
      types["flying"] *= 2;
      types["bug"] *= 2;

      // Resistant to
      types["water"] /= 2;
      types["electric"] /= 2;
      types["grass"] /= 2;
      types["ground"] /= 2;
      break;

    case "ground":
      // Weak against
      types["water"] *= 2;
      types["grass"] *= 2;
      types["ice"] *= 2;

      // Resistant to
      types["poison"] /= 2;
      types["rock"] /= 2;
      types["electric"] = 0;
      break;

    case "ice":
      // Weak against
      types["fire"] *= 2;
      types["fighting"] *= 2;
      types["rock"] *= 2;
      types["steel"] *= 2;

      // Resistant to
      types["ice"] /= 2;
      break;

    case "normal":
      // Weak against
      types["fighting"] *= 2;

      // Resistant to
      types["ghost"] = 0;
      break;

    case "poison":
      // Weak against
      types["ground"] *= 2;
      types["psychic"] *= 2;

      // Resistant to
      types["grass"] /= 2;
      types["fighting"] /= 2;
      types["poison"] /= 2;
      types["bug"] /= 2;
      types["fairy"] /= 2;
      break;

    case "psychic":
      // Weak against
      types["bug"] *= 2;
      types["ghost"] *= 2;
      types["dark"] *= 2;

      // Resistant to
      types["fighting"] /= 2;
      types["psychic"] /= 2;
      break;

    case "rock":
      // Weak against
      types["water"] *= 2;
      types["grass"] *= 2;
      types["fighting"] *= 2;
      types["ground"] *= 2;
      types["steel"] *= 2;

      // Resistant to
      types["normal"] /= 2;
      types["fire"] /= 2;
      types["poison"] /= 2;
      types["flying"] /= 2;
      break;

    case "steel":
      // Weak against
      types["fire"] *= 2;
      types["fighting"] *= 2;
      types["ground"] *= 2;

      // Resistant to
      types["normal"] /= 2;
      types["grass"] /= 2;
      types["ice"] /= 2;
      types["flying"] /= 2;
      types["psychic"] /= 2;
      types["bug"] /= 2;
      types["rock"] /= 2;
      types["dragon"] /= 2;
      types["steel"] /= 2;
      types["fairy"] /= 2;
      types["poison"] = 0;
      break;

    case "water":
      // Weak against
      types["electric"] *= 2;
      types["grass"] *= 2;

      // Resistant to
      types["fire"] /= 2;
      types["water"] /= 2;
      types["ice"] /= 2;
      types["steel"] /= 2;
      break;
  }

  return types;
}
