"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { locales } from "@/i18n/translations";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./Hero.module.css";

const HERO_VIDEO_SRC = "/videos/hero.mp4";
const HERO_POSTER_SRC = "/images/hero/poster.png";

export function Hero() {
  const { locale, setLocale, t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const openMobileMenu = () => {
    if (window.matchMedia("(max-width: 767px)").matches) setMenuOpen(true);
  };

  return (
    <main className={styles.hero} data-node-id="170:226">
      <div className={styles.media} aria-hidden="true">
        <Image
          className={styles.poster}
          src={HERO_POSTER_SRC}
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <video
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_POSTER_SRC}
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
      </div>

      <Image
        className={styles.overlay}
        src="/images/hero/cinematic-overlay.png"
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden="true"
      />

      <Image
        className={styles.reflection}
        src="/images/hero/warm-reflection.svg"
        alt=""
        width={980}
        height={740}
        aria-hidden="true"
      />

      <nav className={`${styles.navigation} ${styles.revealNav}`} aria-label="Главная навигация">
        <span>{t.common.city}</span>
        <div className={styles.navRight}>
          <div className={styles.languageSwitcher} aria-label="Language">
            {locales.map((item, index) => (
              <span className={styles.localeItem} key={item}>
                <button
                  type="button"
                  className={item === locale ? styles.localeActive : ""}
                  aria-pressed={item === locale}
                  onClick={() => setLocale(item)}
                >
                  {item.toUpperCase()}
                </button>
                {index < locales.length - 1 ? <span aria-hidden="true">/</span> : null}
              </span>
            ))}
          </div>
          <button
            className={styles.menuTrigger}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={openMobileMenu}
          >
            {t.common.menu}&nbsp;&nbsp;—
          </button>
        </div>
      </nav>

      <div
        id="mobile-navigation"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!menuOpen}
      >
        <button className={styles.menuClose} type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          ×
        </button>
        <nav aria-label={t.footer.navigationAria}>
          <a href="#" onClick={() => setMenuOpen(false)}>{t.footer.home}</a>
          <a href="#service-configurator" onClick={() => setMenuOpen(false)}>{t.footer.services}</a>
          <a href="#works" onClick={() => setMenuOpen(false)}>{t.footer.works}</a>
        </nav>
      </div>

      <Image
        className={`${styles.logo} ${styles.revealLogo}`}
        src="/images/hero/logo.svg"
        alt="BUGATTI CARWASH & SPA"
        width={84}
        height={62}
        priority
      />

      <div className={styles.brandFocus}>
        <h1 className={`${styles.title} ${styles.revealTitle}`}>
          <span>BUGATTI</span>
          <span>CAR WASH</span>
        </h1>
        <span className={`${styles.goldHairline} ${styles.revealDetail}`} aria-hidden="true" />
        <p className={`${styles.subtitle} ${styles.revealSubtitle}`}>
          {t.hero.subtitle}
        </p>
        <a
          className={`${styles.callButton} ${styles.revealCta}`}
          href="tel:+998971110808"
          aria-label={t.hero.callAria}
        >
          {t.common.call}
        </a>
      </div>

      <a
        className={`${styles.scrollIndicator} ${styles.revealBottom}`}
        href="#care-details"
        aria-label={t.hero.scrollAria}
      >
        <span>{t.hero.scroll}</span>
        <span className={styles.scrollLine} />
      </a>
    </main>
  );
}

export { HERO_POSTER_SRC, HERO_VIDEO_SRC };
