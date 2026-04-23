import { Composition } from 'remotion';
import { VIDEO_CONFIG } from './constants';
import Scene01Hook from './scenes/Scene01Hook';
import Scene02Problem from './scenes/Scene02Problem';
import Scene03Intro from './scenes/Scene03Intro';
import Scene04HowItWorks from './scenes/Scene04HowItWorks';
import Scene05Pricing from './scenes/Scene05Pricing';
import Scene06Stats from './scenes/Scene06Stats';
import Scene07CTA from './scenes/Scene07CTA';

export const EvolvianComposition: React.FC = () => {
  return (
    <Composition
      id="EvolvianVideo"
      durationInFrames={VIDEO_CONFIG.durationInFrames}
      fps={VIDEO_CONFIG.fps}
      width={VIDEO_CONFIG.width}
      height={VIDEO_CONFIG.height}
      component={() => (
        <>
          {Scene01Hook()}
        </>
      )}
    />
  );
};

export const scenes = {
  Scene01Hook,
  Scene02Problem,
  Scene03Intro,
  Scene04HowItWorks,
  Scene05Pricing,
  Scene06Stats,
  Scene07CTA,
};

export { VIDEO_CONFIG };
export { default as Scene01Hook } from './scenes/Scene01Hook';
export { default as Scene02Problem } from './scenes/Scene02Problem';
export { default as Scene03Intro } from './scenes/Scene03Intro';
export { default as Scene04HowItWorks } from './scenes/Scene04HowItWorks';
export { default as Scene05Pricing } from './scenes/Scene05Pricing';
export { default as Scene06Stats } from './scenes/Scene06Stats';
export { default as Scene07CTA } from './scenes/Scene07CTA';