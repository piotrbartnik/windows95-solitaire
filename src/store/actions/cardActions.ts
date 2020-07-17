import * as actionTypes from "./actionTypes";

export const takeOneFromStock = (payload: string) => {
  return {
    type: actionTypes.TAKE_ONE_FROM_STOCK,
    card: payload,
  };
};

export const reverseStock = (payload: string[]) => {
  return {
    type: actionTypes.REVERSE_STOCK,
    reverseStock: payload,
  };
};

export const addCardToFirstFoundation = (
  card: string,
  foundationColor?: string
) => {
  return {
    type: actionTypes.ADD_CARD_TO_FIRST_FOUNDATION,
    addFoundationColor: foundationColor,
    addCardToFoundation: card,
  };
};
export const addCardToSecondFoundation = (
  card: string,
  foundationColor?: string
) => {
  return {
    type: actionTypes.ADD_CARD_TO_SECOND_FOUNDATION,
    addFoundationColor: foundationColor,
    addCardToFoundation: card,
  };
};
export const addCardToThirdFoundation = (
  card: string,
  foundationColor?: string
) => {
  return {
    type: actionTypes.ADD_CARD_TO_THIRD_FOUNDATION,
    addFoundationColor: foundationColor,
    addCardToFoundation: card,
  };
};
export const addCardToFourthFoundation = (
  card: string,
  foundationColor?: string
) => {
  return {
    type: actionTypes.ADD_CARD_TO_FOURTH_FOUNDATION,
    addFoundationColor: foundationColor,
    addCardToFoundation: card,
  };
};

export const removeCardMovedToFoundation = (payload: string[]) => {
  return {
    type: actionTypes.REMOVE_CARD_MOVED_TO_FOUNDATION,
    removeCardMovedToFoundation: payload,
  };
};
