import React, { useEffect, useRef, useState } from "react";

interface EnemyProps {
  cellSize: number;
  areaWidth?: number;
  areaHeight?: number;
  center?: { x: number; y: number };
  speed: number;
}

export const Enemy = ({
  cellSize,
  areaWidth = window.innerWidth,
  center = {x: 100, y:100},
  speed,
}: EnemyProps) => {
  const [enemyPos, setEnemyPos] = useState({ x: center.x, y: center.y });
  const [moveDirection, setMoveDirection] = useState("right");
  const enemyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // calculate the new position based on the current direction of movement
      const newPos = { x: enemyPos.x, y: enemyPos.y };
      if (moveDirection === "left") {
        newPos.x = Math.max(0, newPos.x - speed);
        if (newPos.x === 0) {
          setMoveDirection("right");
        }
      } else {
        newPos.x = Math.min(areaWidth, newPos.x + speed);
        if (newPos.x === areaWidth) {
          setMoveDirection("left");
        }
      }
  
      // update the position
      setEnemyPos(newPos);
    }, 50); // change interval to whatever smoothness you desire
  
    return () => clearInterval(interval);
  }, [enemyPos, moveDirection]);
  

  return (
    <div
      ref={enemyRef}
      style={{
        transition: "left 0.5s ease-out, top 0.5s ease-out",
        position: "absolute",
        left: `${enemyPos.x}px`,
        top: `${enemyPos.y}px`,
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        backgroundColor: "blue",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: `${cellSize}px`,
        fontWeight: "bold",
        color: "white",
        borderRadius: "50%",
      }}
    >
      E
    </div>
  );
};
