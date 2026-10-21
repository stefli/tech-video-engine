import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme, font } from "../theme";
import { Backdrop } from "../components/Backdrop";
import { Chrome } from "../components/Chrome";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - 1,
    fps,
    config: { damping: 20, stiffness: 110 },
  });
  const glow = interpolate(frame, [0, 24, 108], [0, 1, 0.72], {
    extrapolateRight: "clamp",
  });
  return (
    <Backdrop image="assets/atmosphere.jpg" tint={0.94} blur={7}>
      <Chrome minimal section="TECH QUICKCAST" label="完" />
      <div
        style={{
          position: "absolute",
          left: 78,
          right: 78,
          top: 540,
          fontFamily: font.sans,
          color: theme.paper,
          transform: `translateY(${(1 - s) * 34}px)`,
          opacity: s,
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: 2.4,
            color: theme.accent,
            fontWeight: 900,
            marginBottom: 24,
          }}
        >
          科技快播
        </div>
        <div
          style={{
            fontSize: 94,
            fontWeight: 900,
            letterSpacing: -4,
            lineHeight: 1.08,
          }}
        >
          看见炫技，
          <br />
          <span style={{ color: theme.accent }}>更要追问代价。</span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 78,
          right: 78,
          bottom: 230,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          fontFamily: font.mono,
          color: theme.paper,
          fontSize: 18,
          letterSpacing: 1.0,
          fontWeight: 650,
          opacity: glow,
          textShadow: "0 2px 10px rgba(0,0,0,0.9)",
        }}
      >
        <div>
          资料来源
          <br />
          TECHCRUNCH / CBS NEWS
        </div>
        <div style={{ textAlign: "right", color: theme.accent }}>
          特斯拉 ROADSTER
          <br />
          2026.10.15 发布
        </div>
      </div>
    </Backdrop>
  );
};
