"use client";

import { memo, useState, useEffect } from "react";
import HeroLuxury from "@/components/home/HeroLuxury";
import TrustBadges from "@/components/home/TrustBadges";
import ValueProposition from "@/components/home/ValueProposition";
import SolutionsBlowup from "@/components/home/SolutionsBlowup";
import CampaignGallery from "@/components/home/CampaignGallery";
import SpecialistsAndAudience from "@/components/home/SpecialistsAndAudience";
import WhyHydeBlowup from "@/components/home/WhyHydeBlowup";
import FinalCTA from "@/components/home/FinalCTA";

const BackgroundElements = memo(({ isMobile }: { isMobile: boolean }) => {
  if (isMobile) return null;
  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 -left-20 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-3xl animate-float-cloud" />
        <div
          className="absolute bottom-1/4 -right-32 w-[420px] h-[420px] bg-sky-100/15 rounded-full blur-3xl animate-float-cloud"
          style={{ animationDelay: "12s" }}
        />
      </div>
    </>
  );
});

BackgroundElements.displayName = "BackgroundElements";

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1280);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className="relative"
      style={{
        background:
          "linear-gradient(to bottom, rgb(224 242 254) 0%, rgb(240 249 255) 15%, rgb(248 250 252) 35%, rgb(255 255 255) 60%)",
      }}
    >
      <BackgroundElements isMobile={isMobile} />
      <HeroLuxury />
      <TrustBadges />
      <ValueProposition />
      <SolutionsBlowup />
      <CampaignGallery />
      <SpecialistsAndAudience />
      <WhyHydeBlowup />
      <FinalCTA />
    </div>
  );
}
