import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

export const Tension: React.FC<{ intensity?: number; color?: string }> = ({
  intensity = 0.1,
  color = "#FF5B35",
}) => {
  const frame = useCurrentFrame();
  const y = (frame * 0.7) % 220;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill
        style={{
          opacity: intensity,
          background: `linear-gradient(180deg, transparent ${y}px, ${color} ${y + 1}px, transparent ${y + 2}px)`,
          mixBlendMode: "screen",
        }}
      />
    </AbsoluteFill>
  );
};
