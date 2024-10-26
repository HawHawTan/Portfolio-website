import React, { useEffect, useRef } from "react";

const VantaDotsBackground = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    let vantaEffect = null;

    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const initializeVanta = async () => {
      try {
        if (!window.THREE) {
          await loadScript(
            "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
          );
        }
        // Load Vanta dots effect script
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.dots.min.js"
        );

        // Initialize Vanta only if the scripts loaded successfully
        if (window.VANTA && vantaRef.current) {
          vantaEffect = window.VANTA.DOTS({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0xc7deff,
            color2: 0xc7deff,
            // 0x6c727f
            backgroundColor: 0x212631,
            size: 3,
            spacing: 50.0,
            showLines: false,
          });
        }
      } catch (error) {
        console.error("Error loading Vanta or Three.js:", error);
      }
    };

    initializeVanta();

    // Cleanup the effect on unmount
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);
  return (
    <div
    id="vantaBG"
    ref={vantaRef}
    style={{
      width: "100%",
      height: "100vh",
      backgroundColor: "#24303F" // Fallback bg color
    }}
  />
  );
};

export default VantaDotsBackground;
