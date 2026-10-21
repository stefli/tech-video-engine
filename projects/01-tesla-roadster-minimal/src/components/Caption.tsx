import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, font } from "../theme";

export const Caption: React.FC<{
  text: string;
  start: number;
  end: number;
  align?: "left" | "center";
}> = ({ text, start, end, align = "left" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame: frame - start,
    fps,
    config: { damping: 22, stiffness: 150 },
  });
  const exit = interpolate(frame, [end - 10, end], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (frame < start || frame > end) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 84,
        right: 84,
        bottom: 164,
        color: theme.paper,
        fontFamily: font.sans,
        fontSize: 32,
        lineHeight: 1.38,
        fontWeight: 750,
        letterSpacing: 0.1,
        textAlign: align,
        textShadow: "0 3px 22px rgba(0,0,0,1)",
        opacity: enter * exit,
        transform: `translateY(${(1 - enter) * 14}px)`,
        whiteSpace: "pre-line",
        maxHeight: 96,
        overflow: "hidden",
      }}
    >
      {text}
    </div>
  );
};
