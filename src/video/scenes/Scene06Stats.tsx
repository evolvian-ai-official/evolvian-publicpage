import { useCurrentFrame, interpolate } from 'remotion';
import { VIDEO_CONFIG } from '../constants';

const stats = [
  { value: 82, suffix: '%', label: 'de pacientes prefieren WhatsApp sobre llamadas o email.' },
  { value: 38, suffix: '%', label: 'reducción de no-shows con recordatorios automáticos.', negative: true },
  { value: 3, suffix: 'seg', label: 'tiempo de respuesta de Evolvian. vs. horas de espera tradicional.' },
];

const Scene06Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const { colors } = VIDEO_CONFIG;

  const statIndex = frame < 2250 ? 0 : frame < 2400 ? 1 : 2;
  const stat = stats[statIndex];
  
  const getProgress = (start: number, end: number) => 
    interpolate(frame, [start, end], [0, 1], { extrapolateRight: 'clamp' });

  const currentProgress = statIndex === 0 
    ? getProgress(2100, 2250)
    : statIndex === 1
    ? getProgress(2250, 2400)
    : getProgress(2400, 2550);

  const currentValue = Math.round(currentProgress * stat.value);
  const opacity = interpolate(frame, [statIndex * 150 + 2100, statIndex * 150 + 2160], [0, 1], { extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame, [statIndex * 150 + 2140, statIndex * 150 + 2200], [0, 1], { extrapolateRight: 'clamp' });
  const translateY = interpolate(textOpacity, [0, 1], [20, 0]);

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
        fontFamily: 'Syne, sans-serif',
        fontSize: 160,
        fontWeight: 900,
        color: stat.negative ? '#FF4444' : colors.primary,
        lineHeight: 1,
        opacity,
      }}>
        {stat.negative ? '-' : ''}{currentValue}{stat.suffix}
      </div>

      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 28,
        color: colors.white,
        textAlign: 'center',
        maxWidth: 700,
        marginTop: 40,
        opacity: textOpacity,
        transform: `translateY(${translateY}px)`,
      }}>
        {stat.label}
      </div>
    </div>
  );
};

export default Scene06Stats;