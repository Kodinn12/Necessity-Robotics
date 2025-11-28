import React, { useRef, useEffect, useState } from "react";
import "./FloatingRobot.css";

const ROBOT_WIDTH = 120;
const ROBOT_HEIGHT = 120;
const SPEED_X = -0.12; // px per ms (leftward)
const SPEED_Y = 0.04;  // px per ms (downward)
const REPULSION_RADIUS = 180;
const REPULSION_STRENGTH = 0.25;

export default function FloatingRobot() {
  const [pos, setPos] = useState({
    x: window.innerWidth * 0.8,
    y: window.innerHeight * 0.6,
  });
  const [vel, setVel] = useState({ x: SPEED_X, y: SPEED_Y });
  const requestRef = useRef();
  const mouse = useRef({ x: null, y: null });

  // Mouse tracking
  useEffect(() => {
    const handleMouse = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Animation loop
  useEffect(() => {
    let last = performance.now();
    function animate(now) {
      const dt = now - last;
      last = now;
      let { x, y } = pos;
      let { x: vx, y: vy } = vel;

      // Cursor repulsion
      if (mouse.current.x !== null && mouse.current.y !== null) {
        const dx = x + ROBOT_WIDTH / 2 - mouse.current.x;
        const dy = y + ROBOT_HEIGHT / 2 - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPULSION_RADIUS) {
          vx += (dx / dist) * REPULSION_STRENGTH;
          vy += (dy / dist) * REPULSION_STRENGTH;
        }
      }

      // Move robot
      x += vx * dt;
      y += vy * dt;

      // Loop to right if off left edge
      if (x < -ROBOT_WIDTH) {
        x = window.innerWidth;
        y = Math.random() * (window.innerHeight - ROBOT_HEIGHT);
      }

      setPos({ x, y });
      setVel({ x: SPEED_X, y: SPEED_Y }); // Reset to base drift each frame
      requestRef.current = requestAnimationFrame(animate);
    }
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
    // eslint-disable-next-line
  }, [pos, vel]);

  return (
    <img
      src="/robot.png"
      alt="Floating Robot"
      className="floating-robot"
      style={{
        left: pos.x,
        top: pos.y,
        width: ROBOT_WIDTH,
        height: ROBOT_HEIGHT,
      }}
      draggable={false}
    />
  );
}
