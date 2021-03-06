import { cardConfigType } from "../configs/cardTypes";
import { FoundationInitialState } from "../store/reducers/";

export const moveToFoundation = (
  event: React.SyntheticEvent<HTMLDivElement>,
  cardsOnFoundations: FoundationInitialState,
  addToFoundationCallback: (
    card: cardConfigType,
    foundationNumber: string,
    foundationSuite?: string
  ) => void,
  removeFromCallback: (card: cardConfigType[] | string | undefined) => void,
  pileOrStock: boolean,
  addPoints: (points: number) => void,
  cardsFromStock?: cardConfigType[],
  startGame?: () => void,
  gameStarted?: boolean
): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { dataset } = event.target as any;
  const { cardname, suite, color, pilenumber, order } = dataset;
  const cardConfig: cardConfigType = [cardname, suite, true, color, order];

  if (cardname?.match("ace")) {
    const foundationToPopulate: string[] = [];
    Object.keys(cardsOnFoundations).forEach((foundation) => {
      if (!cardsOnFoundations[foundation].cards.length) {
        foundationToPopulate.push(foundation);
      }
    });

    if (!cardsOnFoundations[foundationToPopulate[0]].cards.length) {
      addToFoundationCallback(cardConfig, foundationToPopulate[0], suite);
      addPoints(10);
      !gameStarted && startGame && startGame();
      pileOrStock
        ? removeFromCallback(pilenumber)
        : removeFromCallback(
            (cardsFromStock as cardConfigType[]).filter(
              (card) => `${card[0]}_${card[1]}` !== `${cardname}_${suite}`
            )
          );
    }
  }

  if (!cardname?.match("ace")) {
    Object.keys(cardsOnFoundations).forEach((foundation) => {
      if (cardsOnFoundations[foundation].foundationSuite === suite) {
        const cardsOnFoundation = cardsOnFoundations[foundation].cards;
        if (
          parseInt(
            cardsOnFoundation[cardsOnFoundation.length - 1][4] as string
          ) ===
          order - 1
        ) {
          addToFoundationCallback(cardConfig, foundation);
          addPoints(10);
          !gameStarted && startGame && startGame();
          pileOrStock
            ? removeFromCallback(pilenumber)
            : removeFromCallback(
                (cardsFromStock as cardConfigType[]).filter(
                  (card) => `${card[0]}_${card[1]}` !== `${cardname}_${suite}`
                )
              );
        }
      }
    });
  }
};
