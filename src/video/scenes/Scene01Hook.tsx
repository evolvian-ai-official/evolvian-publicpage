import { useCurrentFrame, interpolate, spring } from 'remotion';
import { VIDEO_CONFIG } from '../constants';

const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { colors } = VIDEO_CONFIG;

  const phoneOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const phoneY = spring({ frame, fps: 30, config: { damping: 15 } }) * 200;

  const blinkIntensity = interpolate(
    Math.floor(frame / 5) % 2,
    [0, 1],
    [0.3, 1]
  );

  const lines = [
    "Son las 11:47 PM.",
    "Un paciente acaba de escribir.",
    "Nadie responde."
  ];

  const getVisibleLines = (frame: number) => {
    if (frame < 60) return 0;
    if (frame < 120) return 1;
    if (frame < 180) return 2;
    return 3;
  };

  const visibleLines = getVisibleLines(frame);

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
        width: 300,
        height: 600,
        backgroundColor: '#1A1A1A',
        borderRadius: 40,
        borderWidth: 4,
        borderColor: '#333',
        borderStyle: 'solid',
        position: 'relative',
        opacity: phoneOpacity,
        transform: `translateY(${phoneY}px)`,
      }}>
        <div style={{
          position: 'absolute',
          top: 20,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
        }}>
          <div style={{
            width: 80,
            height: 24,
            backgroundColor: '#000',
            borderRadius: 12,
          }} />
        </div>
        
        <div style={{
          position: 'absolute',
          top: 60,
          left: 20,
          right: 20,
          height: 480,
          backgroundColor: '#0A0A0A',
          borderRadius: 8,
          padding: 15,
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            height: '100%',
          }}>
            <div style={{
              backgroundColor: '#1A1A1A',
              padding: '12px 16px',
              borderRadius: 20,
              alignSelf: 'flex-start',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{ color: '#888', fontSize: 14 }}>New message</span>
              <div style={{
                width: 8,
                height: 8,
                backgroundColor: '#25D366',
                borderRadius: '50%',
                opacity: blinkIntensity,
              }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 150,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
      }}>
        {lines.map((line, index) => (
          <div
            key={index}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 32,
              color: colors.white,
              textAlign: 'center',
              opacity: visibleLines > index ? 1 : 0,
              transform: visibleLines > index ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scene01Hook;