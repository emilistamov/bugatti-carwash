import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { BugattiStory } from "@/components/bugatti-story/BugattiStory";
import { WorksShowcase } from "@/components/works-showcase/WorksShowcase";
import { ServiceConfigurator } from "@/components/service-configurator/ServiceConfigurator";
import { FinalCta } from "@/components/final-cta/FinalCta";
import { Footer } from "@/components/footer/Footer";
import { MotionController } from "@/components/motion/MotionController";
import { I18nProvider } from "@/i18n/I18nProvider";

const title = "Выездная автомойка в Ташкенте | Bugatti Car Wash & Spa";
const description =
  "Премиальная выездная автомойка в Ташкенте. Профессиональный уход за кузовом, салоном, дисками и стёклами с выездом к клиенту.";
const socialImage = {
  url: "/images/bugatti-story/mastery.png",
  width: 2250,
  height: 1500,
  alt: "Автомобиль Bugatti",
};

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://www.bugatti-carwash.uz/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://www.bugatti-carwash.uz/",
    siteName: "Bugatti Car Wash & Spa",
    title,
    description,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage],
  },
};

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
