import { useCurrentFrame, interpolate } from 'remotion';
import { VIDEO_CONFIG } from '../constants';

const Scene02Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { colors } = VIDEO_CONFIG;

  const firstStatProgress = interpolate(frame, [240, 360], [0, 1], { extrapolateRight: 'clamp' });
  const secondStatProgress = interpolate(frame, [420, 540], [0, 1], { extrapolateRight: 'clamp' });

  const percentage1 = Math.round(firstStatProgress * 30);
  const percentage2 = secondStatProgress > 0 ? 150 : Math.round(firstStatProgress * 150);

  const displayStat1 = frame < 420;
  const opacityText1 = interpolate(frame, [300, 360], [0, 1], { extrapolateRight: 'clamp' });
  const opacityText2 = interpolate(frame, [480, 540], [0, 1], { extrapolateRight: 'clamp' });

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
      {displayStat1 && (
        <>
          <div style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 180,
            fontWeight: 900,
            color: colors.primary,
            lineHeight: 1,
          }}>
            {percentage1}%
          </div>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 28,
            color: colors.white,
            marginTop: 40,
            textAlign: 'center',
            maxWidth: 800,
            opacity: opacityText1,
          }}>
            de pacientes que no reciben respuesta<br/>inmediata buscan otro médico.
          </div>
        </>
      )}

      {!displayStat1 && (
        <>
          <div style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 180,
            fontWeight: 900,
            color: colors.primary,
            lineHeight: 1,
          }}>
            ${percentage2}B
          </div>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 28,
            color: colors.white,
            marginTop: 40,
            textAlign: 'center',
            maxWidth: 800,
            opacity: opacityText2,
          }}>
            perdidos anualmente por no-shows<br/>y citas sin confirmar.
          </div>
        </>
      )}
    </div>
  );
};

export default Scene02Problem;