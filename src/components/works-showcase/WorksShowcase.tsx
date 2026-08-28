"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./WorksShowcase.module.css";

type WorkCase = {
  id: string;
  media: string;
  poster?: string;
  mediaType: "image" | "video";
  instagramUrl: string;
};

const WORK_CASES: WorkCase[] = [
  {
    id: "01",
    media: "/media/works/bentley.mp4",
    poster: "/media/works/bentley-poster.png",
    mediaType: "video",
    instagramUrl: "https://www.instagram.com/p/Db_bSnoR_ig/",
  },
  {
    id: "02",
    media: "/media/works/work-02-clean.jpg",
    mediaType: "image",
    instagramUrl: "https://www.instagram.com/p/Dbuk5XmMVSg/",
  },
  {
    id: "03",
    media: "/media/works/work-03-clean.jpg",
    mediaType: "image",
    instagramUrl: "https://www.instagram.com/p/DcQbiUXIbRG/",
  },
];

export function WorksShowcase() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  const activeCase = WORK_CASES[activeIndex];
  const caseCopies = [t.works.cases.case01, t.works.cases.case02, t.works.cases.case03];
  const activeCopy = caseCopies[activeIndex];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "160px 0px", threshold: 0.08 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [activeIndex, isInView]);

  useEffect(
    () => () => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    },
    [],
  );

  function selectCase(index: number) {
    if (index === activeIndex || isSwitching) return;
    setIsSwitching(true);

    transitionTimer.current = setTimeout(() => {
      setActiveIndex(index);
      setIsSwitching(false);
    }, 320);
  }

  return (
    <section ref={sectionRef} id="works" className={styles.section} aria-labelledby="works-title">
      <div className={styles.transition} aria-hidden="true" />

      <div className={styles.heading}>
        <p className={styles.sectionLabel} data-motion="up">{t.works.label}</p>
        <h2 id="works-title" className={styles.title} data-motion="up" style={{ "--motion-delay": "90ms" } as React.CSSProperties}>
          {t.works.title[0]}
          <br />
          {t.works.title[1]}
          <br />
          {t.works.title[2]}
        </h2>
        <p className={styles.supporting} data-motion="up" style={{ "--motion-delay": "180ms" } as React.CSSProperties}>
          {t.works.supporting[0]}
          <br />
          {t.works.supporting[1]}
          <br />
          {t.works.supporting[2]}
        </p>
      </div>

      <div className={styles.caseLayout}>
        <div data-motion="media" style={{ "--motion-delay": "120ms" } as React.CSSProperties} className={`${styles.media} ${isSwitching ? styles.mediaSwitching : ""}`}>
          {activeCase.mediaType === "video" ? (
            <video
              key={activeCase.id}
              ref={videoRef}
              className={styles.mediaElement}
              src={activeCase.media}
              poster={activeCase.poster}
              muted
              playsInline
              loop
              preload="metadata"
              aria-label="Видео реальной работы с Bentley Bentayga"
            />
          ) : (
            <Image
              key={activeCase.id}
              className={styles.mediaElement}
              src={activeCase.media}
              alt={`BUGATTI CAR WASH & SPA — ${activeCopy.title}`}
              fill
              sizes="(max-width: 900px) 100vw, 64vw"
            />
          )}
          <div className={styles.mediaShade} aria-hidden="true" />
          {activeCase.mediaType === "image" ? (
            <a
              className={styles.playControl}
              href={activeCase.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.works.openAria}
            >
              <span aria-hidden="true">▶</span>
            </a>
          ) : null}
        </div>

        <div data-motion="up" style={{ "--motion-delay": "260ms" } as React.CSSProperties} className={`${styles.caseInfo} ${isSwitching ? styles.infoSwitching : ""}`}>
          <p className={styles.caseEyebrow}>{activeCopy.eyebrow}</p>
          <h3 className={styles.caseTitle}>{activeCopy.title}</h3>
          <span className={styles.divider} aria-hidden="true" />
          <p className={styles.description}>
            {activeCopy.description.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <a
            className={styles.caseLink}
            href={activeCase.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.works.watch} <span aria-hidden="true">→</span>
          </a>

          <div className={styles.controls} aria-label="Выбор работы">
            {WORK_CASES.map((work, index) => (
              <button
                key={work.id}
                type="button"
                className={`${styles.control} ${index === activeIndex ? styles.controlActive : ""}`}
                onClick={() => selectCase(index)}
                aria-label={`${t.works.selectAria} ${work.id} / ${WORK_CASES.length}`}
                aria-pressed={index === activeIndex}
              >
                {work.id} / 03
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
