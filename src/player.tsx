import React, { useEffect, useRef, useState } from 'react'

interface PlayerProps {
    cellSize: number;
}
  
export const PlayerCharacter = ({ cellSize }: PlayerProps) => {
    const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
    const [rotationAngle, setRotationAngle] = useState(0);
    const playerRef = useRef<HTMLDivElement>(null);
  
    const handleKeyDown = (event: KeyboardEvent) => {
        let dx = 0;
        let dy = 0;

        switch (event.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
            dy = -1;
            break;
            case 'ArrowDown':
            case 's':
            case 'S':
            dy = 1;
            break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
            dx = -1;
            break;
            case 'ArrowRight':
            case 'd':
            case 'D':
            dx = 1;
            break;
            default:
            break;
    }
  
  
    const maxY = Math.floor(window.innerHeight / cellSize) - 1;
    const maxX = Math.floor(window.innerWidth / cellSize) - 1;
    setPlayerPos((prevPos) => ({
        x: Math.max(0, Math.min(prevPos.x + dx, maxX)),
        y: Math.max(0, Math.min(prevPos.y + dy, maxY)),
    }));
    };
    const handleMouseMove = (event: MouseEvent) => {
        if (playerRef.current) {
            const playerBox = playerRef.current;
            const rect = playerBox.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            let angle = Math.atan2(event.clientY - centerY, event.clientX - centerX) + Math.PI / 2;
            
            // Make sure angle is between 0 and 2π radians
            if (angle < 0) {
                angle += 2 * Math.PI;
            }
            
            // Convert angle to a value between 0 and 1 representing rotation progress
            const progress = angle / (2 * Math.PI);
            if(progress == 1){
                console.log("1")
            }
            setRotationAngle(progress);
            console.log(progress);
        }
    };
    
    
    useEffect(() => {
      // Set the initial player position to the center of the screen
        const maxX = Math.floor(window.innerWidth / cellSize) - 1;
        const maxY = Math.floor(window.innerHeight / cellSize) - 1;
        setPlayerPos({
            x: Math.floor(maxX / 2),
            y: Math.floor(maxY / 2),
        });

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousemove", handleMouseMove);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div>
            mouse rotation: {rotationAngle}
            <div
                ref={playerRef}
                style={{
                transition: "left 0.5s ease-out, top 0.5s ease-out, transform 0.5s ease-out",
                position: "absolute",
                left: `${playerPos.x * cellSize}px`,
                top: `${playerPos.y * cellSize}px`,
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                backgroundColor: "red",
                transform: `rotate(0turn)`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: `${cellSize}px`,
                fontWeight: 'bold',
                color: 'white'
                }}
            >
                a
            </div>
        </div>
);
};
  