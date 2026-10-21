import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { theme, font } from "../theme";
import { Backdrop } from "../components/Backdrop";
import { Chrome } from "../components/Chrome";
import { Tag } from "../components/Tag";

export const Reliability: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [10, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulse = 0.7 + Math.sin(frame / 10) * 0.3;
  return (
    <Backdrop
      image="assets/nozzle-macro.jpg"
      tint={0.92}
      blur={4.5}
      focus="50% 48%"
    >
      <Chrome
        label="核心命题"
        accent={theme.accent}
        source="本片判断 / 非厂商声明"
      />
      <div
        style={{
          position: "absolute",
          top: 280,
          left: 78,
          right: 78,
          color: theme.paper,
          fontFamily: font.sans,
        }}
      >
        <Tag>真正难的地方</Tag>
        <div
          style={{
            fontSize: 67,
            fontWeight: 900,
            lineHeight: 1.17,
            letterSpacing: -2.4,
            marginTop: 22,
          }}
        >
          飞一次，
          <br />
          是最容易被看见的。
          <br />
          <span style={{ color: theme.accent }}>难的是下一次。</span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 78,
          right: 78,
          bottom: 320,
          opacity: p,
          transform: `translateY(${(1 - p) * 20}px)`,
          fontFamily: font.sans,
          color: theme.paper,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "54px 1fr",
            gap: 22,
            borderTop: `1px solid ${theme.line}`,
            paddingTop: 22,
          }}
        >
          <div
            style={{
              fontSize: 23,
              color: theme.accent,
              fontWeight: 800,
              fontFamily: font.mono,
            }}
          >
            01
          </div>
          <div>
            <div style={{ fontSize: 40, fontWeight: 850 }}>每次喷射都可靠</div>
            <div
              style={{
                fontSize: 22,
                lineHeight: 1.45,
                opacity: 0.6,
                marginTop: 8,
              }}
            >
              气量、姿态、故障保护，
              <br />
              不能只成立一次。
            </div>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "54px 1fr",
            gap: 22,
            borderTop: `1px solid ${theme.line}`,
            paddingTop: 22,
            marginTop: 25,
          }}
        >
          <div
            style={{
              fontSize: 23,
              color: theme.accent,
              fontWeight: 800,
              fontFamily: font.mono,
            }}
          >
            02
          </div>
          <div>
            <div style={{ fontSize: 40, fontWeight: 850 }}>每次落地可预期</div>
            <div
              style={{
                fontSize: 22,
                lineHeight: 1.45,
                opacity: 0.6,
                marginTop: 8,
              }}
            >
              不是一次炫技，
              <br />
              而是可验证的安全边界。
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 78,
          right: 78,
          bottom: 202,
          display: "flex",
          alignItems: "center",
          gap: 18,
          fontFamily: font.mono,
          color: theme.accent,
          fontSize: 15,
          letterSpacing: 1.4,
          opacity: pulse,
        }}
      >
        <span
          style={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            backgroundColor: theme.accent,
          }}
        />
        RELIABILITY BEFORE SPECTACLE
      </div>
    </Backdrop>
  );
};
