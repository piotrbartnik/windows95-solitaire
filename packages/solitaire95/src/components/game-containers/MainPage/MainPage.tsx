import React, { useState, createContext, useRef, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { connect } from "react-redux";
import {
  toggleWindow,
  stopGame,
  countScore,
  finishGame,
} from "../../../store/actions/";
import {
  WindowsState,
  Points,
  FoundationInitialState,
  GameState,
} from "../../../store/reducers/";
import { TopBar, BottomBar, WaterfallCanvas } from "../../ui-components";
import {
  DeckSelect,
  AboutSolitaire,
  Options,
  DealAgain,
} from "../../smart-components";
import { GameContainer } from "../";
import { AppToolbar } from "../AppToolbar/AppToolbar";
import styles from "./MainPage.module.scss";

export const CardBackContext = createContext({
  cardBackImage: "acorns",
  setCardBackImage: (cardBackName: string) => cardBackName,
  playSounds: true,
});

type MainPageDispatchTypes = {
  toggleDealWindow: (state: boolean, window: string) => void;
  stopGame: () => void;
  addPointsOnEnd: (pointsToAdd: number) => void;
  setGameFinished: (gameState: boolean) => void;
};

type MainPageStateTypes = {
  isWindowVisible?: WindowsState;
  score?: number;
  cardsOnFoundations: FoundationInitialState;
  scoreTime: number;
  gameFinished: boolean;
};

type MainPagePropTypes = {
  playSounds?: boolean;
  aboutChildren?: JSX.Element;
};

const MainPageInternal: React.FC<
  MainPageStateTypes & MainPagePropTypes & MainPageDispatchTypes
> = (props) => {
  const {
    isWindowVisible,
    playSounds,
    score,
    aboutChildren,
    // toggleDealWindow,
    stopGame,
    addPointsOnEnd,
    setGameFinished,
    scoreTime,
    gameFinished,
  } = props;
  const [cardBackImage, setCardBackImage] = useState("acorns");
  const value: {
    cardBackImage: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setCardBackImage: any;
    playSounds: boolean;
  } = {
    cardBackImage,
    setCardBackImage,
    playSounds: playSounds || false,
  };

  const [gameVisible, setGameVisible] = useState<boolean>(false);
  const [helpVisible, setHelpVisible] = useState(false);
  const [bottomBarText, setBottomBarText] = useState("");

  const mainPageRef = useRef<HTMLDivElement>(null);

  const cardsOnfoundationRef = mainPageRef.current?.querySelectorAll(
    "[data-foundationnumber]"
  );

  useEffect(() => {
    if (cardsOnfoundationRef?.length === 52) {
      // toggleDealWindow(true, "dealAgainWindow");
      stopGame();
      setGameFinished(true);
      if (scoreTime > 30) {
        const pointsToAddOnEnd = Math.round((20000 / scoreTime) * 35);
        addPointsOnEnd(pointsToAddOnEnd);
      }
    }
  }, [
    addPointsOnEnd,
    cardsOnfoundationRef,
    scoreTime,
    setGameFinished,
    stopGame,
  ]);

  const dndProviderBackend = /Mobi|Android/i.test(navigator.userAgent)
    ? TouchBackend
    : HTML5Backend;

  return (
    <DndProvider backend={dndProviderBackend}>
      <div
        className={styles.mainPage}
        ref={mainPageRef}
        onClick={(e) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const eventTarget = e.target as any;
          const classListOfParent = eventTarget.offsetParent?.classList;
          const disabledButton = classListOfParent
            ? [...eventTarget?.offsetParent?.classList].filter((el) =>
                el.match("dropdownContainer")
              ).length
            : undefined;
          if (gameVisible && !disabledButton) {
            setGameVisible(false);
          }
          if (helpVisible && !disabledButton) {
            setHelpVisible(false);
          }
        }}
      >
        <CardBackContext.Provider value={value}>
          {isWindowVisible?.cardBackWindow && <DeckSelect />}
          {isWindowVisible?.aboutWindow && (
            <AboutSolitaire aboutChildren={aboutChildren} />
          )}
          {isWindowVisible?.optionsWindow && <Options />}
          {isWindowVisible?.dealAgainWindow && <DealAgain />}
          <TopBar
            title={"Solitaire"}
            showIcon
            shouldBeGreyedOut={Object.values(
              isWindowVisible as WindowsState
            ).some((window) => window === true)}
          />
          <AppToolbar
            gameVisible={gameVisible}
            setGameVisible={setGameVisible}
            helpVisible={helpVisible}
            setHelpVisible={setHelpVisible}
            setBottomBarText={setBottomBarText}
          />
          {gameFinished ? (
            <WaterfallCanvas canvasWidth={900} canvasHeight={900} />
          ) : (
            <GameContainer />
          )}
          <BottomBar text={bottomBarText} score={score} />
        </CardBackContext.Provider>
      </div>
    </DndProvider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleDealWindow: (windowState: boolean, windowToToggle: string) =>
      dispatch(toggleWindow(windowState, windowToToggle)),
    stopGame: () => dispatch(stopGame()),
    addPointsOnEnd: (pointsToAdd: number) => dispatch(countScore(pointsToAdd)),
    setGameFinished: (gameState: boolean) => dispatch(finishGame(gameState)),
  };
};

const mapStateToProps = (state: {
  toggleWindows: WindowsState;
  countScore: Points;
  cardsOnFoundation: FoundationInitialState;
  timeCounter: { scoreTime: number };
  gameState: GameState;
}) => {
  return {
    isWindowVisible: state.toggleWindows,
    score: state.countScore.points,
    cardsOnFoundations: state.cardsOnFoundation,
    scoreTime: state.timeCounter.scoreTime,
    gameFinished: state.gameState.gameFinished,
  };
};

export const MainPage = connect<
  MainPageStateTypes,
  MainPageDispatchTypes,
  MainPagePropTypes
>(
  mapStateToProps,
  mapDispatchToProps
)(MainPageInternal);
