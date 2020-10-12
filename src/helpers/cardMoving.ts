export const moveToFoundation = (
  event: any,
  cardsOnFoundations: any,
  foundationConfig: any,
  addToFoundationCallback: any,
  removeFromCallback: any,
  pileOrStock: boolean,
  cardsFromStock?: string[]
) => {
  const { cardname, suite, color, pilenumber, order } = event.target.dataset;
  const cardConfig = [cardname, suite, true, color, order];
  if (cardname.match("ace")) {
    let foundationToPopulate: string[] = [];
    Object.keys(cardsOnFoundations).forEach((foundation) => {
      if (!cardsOnFoundations[foundation].cards.length) {
        foundationToPopulate.push(foundation);
      }
    });
    if (!cardsOnFoundations[foundationToPopulate[0]].cards.length) {
      addToFoundationCallback(cardConfig, foundationToPopulate[0], suite);
      pileOrStock
        ? removeFromCallback(pilenumber)
        : removeFromCallback(
            (cardsFromStock as string[]).filter((card) => card[0] !== cardname)
          );
      foundationConfig[suite].shift();
    }
  }

  if (!cardname.match("ace")) {
    Object.keys(cardsOnFoundations).forEach((foundation) => {
      if (
        cardsOnFoundations[foundation].foundationSuite === suite &&
        foundationConfig[cardsOnFoundations[foundation].foundationSuite][0] ===
          cardname
      ) {
        foundationConfig[suite].shift();
        pileOrStock
          ? removeFromCallback(pilenumber)
          : removeFromCallback(
              (cardsFromStock as string[]).filter(
                (card) => card[0] !== cardname
              )
            );
        addToFoundationCallback(cardConfig, foundation);
      }
    });
  }
};