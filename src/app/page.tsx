import { Hero } from "@/components/hero/Hero";
import { BugattiStory } from "@/components/bugatti-story/BugattiStory";
import { WorksShowcase } from "@/components/works-showcase/WorksShowcase";
import { ServiceConfigurator } from "@/components/service-configurator/ServiceConfigurator";
import { FinalCta } from "@/components/final-cta/FinalCta";
import { Footer } from "@/components/footer/Footer";
import { MotionController } from "@/components/motion/MotionController";
import { I18nProvider } from "@/i18n/I18nProvider";

export default function Home() {
  return (
    <I18nProvider>
      <MotionController />
      <Hero />
      <BugattiStory />
      <WorksShowcase />
      <ServiceConfigurator />
      <FinalCta />
      <Footer />
    </I18nProvider>
  );
}
