import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/cardActions";
import { useDrop } from "react-dnd";
import { itemTypes } from "../../configs/dragndropConfig";
import { foundationConfig } from "../../configs/foundationConfig";
import { cardConfigType } from "../../configs/cardTypes";
import { Card } from "..";
import styles from "./Foundation.module.scss";

type propTypes = {
  cardsOnStock: cardConfigType[];
  addCardToFoundation?: any;
  removeCardFromPile?: any;
  removeCardMovedToFoundation?: any;
  cardsFromStock: cardConfigType[];
  cardsOnFoundations: any;
};

const Foundation: React.FC<propTypes> = (props) => {
  const {
    cardsOnStock,
    addCardToFoundation,
    removeCardFromPile,
    removeCardMovedToFoundation,
    cardsFromStock,
    cardsOnFoundations,
  } = props;

  const isFirstFoundation = (card: any, hoveredFoundation: any) => {
    const foundationObject =
      cardsOnFoundations[
        Object.keys(cardsOnFoundations)[
          hoveredFoundation.targetId.replace(/\D/, "") - 24
        ]
      ];
    if (card.cardFront.match(/ace/)) {
      return foundationObject.foundationSuite === undefined;
    } else {
      return (
        card.cardSuite === foundationObject.foundationSuite &&
        foundationConfig[card.cardSuite][0] === card.cardFront
      );
    }
  };

  const dropCardOnFoundation = (dragObject: any, item: any) => {
    const {
      cardFront,
      cardSuite,
      cardColor,
      cardOrder,
      pileNumber,
    } = dragObject;

    const cardConfig: cardConfigType = [
      cardFront,
      cardSuite,
      true,
      cardColor,
      cardOrder,
    ];

    const { targetId } = item;
    const foundations = [
      "cardsOnFirstFoundation",
      "cardsOnSecondFoundation",
      "cardsOnThirdFoundation",
      "cardsOnFourthFoundation",
    ];
    addCardToFoundation(
      cardConfig,
      foundations[targetId.replace(/\D/, "") - 24],
      cardSuite
    );
    if (typeof pileNumber === "number") {
      removeCardFromPile(pileNumber);
      foundationConfig[cardSuite].shift();
    } else {
      removeCardMovedToFoundation(
        cardsFromStock.filter((card) => card[0] !== cardFront)
      );
      foundationConfig[cardSuite].shift();
    }
  };

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: itemTypes.CARD,
    drop: (monitor, item) => {
      dropCardOnFoundation(monitor, item);
    },
    canDrop: isFirstFoundation,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <div
      className={styles.foundation}
      ref={drop}
      style={
        isOver && canDrop
          ? { outline: "5px solid blue" }
          : isOver
          ? { outline: "5px solid red" }
          : undefined
      }
    >
      {cardsOnStock?.length
        ? cardsOnStock.map((card, index) => (
            <Card
              cardFront={card[0]}
              cardSuite={card[1]}
              cardColor={card[3]}
              cardOrder={card[4]}
              back={"acorns"}
              isTurnedBack={false}
              key={index}
            />
          ))
        : null}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    cardsFromStock: state.cardDistribution.cardsFromStock,
    cardsOnFoundations: state.cardsOnFoundation,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addCardToFoundation: (
      card: cardConfigType,
      foundationNumber: string,
      foundationSuite: string
    ) =>
      dispatch(
        actions.addCardToFoundation(card, foundationNumber, foundationSuite)
      ),
    removeCardFromPile: (pileNumber: string) =>
      dispatch(actions.removeCardFromPile(pileNumber)),
    removeCardMovedToFoundation: (payload: string[]) => {
      dispatch(actions.removeCardMovedToFoundation(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Foundation);
