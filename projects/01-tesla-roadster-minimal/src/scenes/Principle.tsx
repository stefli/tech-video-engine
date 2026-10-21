import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme, font } from "../theme";
import { Chrome } from "../components/Chrome";
import { Tag } from "../components/Tag";
import { Backdrop } from "../components/Backdrop";

export const Principle: React.FC = () => {
  const frame = useCurrentFrame();
  const open = interpolate(frame, [8, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulse = interpolate(frame, [18, 32, 46, 62], [0, 1, 0.42, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <Backdrop image="assets/atmosphere.jpg" tint={0.9} blur={6}>
      <Chrome
        label="技术解释 / 冷气推进"
        accent={theme.accent}
        source="物理原理示意 · 非工程图"
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
        <Tag>它靠什么离地</Tag>
        <div
          style={{
            fontSize: 67,
            fontWeight: 900,
            lineHeight: 1.16,
            letterSpacing: -2.2,
            marginTop: 22,
          }}
        >
          不是点火，
          <br />
          是把空气
          <span style={{ color: theme.accent }}>推出去</span>。
        </div>
      </div>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(255,97,56,0.11), transparent 34%)",
          opacity: pulse,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 78,
          right: 78,
          top: 720,
          height: 570,
          borderTop: `1px solid ${theme.line}`,
          borderBottom: `1px solid ${theme.line}`,
          fontFamily: font.sans,
          color: theme.paper,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 44,
            left: 0,
            fontSize: 16,
            letterSpacing: 1.2,
            opacity: 0.44,
          }}
        >
          原理示意 / 俯视
        </div>
        <div
          style={{
            position: "absolute",
            left: 55,
            right: 55,
            top: 104,
            height: 320,
            borderRadius: "46% 54% 40% 60% / 52% 43% 57% 48%",
            border: "1px solid rgba(243,240,232,0.42)",
            background:
              "linear-gradient(145deg, rgba(243,240,232,0.14), rgba(243,240,232,0.025) 58%, rgba(255,97,56,0.08))",
            transform: `perspective(900px) rotateX(54deg) scale(${0.97 + open * 0.03})`,
            boxShadow: "0 46px 90px rgba(0,0,0,0.44)",
          }}
        />
        {[
          [18, 42],
          [50, 42],
          [82, 42],
          [18, 84],
          [82, 84],
          [25, 22],
          [75, 22],
          [25, 66],
          [75, 66],
          [50, 10],
        ].map(([x, y], index) => (
          <React.Fragment key={index}>
            <div
              style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                width: 12,
                height: 12,
                borderRadius: 20,
                border: `1px solid ${index === 9 ? theme.amber : theme.accent}`,
                backgroundColor: theme.ink,
                opacity: 0.3 + open * 0.7,
                transform: "translate(-50%, -50%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                width: 2,
                height: 35 + (index % 3) * 12,
                background: `linear-gradient(180deg, ${theme.accent}, transparent)`,
                opacity: open * (0.45 + pulse * 0.35),
                transform: "translate(-50%, 10px)",
              }}
            />
          </React.Fragment>
        ))}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "space-between",
            color: theme.paper,
            fontSize: 17,
            letterSpacing: 0.7,
          }}
        >
          <span>10 个喷口 · 向下喷气</span>
          <span style={{ color: theme.accent }}>车身获得向上反作用力</span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 78,
          right: 78,
          bottom: 272,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 28,
          fontFamily: font.sans,
          color: theme.paper,
        }}
      >
        <div style={{ borderTop: `1px solid ${theme.line}`, paddingTop: 18 }}>
          <div style={{ color: theme.accent, fontSize: 17, fontWeight: 800 }}>
            释放
          </div>
          <div style={{ fontSize: 26, lineHeight: 1.42, marginTop: 9 }}>
            高压空气喷出
            <br />
            不燃烧燃料
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${theme.line}`, paddingTop: 18 }}>
          <div style={{ color: theme.accent, fontSize: 17, fontWeight: 800 }}>
            结果
          </div>
          <div style={{ fontSize: 26, lineHeight: 1.42, marginTop: 9 }}>
            推力短促
            <br />
            不是持续飞行
          </div>
        </div>
      </div>
    </Backdrop>
  );
};
