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
import { Tag } from "../components/Tag";

export const Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const slide = interpolate(frame, [0, 55], [0, -95], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, 252], [1.13, 1.035]);
  const callout = interpolate(frame, [20, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ backgroundColor: theme.ink }}>
      <Img
        src={staticFile("assets/hero-event.jpg")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "50% 52%",
          transform: `scale(${scale}) translateX(${slide}px)`,
          filter: "contrast(1.08) saturate(0.76)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(6,7,8,0.68) 0%, rgba(6,7,8,0.04) 38%, rgba(6,7,8,0.68) 67%, rgba(6,7,8,0.98) 100%), linear-gradient(90deg, rgba(6,7,8,0.54), transparent 60%)",
        }}
      />
      <Chrome
        label="2026.10.15 · WACO, TEXAS"
        source="官方演示素材 / Tesla，经 TechCrunch 转载"
      />
      <div
        style={{
          position: "absolute",
          top: 305,
          left: 78,
          right: 78,
          color: theme.paper,
          fontFamily: font.sans,
        }}
      >
        <Tag solid>发布事件 · 10 月 15 日</Tag>
        <div
          style={{
            fontSize: 73,
            lineHeight: 1.14,
            fontWeight: 900,
            letterSpacing: -2.4,
            marginTop: 26,
            textShadow: "0 3px 30px rgba(0,0,0,0.7)",
          }}
        >
          新 Roadster，
          <br />
          当众离地。
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 78,
          right: 78,
          bottom: 292,
          opacity: callout,
          fontFamily: font.sans,
          color: theme.paper,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 22,
            flexWrap: "wrap",
          }}
        >
          <Tag color={theme.amber}>官方演示</Tag>
          <Tag color={theme.paper}>10 个冷气推进器</Tag>
        </div>
        <div style={{ fontSize: 29, lineHeight: 1.55, opacity: 0.86 }}>
          越过障碍，在空中翻转，
          <br />
          再落回地面。
        </div>
      </div>
    </AbsoluteFill>
  );
};
