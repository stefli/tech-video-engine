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

export const ProductStart: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 228], [1.035, 1.12]);
  const line = interpolate(frame, [8, 34], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ backgroundColor: theme.ink }}>
      <Img
        src={staticFile("assets/dawn-side.jpg")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "54% 54%",
          transform: `scale(${zoom})`,
          filter: "saturate(0.8) contrast(1.06)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(6,7,8,0.7), rgba(6,7,8,0.05) 35%, rgba(6,7,8,0.62) 64%, rgba(6,7,8,0.98) 100%)",
        }}
      />
      <Chrome
        label="从演示到产品"
        accent={theme.accent}
        source="官方产品素材 / Tesla，经 TechCrunch 转载"
      />
      <div
        style={{
          position: "absolute",
          left: 78,
          right: 78,
          top: 330,
          fontFamily: font.sans,
          color: theme.paper,
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: theme.accent,
            fontWeight: 800,
            letterSpacing: 2,
          }}
        >
          产品化的起点
        </div>
        <div
          style={{
            width: `${line * 100}%`,
            height: 3,
            backgroundColor: theme.accent,
            marginTop: 18,
            marginBottom: 30,
          }}
        />
        <div
          style={{
            fontSize: 69,
            fontWeight: 900,
            lineHeight: 1.16,
            letterSpacing: -2.4,
          }}
        >
          飞起来，
          <br />
          只是发布会的高光。
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 78,
          right: 78,
          bottom: 285,
          borderTop: `1px solid ${theme.line}`,
          paddingTop: 24,
          fontFamily: font.sans,
          color: theme.paper,
          fontSize: 30,
          lineHeight: 1.55,
        }}
      >
        安全、合规地重复，
        <br />
        <span style={{ color: theme.accent }}>才是产品化的开始。</span>
      </div>
    </AbsoluteFill>
  );
};
