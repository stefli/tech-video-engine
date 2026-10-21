import React from "react";
import { theme, font } from "../theme";

export const Tag: React.FC<{
  children: React.ReactNode;
  color?: string;
  solid?: boolean;
  style?: React.CSSProperties;
}> = ({ children, color = theme.accent, solid = false, style }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "10px 18px",
      border: `1.5px solid ${color}`,
      backgroundColor: solid ? color : "rgba(9,11,12,0.75)",
      color: solid ? theme.ink : color,
      fontFamily: font.sans,
      fontSize: 20,
      fontWeight: 800,
      letterSpacing: 1.2,
      borderRadius: 2,
      ...style,
    }}
  >
    {children}
  </div>
);
