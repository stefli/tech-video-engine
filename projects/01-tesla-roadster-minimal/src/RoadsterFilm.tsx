import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { theme } from "./theme";
import { beats, FPS } from "./data";
import { Caption } from "./components/Caption";
import { Hook } from "./scenes/Hook";
import { Reveal } from "./scenes/Reveal";
import { Principle } from "./scenes/Principle";
import { Specs } from "./scenes/Specs";
import { Boundary } from "./scenes/Boundary";
import { Unknowns } from "./scenes/Unknowns";
import { Reliability } from "./scenes/Reliability";
import { Verdict } from "./scenes/Verdict";
import { ProductStart } from "./scenes/ProductStart";
import { Outro } from "./scenes/Outro";

const scenes = [
  { component: Hook, start: 0, end: 4.5 },
  { component: Reveal, start: 4.5, end: 13.1 },
  { component: Principle, start: 13.1, end: 20.3 },
  { component: Specs, start: 20.3, end: 27.7 },
  { component: Boundary, start: 27.7, end: 36.1 },
  { component: Unknowns, start: 36.1, end: 45.1 },
  { component: Reliability, start: 45.1, end: 52.7 },
  { component: Verdict, start: 52.7, end: 58.3 },
  { component: ProductStart, start: 58.3, end: 64.2 },
  { component: Outro, start: 64.2, end: 68 },
];

const FadeLayer: React.FC<{ duration: number; children: React.ReactNode }> = ({
  duration,
  children,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 7, Math.max(8, duration - 7), duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

export const RoadsterFilm: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: theme.ink }}>
      {scenes.map(({ component: Scene, start, end }, index) => {
        const from = Math.round(start * FPS);
        const to = Math.round(end * FPS);
        const duration = to - from;
        return (
          <Sequence key={index} from={from} durationInFrames={duration}>
            <FadeLayer duration={duration}>
              <Scene />
            </FadeLayer>
          </Sequence>
        );
      })}

      <Audio src={staticFile("assets/mix.m4a")} />

      {beats.map((beat) => (
        <Sequence
          key={`caption-${beat.id}`}
          from={Math.round(beat.start * FPS)}
          durationInFrames={Math.max(
            1,
            Math.round((beat.end - beat.start) * FPS),
          )}
        >
          <Caption
            text={beat.caption}
            start={0}
            end={Math.round((beat.end - beat.start) * FPS)}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
