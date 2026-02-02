// import React, { useEffect, useRef } from 'react';

// interface VantaGlobeProps {
//   className?: string;
// }

// const VantaGlobe: React.FC<VantaGlobeProps> = ({ className = "" }) => {
//   const vantaRef = useRef<HTMLDivElement>(null);
//   const vantaEffect = useRef<any>(null);

//   useEffect(() => {
//     const initVanta = async () => {
//       if (!vantaRef.current) return;

//       try {
//         const THREE = await import('three');
//         const GLOBE = await import('vanta/dist/vanta.globe.min.js');

//         vantaEffect.current = GLOBE.default({
//           el: vantaRef.current,
//           THREE: THREE,
//           mouseControls: true,
//           touchControls: true,
//           gyroControls: false,
//           minHeight: 200.00,
//           minWidth: 200.00,
//           scale: 1.00,
//           scaleMobile: 1.00,
//           backgroundColor:  0xe6dfd6,
//           color: 0xff3f81,
//           color2: 0x0f172a,
//           size: 1
//         });
//       } catch (error) {
//         console.error('Error loading Vanta:', error);
//       }
//     };

//     initVanta();

//     return () => {
//       if (vantaEffect.current) {
//         vantaEffect.current.destroy();
//       }
//     };
//   }, []);

//   return (
//     <div 
//       ref={vantaRef} 
//       className={`absolute inset-0 z-0 ${className}`}
//       style={{ width: '100%', height: '100%' }}
//     />
//   );
// };

// export default VantaGlobe;




import React, { useEffect, useRef } from 'react';

interface VantaGlobeProps {
  className?: string;
}

const VantaGlobe: React.FC<VantaGlobeProps> = ({ className = "" }) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    const initVanta = async () => {
      if (!vantaRef.current) return;

      try {
        const THREE = await import('three');
        // @ts-ignore
        const GLOBE = await import('vanta/dist/vanta.globe.min.js');

        // @ts-ignore
        vantaEffect.current = GLOBE.default({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
backgroundColor: 0xefe8db,
color: 0xf97316,
color2: 0x0f172a,
          size: 1
        });
      } catch (error) {
        console.error('Error loading Vanta:', error);
      }
    };

    initVanta();

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  return (
    <div 
      ref={vantaRef} 
      className={`absolute inset-0 z-0 ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default VantaGlobe;
