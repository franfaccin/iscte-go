import { POKEBALL_TYPE } from "../config/config";

export const getPokeball = () => {
  const x = Math.random();
  if (x <= 0.005)
    return POKEBALL_TYPE.MASTER;
  if (x > 0.005 && x <= 0.01)
    return POKEBALL_TYPE.ULTRA;
  if (x > 0.01 && x <= .25)
    return POKEBALL_TYPE.GREAT;

  return POKEBALL_TYPE.POKE;
}
