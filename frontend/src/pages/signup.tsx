import { AuroraBackground } from "../components/ui/aurora-background";
import { SignUpForm } from "../components/ui/form";
import { motion } from "framer-motion";
import { BackgroundGradient } from "../components/ui/background-gradient";
import { FlipWords } from "../components/ui/flip-words";
// import React from "react";

export function Signup() {
  const words = ["better", "exciting", "seamless", "innovative"];
  return (
    <>
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="flex flex-col md:flex-row items-center justify-center px-4 h-screen" // Ensure it fills the height of the screen
        >
         
          <div className="text-6xl font-normal text-white dark:text-white p-4 z-10 font-Consolas">
            Manage 
            <FlipWords words={words} /> <br />
            Events with Event Ease
          </div>

          <BackgroundGradient > 
            <div className="w-full">
              <SignUpForm />
            </div>
          </BackgroundGradient>
        </motion.div>
      </AuroraBackground>
    </>
  );
}
