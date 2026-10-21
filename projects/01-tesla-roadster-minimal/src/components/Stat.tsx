import React from "react";
import { theme, font } from "../theme";

export const Stat: React.FC<{
  value: string;
  label: string;
  note?: string;
  accent?: string;
  large?: boolean;
}> = ({ value, label, note, accent = theme.accent, large = false }) => (
  <div
    style={{
      borderTop: `1px solid ${theme.line}`,
      paddingTop: 18,
      fontFamily: font.sans,
      color: theme.paper,
    }}
  >
    <div
      style={{
        fontSize: large ? 92 : 62,
        fontWeight: 850,
        lineHeight: 1,
        color: accent,
        letterSpacing: -2,
      }}
    >
      {value}
    </div>
    <div style={{ fontSize: 22, fontWeight: 650, marginTop: 12 }}>{label}</div>
    {note && (
      <div style={{ fontSize: 16, opacity: 0.52, marginTop: 8 }}>{note}</div>
    )}
  </div>
);
