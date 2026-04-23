import { useCurrentFrame, interpolate, spring } from 'remotion';
import { VIDEO_CONFIG } from '../constants';

const Scene03Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { colors } = VIDEO_CONFIG;

  const flashOpacity = interpolate(frame, [540, 542], [0, 1], { extrapolateRight: 'clamp' });
  const logoScale = spring({ frame: frame - 542, fps: 30, config: { damping: 12 } });
  
  const lineWidth = interpolate(frame, [580, 650], [0, 100], { extrapolateRight: 'clamp' });
  
  const missionOpacity = interpolate(frame, [680, 740], [0, 1], { extrapolateRight: 'clamp' });
  const subtitleOpacity = interpolate(frame, [800, 860], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: colors.background,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FFFFFF',
        opacity: flashOpacity,
      }} />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: logoScale,
        transform: `scale(${logoScale})`,
      }}>
        <div style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 80,
          fontWeight: 800,
          letterSpacing: 10,
          color: colors.white,
        }}>
          EVOLVIAN
        </div>
        
        <div style={{
          width: `${lineWidth}%`,
          maxWidth: 400,
          height: 2,
          backgroundColor: colors.primary,
          marginTop: 20,
        }} />
      </div>

      <div style={{
        position: 'absolute',
        bottom: 250,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        opacity: missionOpacity,
      }}>
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 36,
          color: '#CCCCCC',
          textAlign: 'center',
          lineHeight: 1.5,
        }}>
          We help health professionals<br/>never miss a client.
        </div>
        
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 24,
          color: colors.gray,
          textAlign: 'center',
          marginTop: 20,
          opacity: subtitleOpacity,
        }}>
          Automating responses, bookings,<br/>and follow-ups — 24/7.
        </div>
      </div>
    </div>
  );
};

export default Scene03Intro;