import { useEffect, useState } from 'react'
import logo from '../images/logo.png'

export default function Splash({ go }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1200)
    const t2 = setTimeout(() => setPhase(2), 8000)
    const t3 = setTimeout(() => go('signin'), 4600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [go])

  return (
    <div className={`splashRoot ${phase === 1 ? 'ready' : ''} ${phase === 2 ? 'fadeOut' : ''}`}>
      <div className="glowOrb" />
      <div className="star star1" />
      <div className="star star2" />
      <div className="star star3" />
      <div className="star star4" />
      <div className="star star5" />
      <div className="star star6" />

      <div className="brandWrap">
        <div className="logoFrame">
          <img src={logo} alt="LaalParii logo" className="brandLogo" />
        </div>
        <div className="brandName">LaalParii</div>
        <div className="brandTag">Smart Bus Booking</div>
      </div>

      <div className="road" />

      {phase >= 1 && (
        <img src={logo} alt="LaalParii bus" className={`busRide ${phase === 2 ? 'fadeOut' : ''}`} />
      )}

      <div className="dots">
        {[0, 1, 2].map(i => (
          <span key={i} className="dot" style={{ animationDelay: `${i * 0.16}s` }} />
        ))}
      </div>

      <style>{`
        .splashRoot {
          position: relative;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at top, rgba(255,255,255,0.22), transparent 30%), linear-gradient(180deg, #3b82f6 0%, #1a56d4 55%, #0f3f92 100%);
          color: #fff;
          padding: 0 18px;
        }
        .splashRoot.fadeOut {
          animation: screenFade 0.5s ease forwards;
        }
        .glowOrb {
          position: absolute;
          top: 12%;
          left: 50%;
          width: 240px;
          height: 240px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.35), rgba(59,130,246,0.05) 62%);
          filter: blur(16px);
          opacity: 0.88;
          animation: pulseGlow 3.5s ease-in-out infinite;
          pointer-events: none;
        }
        .star {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.95);
          opacity: 0.85;
          filter: blur(0.8px);
          animation: starFlicker 2.8s ease-in-out infinite;
        }
        .star1 { top: 14%; left: 18%; animation-delay: 0s; }
        .star2 { top: 20%; right: 16%; width: 10px; height: 10px; animation-delay: 0.3s; }
        .star3 { top: 35%; left: 12%; animation-delay: 0.6s; }
        .star4 { bottom: 28%; left: 20%; width: 6px; height: 6px; animation-delay: 0.4s; }
        .star5 { bottom: 22%; right: 26%; width: 7px; height: 7px; animation-delay: 0.2s; }
        .star6 { bottom: 34%; right: 12%; width: 5px; height: 5px; animation-delay: 0.7s; }
        .brandWrap {
          z-index: 1;
          text-align: center;
          max-width: 330px;
          transition: transform 0.8s ease, opacity 0.8s ease;
        }
        .brandLogo {
          width: 132px;
          height: auto;
          border-radius: 30px;
          padding: 18px;
          background: rgba(255,255,255,0.16);
          box-shadow: 0 18px 50px rgba(0,0,0,0.18);
          border: 1px solid rgba(255,255,255,0.22);
          transform: scale(0.92);
          opacity: 0;
          transition: transform 0.8s ease, opacity 0.8s ease;
        }
        .ready .brandLogo {
          transform: scale(1);
          opacity: 1;
        }
        .brandName {
          font-size: 38px;
          font-weight: 900;
          letter-spacing: 2px;
          margin-top: 18px;
          opacity: 0;
          transform: translateY(14px);
          transition: transform 0.7s ease 0.2s, opacity 0.7s ease 0.2s;
        }
        .ready .brandName {
          opacity: 1;
          transform: translateY(0);
        }
        .brandTag {
          margin-top: 8px;
          font-size: 15px;
          opacity: 0.84;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(14px);
          transition: transform 0.7s ease 0.3s, opacity 0.7s ease 0.3s;
        }
        .ready .brandTag {
          opacity: 1;
          transform: translateY(0);
        }
        .road {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 92px;
          height: 5px;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(255,255,255,0.18), rgba(255,255,255,0.45), rgba(255,255,255,0.18));
          box-shadow: 0 0 24px rgba(255,255,255,0.12);
        }
        .busRide {
          position: absolute;
          bottom: 78px;
          left: -160px;
          width: 112px;
          height: auto;
          opacity: 0;
          filter: drop-shadow(0 20px 30px rgba(0,0,0,0.22));
          animation: busDrive 2.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .ready .busRide {
          opacity: 1;
        }
        .busRide.fadeOut {
          animation: busDrive 1.2s ease forwards;
          opacity: 0;
          transform: translateY(-10px) scale(0.9);
        }
        .dots {
          position: absolute;
          bottom: 34px;
          display: flex;
          gap: 10px;
          z-index: 1;
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.8);
          opacity: 0.7;
          animation: pulseDot 1.3s ease-in-out infinite;
        }
        @keyframes pulseDot {
          0%,100% { transform: scale(0.8); opacity: 0.45; }
          50%      { transform: scale(1.2); opacity: 1; }
        }
        @keyframes starFlicker {
          0%,100% { opacity: 0.75; transform: scale(1); }
          50%      { opacity: 0.35; transform: scale(0.9); }
        }
        @keyframes pulseGlow {
          0%,100% { transform: translateX(-50%) scale(0.96); opacity: 0.82; }
          50%      { transform: translateX(-50%) scale(1.06); opacity: 1; }
        }
        @keyframes busDrive {
          0% {
            left: -160px;
            transform: scale(0.84) rotate(-10deg);
          }
          30% {
            left: 20%;
            transform: scale(1.08) rotate(0deg);
          }
          70% {
            left: 60%;
            transform: scale(1) rotate(2deg);
          }
          100% {
            left: calc(100% + 140px);
            transform: scale(0.92) rotate(8deg);
          }
        }
        @keyframes screenFade {
          to { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
