import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { theme, font } from "../theme";

export const Chrome: React.FC<{
  section?: string;
  label?: string;
  accent?: string;
  source?: string;
  minimal?: boolean;
}> = ({
  section = "科技快播",
  label,
  accent = theme.accent,
  source,
  minimal = false,
}) => {
  const frame = useCurrentFrame();
  const lineWidth = interpolate(frame, [0, 22], [0, 74], {
    extrapolateRight: "clamp",
  });
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 76,
          left: 72,
          right: 72,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          color: theme.paper,
          fontFamily: font.sans,
        }}
      >
        <div style={{ display: "flex", gap: 17, alignItems: "center" }}>
          <div
            style={{
              width: 9,
              height: 9,
              borderRadius: 2,
              backgroundColor: accent,
            }}
          />
          <div>
            <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 1.5 }}>
              {section}
            </div>
            {!minimal && (
              <div
                style={{
                  fontSize: 18,
                  opacity: 0.65,
                  letterSpacing: 2.0,
                  marginTop: 4,
                  fontWeight: 600,
                }}
              >
                前沿科技 · 事实核查
              </div>
            )}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              width: lineWidth,
              height: 3,
              backgroundColor: accent,
              marginLeft: "auto",
            }}
          />
          {label && (
            <div
              style={{
                fontSize: 20,
                letterSpacing: 1.0,
                opacity: 0.78,
                marginTop: 10,
                fontWeight: 650,
              }}
            >
              {label}
            </div>
          )}
        </div>
      </div>
      {source && (
        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: 72,
            color: theme.paper,
            opacity: 0.72,
            fontFamily: font.sans,
            fontSize: 20,
            letterSpacing: 0.5,
            fontWeight: 500,
            textShadow: "0 2px 10px rgba(0,0,0,0.9)",
          }}
        >
          {source}
        </div>
      )}
      <div
        style={{
          position: "absolute",
          left: 72,
          right: 72,
          bottom: 48,
          height: 1,
          backgroundColor: theme.line,
        }}
      >
        <div
          style={{
            width: `${Math.min(100, (frame / 2040) * 100)}%`,
            height: "100%",
            backgroundColor: accent,
          }}
        />
      </div>
    </>
  );
};
