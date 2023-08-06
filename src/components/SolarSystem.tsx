import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

const CANVAS_HEIGHT = 1000;
const CANVAS_WIDTH = 1000;

const SUN_RADIUS = 50;
const CENTER: Point = {
  x: CANVAS_HEIGHT / 2,
  y: CANVAS_WIDTH / 2,
};

const SolarSystem = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = ref.current?.getContext("2d");
    if (!ctx) {
      return;
    }

    const drawOrbit = (y: number) => {
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.arc(CENTER.x, CENTER.y, CENTER.y - y, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
    };

    const drawPlanet = (x: number, y: number, r: number, color: string) => {
      drawOrbit(y);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    };

    const drawSun = () => {
      drawPlanet(CENTER.x, CENTER.y, SUN_RADIUS, "yellow");
    };

    drawSun();
    drawPlanet(500, 400, 20, "green");
    drawPlanet(500, 300, 15, "blue");
    drawPlanet(500, 200, 35, "red");
  }, []);
  return (
    <canvas
      ref={ref}
      className="absolute z-30"
      height={CANVAS_HEIGHT}
      width={CANVAS_WIDTH}
    />
  );
};

export default SolarSystem;
