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

export const Specs: React.FC = () => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [12, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const counter = interpolate(frame, [16, 36], [0, 600], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ backgroundColor: theme.ink }}>
      <Img
        src={staticFile("assets/rear-detail.jpg")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "50% 44%",
          opacity: 0.72,
          transform: `scale(${1.08 + frame * 0.0005})`,
          filter: "grayscale(0.08) contrast(1.12)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(7,8,9,0.84), rgba(7,8,9,0.16) 30%, rgba(7,8,9,0.92) 63%, rgba(7,8,9,0.99) 100%)",
        }}
      />
      <Chrome
        label="厂商数据 / 非独立实测"
        accent={theme.amber}
        source="Tesla 发布信息，经 TechCrunch 报道"
      />
      <div
        style={{
          position: "absolute",
          top: 270,
          left: 78,
          right: 78,
          color: theme.paper,
          fontFamily: font.sans,
        }}
      >
        <Tag color={theme.amber}>厂商公布 · 非独立实测</Tag>
        <div
          style={{
            fontSize: 61,
            fontWeight: 900,
            letterSpacing: -2.1,
            lineHeight: 1.17,
            marginTop: 21,
          }}
        >
          数字很猛，
          <br />
          但先看是谁说的。
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 610,
          left: 78,
          right: 78,
          opacity: reveal,
          fontFamily: font.sans,
        }}
      >
        <div
          style={{
            borderTop: `1px solid ${theme.line}`,
            padding: "18px 0 22px",
            color: theme.paper,
          }}
        >
          <div style={{ fontSize: 19, color: theme.amber, fontWeight: 800 }}>
            ROCKET / 飞行版
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginTop: 13,
            }}
          >
            <span style={{ fontSize: 27 }}>单座 · 10 个冷气推进器</span>
            <span style={{ fontSize: 19, opacity: 0.5 }}>邀请制</span>
          </div>
        </div>
        <div
          style={{
            borderTop: `1px solid ${theme.line}`,
            padding: "18px 0 22px",
            color: theme.paper,
          }}
        >
          <div style={{ fontSize: 19, color: theme.paper, fontWeight: 800 }}>
            THRUST / 赛道版
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginTop: 13,
            }}
          >
            <span style={{ fontSize: 27 }}>双座 · 后置冷气推进器</span>
            <span style={{ fontSize: 19, opacity: 0.5 }}>目标 &lt; 1 s</span>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 78,
          right: 78,
          bottom: 260,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 34,
          fontFamily: font.sans,
          color: theme.paper,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 82,
              fontWeight: 900,
              color: theme.accent,
              lineHeight: 0.92,
              letterSpacing: -4,
            }}
          >
            {Math.round(counter)}
          </div>
          <div style={{ fontSize: 21, marginTop: 11, lineHeight: 1.4 }}>
            L 压缩空气
            <br />
            <span style={{ opacity: 0.5 }}>Rocket 厂商口径</span>
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: 57,
              fontWeight: 900,
              color: theme.amber,
              lineHeight: 0.96,
              letterSpacing: -2.4,
            }}
          >
            &lt;1s
          </div>
          <div style={{ fontSize: 21, marginTop: 11, lineHeight: 1.4 }}>
            Thrust 目标 0–60 mph
            <br />
            <span style={{ opacity: 0.5 }}>厂商宣称，非实测</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
