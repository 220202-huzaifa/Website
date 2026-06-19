import React, { useEffect, useRef } from 'react';

const VantaNet: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    const initVanta = async () => {
      if (!vantaRef.current) return;
      try {
        const THREE = await import('three');
        // @ts-ignore
        const NET = await import('vanta/dist/vanta.net.min.js');
        // @ts-ignore
        vantaEffect.current = NET.default({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0x03000a,
          color: 0xf97316,
          points: 14,
          maxDistance: 22,
          spacing: 18,
        });
      } catch (err) {
        console.error('VantaNet error:', err);
      }
    };
    initVanta();
    return () => { if (vantaEffect.current) vantaEffect.current.destroy(); };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="absolute inset-0 z-0"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default VantaNet;
