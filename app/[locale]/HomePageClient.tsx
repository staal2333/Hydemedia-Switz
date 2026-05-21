'use client';

import { EasterEggsProvider } from '@/components/blue-hour/easter-eggs/EasterEggsProvider';
import TopStage from '@/components/blue-hour/TopStage';
import BlueHourNav from '@/components/blue-hour/BlueHourNav';
import Hero from '@/components/blue-hour/Hero';
import TrustStrip from '@/components/blue-hour/TrustStrip';
import BrandStrip from '@/components/blue-hour/BrandStrip';
import GroundFlow from '@/components/blue-hour/GroundFlow';
import Streetlights from '@/components/blue-hour/easter-eggs/Streetlights';
import Placements from '@/components/blue-hour/Placements';
import Manifesto from '@/components/blue-hour/Manifesto';
import Solutions from '@/components/blue-hour/Solutions';
import Audience from '@/components/blue-hour/Audience';
import TeamCTA from '@/components/blue-hour/TeamCTA';
import FinalCTA from '@/components/blue-hour/FinalCTA';
import { CityHorizon, GroundDatum } from '@/components/blue-hour/CityNiches';
import OutdoorMarquee from '@/components/blue-hour/OutdoorMarquee';

export default function HomePageClient() {
  return (
    <EasterEggsProvider>
      <TopStage>
        <BlueHourNav />
        <Hero />
        <BrandStrip onDusk />
        <TrustStrip />
      </TopStage>

      <GroundFlow>
        <OutdoorMarquee />
        <Placements />
        <Manifesto />
        <CityHorizon />
        <Solutions />
        <Audience />
        <TeamCTA />
        <Streetlights />
        <GroundDatum />
        <FinalCTA />
      </GroundFlow>
    </EasterEggsProvider>
  );
}
