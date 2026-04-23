import { Composition } from 'remotion';
import { useCurrentFrame } from 'remotion';
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
  
  const renderScene = () => {
    if (frame < SCENE_RANGES.scene2.start) {
      return <Scene01Hook />;
    } else if (frame < SCENE_RANGES.scene3.start) {
      return <Scene02Problem />;
    } else if (frame < SCENE_RANGES.scene4.start) {
      return <Scene03Intro />;
    } else if (frame < SCENE_RANGES.scene5.start) {
      return <Scene04HowItWorks />;
    } else if (frame < SCENE_RANGES.scene6.start) {
      return <Scene05Pricing />;
    } else if (frame < SCENE_RANGES.scene7.start) {
      return <Scene06Stats />;
    } else {
      return <Scene07CTA />;
    }
  };
  
  return (
    <div style={{
      width: VIDEO_CONFIG.width,
      height: VIDEO_CONFIG.height,
      backgroundColor: VIDEO_CONFIG.colors.background,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {renderScene()}
    </div>
  );
};

export const RemotionVideo = () => {
  return (
    <Composition
      id="EvolvianVideo"
      durationInFrames={VIDEO_CONFIG.durationInFrames}
      fps={VIDEO_CONFIG.fps}
      width={VIDEO_CONFIG.width}
      height={VIDEO_CONFIG.height}
      defaultProps={{}}
      component={EvolvianVideo}
    />
  );
};

export { VIDEO_CONFIG, SCENE_RANGES };
export { default as Scene01Hook } from './scenes/Scene01Hook';
export { default as Scene02Problem } from './scenes/Scene02Problem';
export { default as Scene03Intro } from './scenes/Scene03Intro';
export { default as Scene04HowItWorks } from './scenes/Scene04HowItWorks';
export { default as Scene05Pricing } from './scenes/Scene05Pricing';
export { default as Scene06Stats } from './scenes/Scene06Stats';
export { default as Scene07CTA } from './scenes/Scene07CTA';
export { default } from './EvolvianVideo';