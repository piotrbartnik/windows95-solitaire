import React, { useRef, useEffect } from "react";
import king from "../../../static/cardsFronts/clubs/kingOfClubs-min.png";

type WaterfallCanvasPropTypes = {
  canvasWidth: number;
  canvasHeight: number;
};

export const WaterfallCanvas: React.FC<WaterfallCanvasPropTypes> = (props) => {
  const { canvasWidth, canvasHeight } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const canvas = canvasRef.current as any;
    if (canvas) {
      const context = canvas.getContext("2d");
      //Our first draw
      context.fillStyle = "#20ac55";
      // context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      // const image = new Image(60, 45);
      // image.src = king;
      // context.drawImage(image, 40, 50);
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(19, 12);
      context.lineTo(19, 187);
      // context.arcTo(19, 24, 12, 12, 7);
      context.lineTo(149, 187);

      context.lineTo(149, 12);
      context.closePath();
      context.stroke();
    }
  }, []);
  return (
    <canvas
      ref={canvasRef}
      id="can"
      width={canvasWidth}
      height={canvasHeight}
    />
  );
};
