import { AuroraBackground } from "../components/ui/aurora-background"
import { SignUpForm } from "../components/ui/form"
import { motion } from "framer-motion";
import { BackgroundGradient } from "../components/ui/background-gradient";
// import React from "react";

export function Signup() {
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
            className="relative flex flex-col gap-4 items-center justify-center px-4"
          >
            <BackgroundGradient>
              <div className="w-full max-w-[1200px] mx-auto">
                <SignUpForm />
              </div>
            </BackgroundGradient>
          </motion.div>
        </AuroraBackground>
      </>
    );
  }
  