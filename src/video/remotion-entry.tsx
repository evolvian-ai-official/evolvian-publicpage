import { Composition, AbsoluteFill } from 'remotion';
import { useCurrentFrame } from 'remotion';
import { interpolate } from 'remotion';
import { VIDEO_CONFIG, SCENE_RANGES } from './constants';
import Scene01Hook from './scenes/Scene01Hook';
import Scene02Problem from './scenes/Scene02Problem';
import Scene03Intro from './scenes/Scene03Intro';
import Scene04HowItWorks from './scenes/Scene04HowItWorks';
import Scene05Pricing from './scenes/Scene05Pricing';
import Scene06Stats from './scenes/Scene06Stats';
import Scene07CTA from './scenes/Scene07CTA';

const EvolvianVideo: React.FC = () => {
  const frame = useCurrentFrame();
  
  const getSceneOpacity = (sceneStart: number, sceneEnd: number) => {
    return interpolate(frame, [sceneStart, sceneStart + 15, sceneEnd - 15, sceneEnd], [1, 1, 1, 0], { extrapolateRight: 'clamp' });
  };

  return (
    <AbsoluteFill style={{ backgroundColor: VIDEO_CONFIG.colors.background }}>
      <div style={{ opacity: frame < SCENE_RANGES.scene2.start ? 1 : 0 }}>
        <Scene01Hook />
      </div>
      <div style={{ opacity: frame >= SCENE_RANGES.scene2.start && frame < SCENE_RANGES.scene3.start ? 1 : 0 }}>
        <Scene02Problem />
      </div>
      <div style={{ opacity: frame >= SCENE_RANGES.scene3.start && frame < SCENE_RANGES.scene4.start ? 1 : 0 }}>
        <Scene03Intro />
      </div>
      <div style={{ opacity: frame >= SCENE_RANGES.scene4.start && frame < SCENE_RANGES.scene5.start ? 1 : 0 }}>
        <Scene04HowItWorks />
      </div>
      <div style={{ opacity: frame >= SCENE_RANGES.scene5.start && frame < SCENE_RANGES.scene6.start ? 1 : 0 }}>
        <Scene05Pricing />
      </div>
      <div style={{ opacity: frame >= SCENE_RANGES.scene6.start && frame < SCENE_RANGES.scene7.start ? 1 : 0 }}>
        <Scene06Stats />
      </div>
      <div style={{ opacity: frame >= SCENE_RANGES.scene7.start ? 1 : 0 }}>
        <Scene07CTA />
      </div>
    </AbsoluteFill>
  );
};

export const EvolvianComposition = () => {
  return (
    <Composition
      id="EvolvianVideo"
      durationInFrames={VIDEO_CONFIG.durationInFrames}
      fps={VIDEO_CONFIG.fps}
      width={VIDEO_CONFIG.width}
      height={VIDEO_CONFIG.height}
      component={EvolvianVideo}
    />
  );
};

export default EvolvianVideo;