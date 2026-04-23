import { useCurrentFrame, interpolate, spring } from 'remotion';
import { VIDEO_CONFIG } from '../constants';

const plans = [
  { name: 'FREE', price: '$0', features: ['Web chat widget', 'Appointment booking', '500 messages'], popular: false },
  { name: 'Starter', price: '$19', features: ['Everything in Free', 'Priority support', '5,000 messages'], popular: false },
  { name: 'Premium', price: '$49', features: ['Everything in Starter', 'Client insights', 'Marketing campaigns', 'Human handoff'], popular: true },
  { name: 'White Label', price: '$199+', features: ['Custom branding', 'API access', 'Dedicated support', 'Unlimited users'], popular: false },
];

const PricingCard: React.FC<{ plan: typeof plans[0]; index: number; frame: number }> = ({ plan, index, frame }) => {
  const { colors } = VIDEO_CONFIG;
  const startFrame = 1500 + index * 60;
  
  const opacity = interpolate(frame, [startFrame, startFrame + 30], [0, 1], { extrapolateRight: 'clamp' });
  const translateX = spring({ frame: Math.max(0, frame - startFrame), fps: 30, config: { stiffness: 80 } }) * 400;
  
  const glowIntensity = interpolate(frame, [startFrame + 30, startFrame + 100], [0, 0.5], { extrapolateRight: 'clamp' });

  return (
    <div style={{
      width: 420,
      backgroundColor: plan.popular ? '#1A1A1A' : colors.darkGray,
      borderRadius: 16,
      padding: 24,
      border: plan.popular ? `2px solid ${colors.primary}` : 'none',
      boxShadow: plan.popular ? `0 0 ${30 * glowIntensity}px ${colors.primary}40` : 'none',
      transform: `translateX(${translateX}px)`,
      opacity,
      position: 'relative',
    }}>
      {plan.popular && (
        <div style={{
          position: 'absolute',
          top: -12,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: colors.primary,
          padding: '4px 16px',
          borderRadius: 12,
        }}>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 12,
            fontWeight: 600,
            color: colors.white,
          }}>
            MOST POPULAR
          </div>
        </div>
      )}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 28,
          fontWeight: 700,
          color: colors.white,
        }}>
          {plan.name}
        </div>
        <div style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 28,
          fontWeight: 800,
          color: colors.primary,
        }}>
          {plan.price}
        </div>
      </div>
      
      <div style={{ width: '100%', height: 1, backgroundColor: '#333', marginBottom: 16 }} />
      
      {plan.features.map((feature, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ color: colors.primary, marginRight: 8, fontSize: 16 }}>✓</div>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 16,
            color: colors.white,
          }}>
            {feature}
          </div>
        </div>
      ))}
      
      <div style={{
        marginTop: 16,
        padding: '12px 0',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 16,
          fontWeight: 600,
          color: plan.popular ? colors.primary : colors.white,
        }}>
          {plan.popular ? '[ Start automating ]' : '[ Try it ]'}
        </div>
      </div>
    </div>
  );
};

const Scene05Pricing: React.FC = () => {
  const frame = useCurrentFrame();
  const { colors } = VIDEO_CONFIG;

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
      {frame >= 1500 && (
        <div style={{
          position: 'absolute',
          top: 80,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <div style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 36,
            fontWeight: 800,
            color: colors.white,
            marginBottom: 40,
          }}>
            Elige tu plan
          </div>
        </div>
      )}
      
      <div style={{
        display: 'flex',
        gap: 16,
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '90%',
      }}>
        {plans.map((plan, index) => (
          <PricingCard key={plan.name} plan={plan} index={index} frame={frame} />
        ))}
      </div>
    </div>
  );
};

export default Scene05Pricing;