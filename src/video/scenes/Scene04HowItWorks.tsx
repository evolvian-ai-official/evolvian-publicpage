import { useCurrentFrame, interpolate, spring } from 'remotion';
import { VIDEO_CONFIG } from '../constants';

const Scene04HowItWorks: React.FC = () => {
  const frame = useCurrentFrame();
  const { colors } = VIDEO_CONFIG;

  const sceneA = frame >= 840 && frame < 1050;
  const sceneB = frame >= 1050 && frame < 1300;
  const sceneC = frame >= 1300 && frame < 1500;

  const stepOpacity = (start: number, end: number) => 
    interpolate(frame, [start, end], [0, 1], { extrapolateRight: 'clamp' });

  const chatBubbleX = spring({ frame: Math.max(0, frame - 860), fps: 30, config: { damping: 14 } }) * -200;
  const replyBubbleX = spring({ frame: Math.max(0, frame - 1070), fps: 30, config: { damping: 14 } }) * 200;

  const timestampOpacity = interpolate(frame, [880, 900], [0, 1], { extrapolateRight: 'clamp' });
  const replyTimestampOpacity = interpolate(frame, [1080, 1100], [0, 1], { extrapolateRight: 'clamp' });

  const calendarOpacity = interpolate(frame, [1320, 1380], [0, 1], { extrapolateRight: 'clamp' });
  const calendarScale = spring({ frame: frame - 1320, fps: 30, config: { damping: 12 } });

  const stepLabelOpacity = stepOpacity(840, 1050);
  const stepLabelOpacityB = stepOpacity(1050, 1300);
  const stepLabelOpacityC = stepOpacity(1300, 1500);

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
      overflow: 'hidden',
    }}>
      {sceneA && (
        <>
          <div style={{
            width: 400,
            height: 500,
            backgroundColor: colors.darkGray,
            borderRadius: 24,
            padding: 20,
            position: 'relative',
            transform: `translateX(${chatBubbleX}px)`,
            opacity: stepOpacity(840, 1050),
          }}>
            <div style={{
              position: 'absolute',
              top: 15,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
            }}>
              <div style={{ width: 60, height: 20, backgroundColor: '#000', borderRadius: 10 }} />
            </div>
            
            <div style={{
              marginTop: 50,
              display: 'flex',
              justifyContent: 'flex-start',
            }}>
              <div style={{
                backgroundColor: '#333333',
                padding: '12px 16px',
                borderRadius: '16px 16px 16px 4px',
                maxWidth: '80%',
              }}>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 18,
                  color: colors.white,
                }}>
                  Hola, ¿tienen citas disponibles mañana?
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 10,
              opacity: timestampOpacity,
            }}>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                color: colors.gray,
              }}>
                11:47 PM
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 30,
              gap: 4,
            }}>
              <div style={{ fontSize: 14, color: colors.gray }}>✓</div>
              <div style={{ fontSize: 14, color: colors.gray }}>✓</div>
            </div>
          </div>

          <div style={{
            position: 'absolute',
            bottom: 120,
            opacity: stepLabelOpacity,
          }}>
            <div style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 40,
              fontWeight: 800,
              color: colors.primary,
              textAlign: 'center',
            }}>
              01
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 24,
              color: colors.white,
              textAlign: 'center',
              marginTop: 10,
            }}>
              El paciente escribe.
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 18,
              color: colors.gray,
              textAlign: 'center',
            }}>
              No importa la hora.
            </div>
          </div>
        </>
      )}

      {sceneB && (
        <>
          <div style={{
            width: 400,
            height: 500,
            backgroundColor: colors.darkGray,
            borderRadius: 24,
            padding: 20,
            position: 'relative',
            transform: `translateX(${replyBubbleX}px)`,
            opacity: stepOpacity(1050, 1300),
          }}>
            <div style={{
              position: 'absolute',
              top: 15,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
            }}>
              <div style={{ width: 60, height: 20, backgroundColor: '#000', borderRadius: 10 }} />
            </div>
            
            <div style={{
              marginTop: 50,
              display: 'flex',
              justifyContent: 'flex-start',
            }}>
              <div style={{
                backgroundColor: '#333333',
                padding: '12px 16px',
                borderRadius: '16px 16px 16px 4px',
                maxWidth: '80%',
              }}>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 18,
                  color: colors.white,
                }}>
                  Hola, ¿tienen citas disponibles mañana?
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 10,
            }}>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                color: colors.gray,
              }}>
                11:47 PM
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 10,
            }}>
              <div style={{
                backgroundColor: colors.primary,
                padding: '12px 16px',
                borderRadius: '16px 16px 4px 16px',
                maxWidth: '90%',
              }}>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 18,
                  color: colors.white,
                }}>
                  ¡Hola! Claro, tenemos disponibilidad mañana a las 10am y 4pm. ¿Cuál te viene mejor?
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 10,
              opacity: replyTimestampOpacity,
            }}>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                color: colors.primary,
                fontWeight: 600,
              }}>
                Respuesta en 3 segundos
              </div>
            </div>
          </div>

          <div style={{
            position: 'absolute',
            bottom: 120,
            opacity: stepLabelOpacityB,
          }}>
            <div style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 40,
              fontWeight: 800,
              color: colors.primary,
              textAlign: 'center',
            }}>
              02
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 24,
              color: colors.white,
              textAlign: 'center',
              marginTop: 10,
            }}>
              Evolvian responde.
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 18,
              color: colors.gray,
              textAlign: 'center',
            }}>
              En segundos. No en horas.
            </div>
          </div>
        </>
      )}

      {sceneC && (
        <>
          <div style={{
            width: 450,
            height: 350,
            backgroundColor: colors.white,
            borderRadius: 16,
            padding: 25,
            transform: `scale(${calendarScale})`,
            opacity: calendarOpacity,
          }}>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 20,
              fontWeight: 600,
              color: '#333',
              marginBottom: 20,
            }}>
              Calendario
            </div>
            
            <div style={{
              backgroundColor: '#f5f5f5',
              padding: 15,
              borderRadius: 8,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 16,
                  color: '#333',
                }}>
                  Mañana
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 14,
                  color: '#666',
                }}>
                  10:00 AM
                </div>
              </div>
              <div style={{
                width: 24,
                height: 24,
                backgroundColor: colors.primary,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{ color: colors.white, fontSize: 14 }}>✓</div>
              </div>
            </div>
          </div>

          <div style={{
            position: 'absolute',
            bottom: 120,
            opacity: stepLabelOpacityC,
          }}>
            <div style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 40,
              fontWeight: 800,
              color: colors.primary,
              textAlign: 'center',
            }}>
              03
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 24,
              color: colors.white,
              textAlign: 'center',
              marginTop: 10,
            }}>
              La cita queda agendada.
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 18,
              color: colors.gray,
              textAlign: 'center',
            }}>
              Automáticamente. Sin intervención.
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Scene04HowItWorks;