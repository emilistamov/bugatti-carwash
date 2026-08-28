"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./BugattiStory.module.css";

export function BugattiStory() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const engineeringRef = useRef<HTMLElement>(null);
  const masteryRef = useRef<HTMLElement>(null);
  const interiorRef = useRef<HTMLElement>(null);
  const tourbillonRef = useRef<HTMLElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [engineeringVisible, setEngineeringVisible] = useState(false);
  const [masteryVisible, setMasteryVisible] = useState(false);
  const [interiorVisible, setInteriorVisible] = useState(false);
  const [tourbillonVisible, setTourbillonVisible] = useState(false);
  const [closingVisible, setClosingVisible] = useState(false);
  const [activeCarIndex, setActiveCarIndex] = useState(0);
  const [galleryPhase, setGalleryPhase] = useState<"idle" | "out" | "in">("idle");
  const galleryTimersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  const galleryCars = [
    {
      title: "TOURBILLON",
      image: "/images/bugatti-story/tourbillon-rear.png",
      description: t.story.tourbillonCopy,
      fit: "cover",
    },
    {
      title: "CHIRON",
      image: "/images/bugatti/chiron-blue-reflective-1300328.jpg",
      description: "Сочетание мощности, инженерии и выразительной формы в одном из самых узнаваемых гиперкаров Bugatti.",
      fit: "contain",
    },
    {
      title: "VEYRON",
      image: "/images/bugatti/veyron-blue-silver-888834.jpg",
      description: "Автомобиль, который изменил представление о скорости и возможностях серийного гиперкара.",
      fit: "contain",
    },
  ];
  const activeCar = galleryCars[activeCarIndex];
  const nextCarIndex = (activeCarIndex + 1) % galleryCars.length;
  const nextCar = galleryCars[nextCarIndex];

  const selectGalleryCar = (index: number) => {
    if (galleryPhase !== "idle" || index === activeCarIndex) return;

    setGalleryPhase("out");
    galleryTimersRef.current = [
      setTimeout(() => {
        setActiveCarIndex(index);
        setGalleryPhase("in");
      }, 280),
      setTimeout(() => setGalleryPhase("idle"), 880),
    ];
  };

  const showNextCar = () => selectGalleryCar(nextCarIndex);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12%", threshold: 0.08 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => {
    galleryTimersRef.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const chapters = [
      { element: engineeringRef.current, reveal: () => setEngineeringVisible(true) },
      { element: masteryRef.current, reveal: () => setMasteryVisible(true) },
      { element: interiorRef.current, reveal: () => setInteriorVisible(true) },
      { element: tourbillonRef.current, reveal: () => setTourbillonVisible(true) },
      { element: closingRef.current, reveal: () => setClosingVisible(true) },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const chapter = chapters.find(({ element }) => element === entry.target);
          chapter?.reveal();
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.12 },
    );

    chapters.forEach(({ element }) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="bugatti-world"
      className={`${styles.section} ${isVisible ? styles.visible : ""}`}
      aria-labelledby="bugatti-world-title"
    >
      <div className={styles.transition} aria-hidden="true" />

      <div className={styles.intro}>
        <p className={`${styles.label} ${styles.reveal}`}>{t.story.label}</p>
        <h2 id="bugatti-world-title" className={`${styles.sectionTitle} ${styles.reveal}`}>
          {t.story.title}
        </h2>
        <p className={`${styles.editorialTitle} ${styles.reveal}`}>
          {t.story.editorial[0]}
          <br />
          {t.story.editorial[1]}
        </p>
        <p className={`${styles.supporting} ${styles.reveal}`}>
          {t.story.supporting}
        </p>
      </div>

      <article className={`${styles.chapter} ${styles.reveal}`} aria-labelledby="heritage-title">
        <Image
          className={styles.chapterImage}
          src="/images/bugatti-story/heritage.png"
          alt="Bugatti Tourbillon, вид спереди и сверху"
          fill
          sizes="(max-width: 768px) 100vw, calc(100vw - 128px)"
        />
        <div className={styles.imageShade} aria-hidden="true" />

        <div className={styles.chapterCopy}>
          <p className={styles.chapterNumber}>01</p>
          <h3 id="heritage-title" className={styles.chapterTitle}>
            {t.story.heritage.title}
          </h3>
          <p className={styles.chapterPlaceholder}>
            {t.story.heritage.copy[0]}
            <br />
            {t.story.heritage.copy[1]}
          </p>
        </div>
      </article>

      <article
        ref={engineeringRef}
        className={`${styles.engineering} ${styles.viewportChapter} ${engineeringVisible ? styles.chapterVisible : ""}`}
        aria-labelledby="engineering-title"
      >
        <div className={`${styles.engineeringCopy} ${styles.chapterReveal}`}>
          <p className={styles.engineeringNumber}>02</p>
          <h3 id="engineering-title" className={styles.editorialLabel}>
            {t.story.engineering.title}
          </h3>
          <p className={styles.editorialCopy}>
            {t.story.engineering.copy[0]}
            <br />
            {t.story.engineering.copy[1]}
          </p>
          <span className={styles.goldAxis} aria-hidden="true" />
        </div>

        <div className={`${styles.engineeringMedia} ${styles.mediaReveal}`}>
          <Image
            className={styles.editorialImage}
            src="/images/bugatti-story/engineering.png"
            alt="Колесо Bugatti и деталь кузова из углеволокна"
            fill
            sizes="(max-width: 900px) 100vw, 63vw"
          />
        </div>
      </article>

      <article
        ref={masteryRef}
        className={`${styles.mastery} ${styles.viewportChapter} ${masteryVisible ? styles.chapterVisible : ""}`}
        aria-labelledby="mastery-title"
      >
        <div className={`${styles.masteryMedia} ${styles.mediaReveal}`}>
          <Image
            className={styles.editorialImage}
            src="/images/bugatti-story/mastery.png"
            alt="Драматичный крупный план передней части Bugatti"
            fill
            sizes="(max-width: 900px) 100vw, 80vw"
          />
        </div>

        <div className={`${styles.masteryCopy} ${styles.chapterReveal}`}>
          <p className={styles.masteryNumber}>03</p>
          <h3 id="mastery-title" className={styles.editorialLabel}>
            {t.story.mastery.title}
          </h3>
          <p className={styles.editorialCopy}>
            {t.story.mastery.copy[0]}
            <br />
            {t.story.mastery.copy[1]}
          </p>
        </div>

        <div className={`${styles.detailMedia} ${styles.detailReveal}`}>
          <Image
            className={styles.editorialImage}
            src="/images/bugatti-story/mastery-detail.png"
            alt="Крупный план кузовного элемента с эмблемой EB"
            fill
            sizes="(max-width: 900px) 55vw, 28vw"
          />
        </div>
      </article>

      <article
        ref={interiorRef}
        className={`${styles.interior} ${styles.viewportChapter} ${interiorVisible ? styles.chapterVisible : ""}`}
        aria-labelledby="interior-title"
      >
        <h3 id="interior-title" className={`${styles.interiorLabel} ${styles.chapterReveal}`}>
          04 / {t.story.interior.title}
        </h3>
        <p className={`${styles.interiorNumber} ${styles.chapterReveal}`}>04</p>

        <div className={`${styles.interiorMedia} ${styles.mediaReveal}`}>
          <Image
            className={styles.editorialImage}
            src="/images/bugatti-story/interior.png"
            alt="Широкий вид кокпита и интерьера Bugatti"
            fill
            sizes="(max-width: 900px) 100vw, calc(100vw - 128px)"
          />
          <div className={styles.interiorFade} aria-hidden="true" />
          <p className={styles.interiorCopy}>
            {t.story.interior.copy}
          </p>
        </div>
      </article>

      <article
        ref={tourbillonRef}
        className={`${styles.tourbillon} ${styles.viewportChapter} ${tourbillonVisible ? styles.chapterVisible : ""} ${galleryPhase === "out" ? styles.galleryOut : ""} ${galleryPhase === "in" ? styles.galleryIn : ""}`}
        aria-labelledby="tourbillon-title"
      >
        <div className={`${styles.tourbillonMedia} ${styles.mediaReveal}`}>
          <Image
            className={`${styles.editorialImage} ${styles.galleryCarImage} ${activeCar.fit === "contain" ? styles.galleryContainedImage : ""}`}
            src={activeCar.image}
            alt={`Bugatti ${activeCar.title}`}
            fill
            sizes="(max-width: 900px) 100vw, 68vw"
          />
        </div>

        <div className={`${styles.tourbillonCopy} ${styles.chapterReveal}`}>
          <p className={styles.tourbillonLabel}>05 / {activeCar.title}</p>
          <h3 id="tourbillon-title" className={styles.tourbillonTitle}>
            {activeCar.title}
          </h3>
          <p className={styles.tourbillonPlaceholder}>
            {activeCar.description}
          </p>
          <span className={styles.tourbillonDivider} aria-hidden="true" />
          <div className={styles.modelNavigation} aria-label="Выбор модели Bugatti">
            {galleryCars.map((car, index) => (
              <button
                key={car.title}
                className={`${styles.modelNavigationItem} ${index === activeCarIndex ? styles.modelNavigationItemActive : ""}`}
                type="button"
                onClick={() => selectGalleryCar(index)}
                disabled={galleryPhase !== "idle" || index === activeCarIndex}
                aria-pressed={index === activeCarIndex}
              >
                <span>0{index + 1}</span> / {car.title}
              </button>
            ))}
          </div>
        </div>

        <div className={`${styles.tourbillonPreviewGroup} ${styles.detailReveal}`}>
          <button
            className={styles.tourbillonDetail}
            type="button"
            onClick={showNextCar}
            disabled={galleryPhase !== "idle"}
            aria-label={`Показать Bugatti ${nextCar.title}`}
          >
            <Image
              className={`${styles.editorialImage} ${styles.galleryCarImage} ${nextCar.fit === "contain" ? styles.galleryContainedImage : ""}`}
              src={nextCar.image}
              alt={`Bugatti ${nextCar.title}`}
              fill
              sizes="(max-width: 900px) 70vw, 300px"
            />
          </button>
          <p className={styles.nextCarLabel}>NEXT / {nextCar.title}</p>
        </div>
      </article>

      <div
        ref={closingRef}
        className={`${styles.closing} ${closingVisible ? styles.chapterVisible : ""}`}
        aria-label="Завершение истории Bugatti"
      >
        <div className={`${styles.closingIntro} ${styles.chapterReveal}`}>
          <span className={styles.closingRule} aria-hidden="true" />
          <p>{t.story.closingLabel}</p>
        </div>
        <p className={`${styles.closingStatement} ${styles.mediaReveal}`}>
          {t.story.closing[0]}
          <br />
          {t.story.closing[1]}
          <br />
          {t.story.closing[2]}
        </p>
      </div>
    </section>
  );
}
