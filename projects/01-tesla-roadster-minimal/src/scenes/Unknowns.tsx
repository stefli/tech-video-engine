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

const items = [
  { key: "量产", value: "计划 2028", note: "尚未交付" },
  { key: "价格", value: "未公布", note: "Rocket 邀请制" },
  { key: "监管", value: "未明确", note: "DOT 尚无清晰答案" },
];

export const Unknowns: React.FC = () => {
  const frame = useCurrentFrame();
  const pan = interpolate(frame, [0, 252], [0, -70]);
  return (
    <AbsoluteFill style={{ backgroundColor: theme.ink }}>
      <Img
        src={staticFile("assets/cockpit.jpg")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "50% 44%",
          opacity: 0.62,
          transform: `scale(1.1) translateY(${pan}px)`,
          filter: "grayscale(0.16) contrast(1.06)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(6,7,8,0.86), rgba(6,7,8,0.18) 32%, rgba(6,7,8,0.92) 66%, rgba(6,7,8,0.99) 100%)",
        }}
      />
      <Chrome
        label="仍未确定"
        accent={theme.amber}
        source="时间、价格与监管状态以截至 2026-10-16 的公开信息为准"
      />
      <div
        style={{
          position: "absolute",
          top: 275,
          left: 78,
          right: 78,
          fontFamily: font.sans,
          color: theme.paper,
        }}
      >
        <Tag color={theme.amber}>计划，不是交付</Tag>
        <div
          style={{
            fontSize: 67,
            fontWeight: 900,
            lineHeight: 1.17,
            letterSpacing: -2.3,
            marginTop: 22,
          }}
        >
          有了日期，
          <br />
          但还没有完整答案。
          <br />
          <span style={{ color: theme.amber }}>更没有现成规则。</span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 78,
          right: 78,
          bottom: 265,
          fontFamily: font.sans,
        }}
      >
        {items.map((item, i) => {
          const p = interpolate(frame, [24 + i * 20, 50 + i * 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={item.key}
              style={{
                display: "grid",
                gridTemplateColumns: "128px 1fr",
                gap: 22,
                alignItems: "center",
                borderTop: `1px solid ${theme.line}`,
                padding: "23px 0",
                color: theme.paper,
                opacity: p,
                transform: `translateY(${(1 - p) * 13}px)`,
              }}
            >
              <div style={{ fontSize: 21, opacity: 0.52 }}>{item.key}</div>
              <div>
                <div
                  style={{
                    fontSize: 42,
                    fontWeight: 850,
                    color: i === 2 ? theme.accent : theme.paper,
                  }}
                >
                  {item.value}
                </div>
                <div style={{ fontSize: 17, opacity: 0.48, marginTop: 5 }}>
                  {item.note}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
