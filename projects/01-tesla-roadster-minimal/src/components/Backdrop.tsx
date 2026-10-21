import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { theme } from "../theme";

export const Backdrop: React.FC<{
  image?: string;
  tint?: number;
  blur?: number;
  focus?: string;
  children?: React.ReactNode;
}> = ({
  image = "assets/atmosphere.jpg",
  tint = 0.74,
  blur = 0,
  focus = "50% 50%",
  children,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: theme.ink, overflow: "hidden" }}>
      <Img
        src={staticFile(image)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: focus,
          filter: `blur(${blur}px) saturate(0.6)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(11,13,14,${tint * 0.6}) 0%, rgba(11,13,14,${tint * 0.32}) 42%, rgba(11,13,14,${tint}) 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 75% 24%, rgba(255,91,53,0.13), transparent 40%), linear-gradient(115deg, rgba(0,0,0,0.38), transparent 55%)",
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.055,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0, transparent 4px, rgba(255,255,255,0.04) 5px)",
          mixBlendMode: "soft-light",
        }}
      />
      {children}
    </AbsoluteFill>
  );
};
