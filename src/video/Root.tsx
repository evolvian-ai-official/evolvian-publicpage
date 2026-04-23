import { useCurrentFrame } from 'remotion';
import Scene01Hook from './scenes/Scene01Hook';
import Scene02Problem from './scenes/Scene02Problem';
import Scene03Intro from './scenes/Scene03Intro';
import Scene04HowItWorks from './scenes/Scene04HowItWorks';
import Scene05Pricing from './scenes/Scene05Pricing';
import Scene06Stats from './scenes/Scene06Stats';
import Scene07CTA from './scenes/Scene07CTA';
import { VIDEO_CONFIG, SCENE_RANGES } from './constants';

const Root: React.FC = () => {
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
    }}>
      {renderScene()}
    </div>
  );
};

export default Root;