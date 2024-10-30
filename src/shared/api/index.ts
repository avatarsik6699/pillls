import {
  positionFindAll,
  positionFindOne,
  productFindAll,
  tipFindAll,
} from "./endpoints";

export const api = {
  tip: {
    list: tipFindAll,
  },

  product: {
    list: productFindAll,
  },

  position: {
    list: positionFindAll,
    one: positionFindOne,
  },
};
