import React, { useEffect, useRef } from 'react';

const VantaTopology: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    const initVanta = async () => {
      if (!vantaRef.current) return;
      try {
        const THREE = await import('three');
        // @ts-ignore
        const TOPOLOGY = await import('vanta/dist/vanta.topology.min.js');
        // @ts-ignore
        vantaEffect.current = TOPOLOGY.default({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0xfaf8f5,
          color: 0xf97316,
        });
      } catch (err) {
        console.error('VantaTopology error:', err);
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

export default VantaTopology;
