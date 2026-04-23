import { useCurrentFrame, interpolate, spring } from 'remotion';
import { VIDEO_CONFIG } from '../constants';

const Scene07CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { colors } = VIDEO_CONFIG;

  const momentA = frame >= 2550 && frame < 2700;
  const momentB = frame >= 2700 && frame < 2850;
  const momentC = frame >= 2850 && frame < 3000;

  const lines = [
    "Tu consultorio nunca",
    "debería perder un paciente",
    "por no responder a tiempo."
  ];

  const getOpacity = (start: number, end: number) => 
    interpolate(frame, [start, end], [0, 1], { extrapolateRight: 'clamp' });

  const lineOpacity = (index: number) => 
    interpolate(frame, [2550 + index * 40, 2550 + index * 40 + 30], [0, 1], { extrapolateRight: 'clamp' });

  const logoScale = spring({ frame: frame - 2700, fps: 30, config: { damping: 12 } });
  const lineWidth = interpolate(frame, [2750, 2820], [0, 100], { extrapolateRight: 'clamp' });
  
  const ctaOpacity = interpolate(frame, [2850, 2920], [0, 1], { extrapolateRight: 'clamp' });
  const arrowX = spring({ frame: frame - 2880, fps: 30, config: { damping: 14 } }) * -20;

  const finalFade = interpolate(frame, [2950, 3000], [1, 0], { extrapolateRight: 'clamp' });

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
      opacity: finalFade,
    }}>
      {momentA && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 15,
        }}>
          {lines.map((line, index) => (
            <div
              key={index}
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 48,
                fontWeight: 700,
                color: colors.white,
                textAlign: 'center',
                opacity: lineOpacity(index),
                transform: `translateY(${lineOpacity(index) < 1 ? (1 - lineOpacity(index)) * 20 : 0}px)`,
              }}
            >
              {line}
            </div>
          ))}
        </div>
      )}

      {momentB && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: getOpacity(2700, 2850),
        }}>
          <div style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 60,
            fontWeight: 800,
            letterSpacing: 8,
            color: colors.white,
            transform: `scale(${logoScale})`,
          }}>
            EVOLVIAN
          </div>
          
          <div style={{
            width: `${lineWidth}%`,
            maxWidth: 250,
            height: 2,
            backgroundColor: colors.primary,
            marginTop: 20,
          }} />
          
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 28,
            color: colors.white,
            marginTop: 30,
          }}>
            Empieza gratis hoy.
          </div>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 24,
            color: colors.primary,
            marginTop: 10,
          }}>
            evolvian.com
          </div>
        </div>
      )}

      {momentC && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}>
          <div style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 50,
            fontWeight: 800,
            letterSpacing: 6,
            color: colors.white,
          }}>
            EVOLVIAN
          </div>
          
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 22,
            color: colors.primary,
            opacity: ctaOpacity,
          }}>
            Try it free →
          </div>
        </div>
      )}
    </div>
  );
};

export default Scene07CTA;