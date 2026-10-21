import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme, font } from "../theme";
import { Chrome } from "../components/Chrome";
import { Backdrop } from "../components/Backdrop";
import { Tag } from "../components/Tag";

export const Boundary: React.FC = () => {
  const frame = useCurrentFrame();
  const line = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const block = interpolate(frame, [24, 46], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <Backdrop
      image="assets/road-rear.jpg"
      tint={0.94}
      blur={1.4}
      focus="50% 48%"
    >
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(8,9,10,0.76) 0%, rgba(8,9,10,0.08) 37%, rgba(8,9,10,0.72) 68%, rgba(8,9,10,0.98) 100%), linear-gradient(90deg, rgba(8,9,10,0.68), transparent 68%)",
        }}
      />
      <Chrome
        label="事实边界 / 监管"
        accent={theme.amber}
        source="CBS News 引述 Tesla 官网与 FAA / NHTSA"
      />
      <div
        style={{
          position: "absolute",
          top: 285,
          left: 78,
          right: 78,
          color: theme.paper,
          fontFamily: font.sans,
        }}
      >
        <Tag color={theme.amber}>演示 ≠ 独立测试</Tag>
        <div
          style={{
            marginTop: 25,
            fontSize: 76,
            fontWeight: 900,
            lineHeight: 1.16,
            letterSpacing: -2.8,
          }}
        >
          能飞，
          <br />
          不等于能上路。
          <br />
          <span style={{ color: theme.amber }}>也不等于能随便飞。</span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 78,
          right: 78,
          bottom: 258,
          opacity: block,
          transform: `translateY(${(1 - block) * 20}px)`,
          fontFamily: font.sans,
          color: theme.paper,
        }}
      >
        <div
          style={{
            height: 2,
            width: `${line * 100}%`,
            backgroundColor: theme.amber,
            marginBottom: 24,
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            fontSize: 20,
            lineHeight: 1.5,
          }}
        >
          <div>
            <span style={{ color: theme.amber, fontWeight: 800 }}>
              公共道路
            </span>
            <br />
            Rocket 飞行版未获批准
          </div>
          <div>
            <span style={{ color: theme.amber, fontWeight: 800 }}>
              FAA 定义
            </span>
            <br />
            它不被视为“飞机”
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 78,
          right: 78,
          bottom: 208,
          fontFamily: font.mono,
          color: theme.amber,
          fontSize: 15,
          letterSpacing: 1.4,
          opacity: 0.6,
        }}
      >
        REGULATORY STATUS AS OF 2026-10-16
      </div>
    </Backdrop>
  );
};
