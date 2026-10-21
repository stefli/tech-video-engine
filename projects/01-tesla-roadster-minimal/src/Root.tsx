import { Composition } from "remotion";
import { RoadsterFilm } from "./RoadsterFilm";

export const RemotionRoot = () => {
  return (
    <Composition
      id="RoadsterFilm"
      component={RoadsterFilm}
      durationInFrames={2040}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
