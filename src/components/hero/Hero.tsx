import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import styles from "./Hero.module.css";

const HERO_VIDEO_SRC = "/videos/hero.mp4";
const HERO_POSTER_SRC = "/images/hero/poster.png";

function hasHeroVideo() {
  return existsSync(join(process.cwd(), "public", HERO_VIDEO_SRC));
}

export function Hero() {
  const videoAvailable = hasHeroVideo();

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
        {videoAvailable ? (
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
        ) : null}
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
        <span>ТАШКЕНТ</span>
        <span>МЕНЮ&nbsp;&nbsp;—</span>
      </nav>

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
          Премиальный выездной уход за автомобилем в Ташкенте
        </p>
        <a
          className={`${styles.callButton} ${styles.revealCta}`}
          href="tel:+998971110808"
          aria-label="Позвонить в Bugatti Carwash & Spa по номеру +998 97 111 08 08"
        >
          ПОЗВОНИТЬ
        </a>
      </div>

      <div className={`${styles.videoStatus} ${styles.revealBottom}`}>
        <Image src="/images/hero/video-status-dot.svg" alt="" width={6} height={6} aria-hidden="true" />
        <span>ВИДЕОФОН · БЕЗ ЗВУКА · ПО КРУГУ</span>
      </div>

      <div className={`${styles.scrollIndicator} ${styles.revealBottom}`} aria-hidden="true">
        <span>СМОТРЕТЬ ДАЛЬШЕ</span>
        <span className={styles.scrollLine} />
      </div>
    </main>
  );
}

export { HERO_POSTER_SRC, HERO_VIDEO_SRC };
