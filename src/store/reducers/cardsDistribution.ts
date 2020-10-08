import { createCards } from "../../configs/cardTypes";

type initialState = {
  cardsOnStock: (string | undefined | number)[][];
  cardsFromStock: (string | undefined | number)[][];
  cardsOnPiles: { [key: string]: string[] };
};

const mixCardsForGame = <T>(cards: T[]): T[][] => {
  const randomizeCardInput = cards.sort(() => Math.random() - 0.5);
  const cardsForStock = randomizeCardInput.slice(0, 24);
  const cardsForPiles = randomizeCardInput.slice(24);
  return [cardsForStock, cardsForPiles];
};

const [cardsForStock, cardsForPiles] = mixCardsForGame(createCards);

const orderPiles = <T>(cardsForPiles: T[]): { [key: string]: string[] } => {
  const cardsOnPiles = {};
  cardsForPiles.forEach((el, index) => {
    if (index < 7) {
      const triangularSequenceDividend = index * (index + 1);
      Object.assign(cardsOnPiles, {
        [index]: cardsForPiles.slice(
          triangularSequenceDividend / 2,
          triangularSequenceDividend / 2 + index + 1
        ),
      });
    }
  });
  return cardsOnPiles;
};

const initialState: initialState = {
  cardsOnStock: cardsForStock,
  cardsFromStock: [],
  cardsOnPiles: orderPiles(cardsForPiles),
};

export const cardDistribution = (state = initialState, action: any) => {
  switch (action.type) {
    case "TAKE_ONE_FROM_STOCK":
      return {
        ...state,
        cardsFromStock: [...state.cardsFromStock, action.card],
      };
    case "REVERSE_STOCK":
      return {
        ...state,
        cardsOnStock: action.reverseStock,
        cardsFromStock: [],
      };
    case "REMOVE_CARD_MOVED_TO_FOUNDATION":
      return {
        ...state,
        cardsFromStock: action.removeCardMovedToFoundation,
      };
    case "REMOVE_CARD_FROM_PILE":
      return {
        ...state,
        cardsOnPiles: {
          ...state.cardsOnPiles,
          [action.removeCardFromPile]: state.cardsOnPiles[
            action.removeCardFromPile
          ].slice(0, -1),
        },
      };
    case "ADD_CARD_TO_PILE":
      const cardAdded: any = [
        [
          ...action.cardToAdd.split("_"),
          action.isTurnedBack,
          action.cardColor,
          action.cardOrder,
        ],
      ];
      return {
        ...state,
        cardsOnPiles: {
          ...state.cardsOnPiles,
          [action.addCardToPile]: state.cardsOnPiles[
            action.addCardToPile
          ].concat(cardAdded),
        },
      };
    default:
      return state;
  }
};
