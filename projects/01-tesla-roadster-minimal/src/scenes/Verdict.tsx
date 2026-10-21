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

export const Verdict: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 150], [0, -55]);
  const rise = interpolate(frame, [0, 30], [35, 0], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ backgroundColor: theme.ink }}>
      <Img
        src={staticFile("assets/wheel-macro.jpg")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "50% 50%",
          transform: `scale(1.12) translateY(${drift}px)`,
          filter: "saturate(0.62) contrast(1.13) brightness(0.88)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(6,7,8,0.76), rgba(6,7,8,0.2) 38%, rgba(6,7,8,0.92) 70%, rgba(6,7,8,0.99) 100%), linear-gradient(90deg, rgba(6,7,8,0.62), transparent 74%)",
        }}
      />
      <Chrome
        label="科技快播 · 判断"
        accent={theme.amber}
        source="官方产品素材 / Tesla，经 TechCrunch 转载"
      />
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 78,
          right: 78,
          color: theme.paper,
          fontFamily: font.sans,
        }}
      >
        <Tag color={theme.amber}>快播判断</Tag>
        <div
          style={{
            marginTop: 22,
            fontSize: 65,
            lineHeight: 1.17,
            fontWeight: 900,
            letterSpacing: -2.3,
          }}
        >
          航天姿态，
          <br />
          被装进了汽车。
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 78,
          right: 78,
          bottom: 280,
          transform: `translateY(${rise}px)`,
          fontFamily: font.sans,
          color: theme.paper,
        }}
      >
        <div
          style={{
            width: 95,
            height: 4,
            backgroundColor: theme.amber,
            marginBottom: 25,
          }}
        />
        <div style={{ fontSize: 33, lineHeight: 1.52 }}>
          发布会展示了能力，
          <br />
          也暴露了空白：
          <br />
          <span style={{ color: theme.amber }}>这类车，谁来管？</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
