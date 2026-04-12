"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const WebsitePreloader = ({ isVisible }) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const played = sessionStorage.getItem("preloaderPlayed");
    if (played) {
      setHasAnimated(true);
    } else {
      sessionStorage.setItem("preloaderPlayed", "true");
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[130] flex flex-col items-center justify-center bg-white"
          
          // ✅ No delay here (instant screen)
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <motion.img
            src="/assets/logo.png"
            alt="FINIQUE"
            className="h-14 w-auto mb-10"
            
            initial={
              hasAnimated
                ? false
                : { opacity: 0, y: 20, scale: 0.95 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            
            transition={{
              delay: hasAnimated ? 0 : 0.25, // 👈 ONLY HERE
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {/* Tagline */}
          <motion.p
            className="mt-8 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400"
            
            initial={hasAnimated ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            
            transition={{
              delay: hasAnimated ? 0 : 0.45, // 👈 after logo
              duration: 0.6,
            }}
          >
            Premium Windows & Doors
          </motion.p>

          {/* Bottom shimmer */}
          <div className="fixed bottom-0 left-0 right-0 h-0.5 overflow-hidden bg-slate-100">
            <span className="block h-full w-1/3 bg-gradient-to-r from-transparent via-violet-500 to-transparent preloader-shimmer" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WebsitePreloader;