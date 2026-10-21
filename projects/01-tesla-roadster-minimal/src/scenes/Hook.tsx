import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { theme, font } from "../theme";
import { Chrome } from "../components/Chrome";

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 120], [1.09, 1.015], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [6, 28], [26, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleOpacity = interpolate(frame, [4, 19], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ backgroundColor: theme.ink }}>
      <Img
        src={staticFile("assets/hero-wide.jpg")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "54% 50%",
          transform: `scale(${scale}) translateY(${frame * 0.12}px)`,
          filter: "saturate(0.72) contrast(1.08)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(7,8,9,0.66) 0%, rgba(7,8,9,0.06) 30%, rgba(7,8,9,0.58) 66%, rgba(7,8,9,0.98) 100%), linear-gradient(90deg, rgba(7,8,9,0.7), transparent 60%)",
        }}
      />
      <Chrome minimal section="科技快播" label="官方演示 · 非独立测试" />
      <div
        style={{
          position: "absolute",
          left: 78,
          right: 78,
          top: 965,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          fontFamily: font.sans,
          color: theme.paper,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 13,
            fontSize: 18,
            letterSpacing: 2.6,
            color: theme.paper,
            opacity: 0.62,
            fontWeight: 700,
            marginBottom: 18,
          }}
        >
          <span>2026.10.15 · WACO</span>
          <span
            style={{ width: 46, height: 1, backgroundColor: theme.accent }}
          />
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 900,
            letterSpacing: -3.4,
            lineHeight: 1.13,
            textShadow: "0 4px 28px rgba(0,0,0,0.85)",
          }}
        >
          车，飞起来了。
          <br />
          <span style={{ color: theme.accent }}>最难的一步，</span>
          <br />
          却不是起飞。
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 78,
          right: 78,
          bottom: 214,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          fontFamily: font.sans,
          color: theme.paper,
          fontSize: 16,
          letterSpacing: 0.8,
          opacity: 0.58,
        }}
      >
        <span>官方发布画面 / Tesla · TechCrunch</span>
        <span style={{ color: theme.amber }}>演示 ≠ 实测</span>
      </div>
    </AbsoluteFill>
  );
};
