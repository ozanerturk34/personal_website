import { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
}

interface Star extends Point {
  size: number;
  color: string;
}

interface StartAndPoint {
  startPoint?: Point;
  endPoint?: Point;
}

const BASE_CANVAS_CLASSNAMES = "absolute top-0 left-0 w-full h-full";

const CANVAS_HEIGHT = 1000;
const CANVAS_WIDTH = 1000;

const NUMBER_OF_STARS = 1000;
const STAR_SIZE_BASE = 1;

const CANVAS_CLEAR_TIME = 1000;
const COMET_FREQUENCY_MEDIAN = 3000;
const COMET_FREQUENCY_BASE = 2000;
const COMET_SPEED = 30;
const COMET_STARDUST_WIDTH = 0.5;
const COMET_STARDUST_TO_RADIUS_RATIO = 2;
const COMET_RADIUS = COMET_STARDUST_WIDTH * COMET_STARDUST_TO_RADIUS_RATIO;

const getRandomXCoordinate = (): number => Math.random() * CANVAS_HEIGHT;
const getRandomYCoordinate = (): number => Math.random() * CANVAS_WIDTH;

const getRandomStarColor = (): string => {
  return "white";
};

const getRandomStarSize = (): number => Math.random() * STAR_SIZE_BASE;

const getRandomStar = (): Star => ({
  x: getRandomXCoordinate(),
  y: getRandomYCoordinate(),
  size: getRandomStarSize(),
  color: getRandomStarColor(),
});

const getVector = (point1: Point, point2: Point): Point => ({
  x: point2.x - point1.x,
  y: point2.y - point1.y,
});

const getDistance = (point1: Point, point2: Point): number => {
  const x = point1.x - point2.x;
  const y = point1.y - point2.y;

  return Math.sqrt(x * x + y * y);
};

const getNextCometTime = () =>
  COMET_FREQUENCY_BASE + Math.random() * COMET_FREQUENCY_MEDIAN;

const Stars = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = ref.current?.getContext("2d");
    if (!ctx) {
      return;
    }
    const drawStars = () => {
      for (let i = 0; i < NUMBER_OF_STARS; i++) {
        const star = getRandomStar();
        ctx.fillStyle = star.color;
        ctx.fillRect(star.x, star.y, star.size, star.size);
        ctx.fillRect(star.x, star.y, star.size, star.size);
      }
    };
    drawStars();
  }, []);
  return (
    <canvas
      ref={ref}
      className={`w-full h-full fixed z-0`}
      height={`${CANVAS_HEIGHT}`}
      width={`${CANVAS_WIDTH}`}
    />
  );
};
const Stardust = ({ startPoint, endPoint }: StartAndPoint) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = ref.current?.getContext("2d");
    if (!ctx) {
      return;
    }
    if (!startPoint || !endPoint) {
      const timer = setTimeout(() => {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        clearTimeout(timer);
      }, CANVAS_CLEAR_TIME);
      return;
    }
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.lineWidth = COMET_STARDUST_WIDTH;
    ctx.stroke();
    ctx.closePath();
  }, [startPoint, endPoint]);
  return (
    <canvas
      ref={ref}
      className={`${BASE_CANVAS_CLASSNAMES} z-10`}
      height={`${CANVAS_HEIGHT}`}
      width={`${CANVAS_WIDTH}`}
    />
  );
};
const Comet = ({ startPoint, endPoint }: StartAndPoint) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = ref.current?.getContext("2d");
    if (!ctx) {
      return;
    }
    if (!startPoint || !endPoint) {
      const timer = setTimeout(() => {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        clearTimeout(timer);
      }, CANVAS_CLEAR_TIME);
      return;
    }
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.beginPath();
    ctx.arc(endPoint.x, endPoint.y, COMET_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }, [startPoint, endPoint]);
  return (
    <canvas
      ref={ref}
      className={`${BASE_CANVAS_CLASSNAMES} z-20`}
      height={`${CANVAS_HEIGHT}`}
      width={`${CANVAS_WIDTH}`}
    />
  );
};
const Universe = () => {
  const [currentPoint, setCurrentPoint] = useState<Point | undefined>();
  const [nextPoint, setNextPoint] = useState<Point | undefined>();
  useEffect(() => {
    const drawComet = (
      startPoint: Point,
      endPoint: Point,
      currentPoint?: Point,
      nextPoint?: Point
    ) => {
      const vector = getVector(startPoint, endPoint);
      const distance = getDistance(startPoint, endPoint);
      // const startTime = Date.now();
      // const timeToGet = 1000;
      requestAnimationFrame(() => {
        // const now = Date.now();
        if (!currentPoint) {
          currentPoint = { ...startPoint };
        }
        const stepX = (COMET_SPEED * vector.x) / distance;
        const stepY = (COMET_SPEED * vector.y) / distance;
        nextPoint = {
          x: currentPoint.x + stepX,
          y: currentPoint.y + stepY,
        };
        setCurrentPoint(currentPoint);
        setNextPoint(nextPoint);
        const newNextPoint = {
          x: nextPoint.x + stepX,
          y: nextPoint.y + stepY,
        };
        // if (nextPoint.x > endPoint.x && nextPoint.y > endPoint.y) {
        //   return;
        // } else {
        // }
        const traveledDistance = getDistance(startPoint, currentPoint);
        if (traveledDistance > distance) {
          setCurrentPoint(undefined);
          setNextPoint(undefined);
          return;
        } else {
          drawComet(startPoint, endPoint, nextPoint, newNextPoint);
        }
      });
    };

    const startCometTimer = () => {
      const cometTimer = setTimeout(() => {
        const startPoint: Point = {
          x: getRandomXCoordinate(),
          y: getRandomYCoordinate(),
        };
        const endPoint: Point = {
          x: getRandomXCoordinate(),
          y: getRandomYCoordinate(),
        };
        if (!document.hidden) {
          drawComet(startPoint, endPoint);
        }
        clearTimeout(cometTimer);
        startCometTimer();
      }, getNextCometTime());
    };
    startCometTimer();
  }, []);
  return (
    <div className={`${BASE_CANVAS_CLASSNAMES} bg-black`}>
      <Stars />
      <Stardust startPoint={currentPoint} endPoint={nextPoint} />
      <Comet startPoint={currentPoint} endPoint={nextPoint} />
    </div>
  );
};

export default Universe;
