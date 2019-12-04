import { POKEBALL_TYPE } from "../config/config";

export const getPokeball = () => {
  const x = Math.random();
  if (x <= 0.5)
    return POKEBALL_TYPE.POKE;
  if (x > 0.5 && x <= 0.8)
    return POKEBALL_TYPE.GREAT;
  if (x > 0.8 && x <= .95)
    return POKEBALL_TYPE.ULTRA;

  return POKEBALL_TYPE.MASTER;
}
