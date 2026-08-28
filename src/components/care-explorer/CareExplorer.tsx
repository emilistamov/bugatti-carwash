"use client";

import Image from "next/image";
import { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./CareExplorer.module.css";

type ZoneId = "body" | "wheels" | "glass" | "interior";

type Zone = {
  id: ZoneId;
  number: string;
  side: "left" | "right";
};

const zones: Zone[] = [
  { id: "body", number: "01", side: "left" },
  { id: "wheels", number: "02", side: "left" },
  { id: "glass", number: "03", side: "left" },
  { id: "interior", number: "04", side: "right" },
];

export function CareExplorer() {
  const { t } = useI18n();
  const [activeId, setActiveId] = useState<ZoneId>("wheels");
  const activeZone = zones.find((zone) => zone.id === activeId) ?? zones[1];

  return (
    <section className={styles.section} id="care-details" aria-labelledby="care-details-title" data-node-id="200:233">
      <Image className={styles.vehicle} data-motion="media" src="/images/tourbillon/tourbillon.png" alt="Bugatti Tourbillon в тёмной студии" fill sizes="100vw" />
      <div className={styles.heroFade} aria-hidden="true" />

      <header className={styles.heading}>
        <p className={styles.eyebrow} data-motion="up">{t.care.eyebrow}</p>
        <h2 id="care-details-title" data-motion="up" style={{ "--motion-delay": "90ms" } as React.CSSProperties}>{t.care.title}</h2>
        <p className={styles.subtitle} data-motion="up" style={{ "--motion-delay": "170ms" } as React.CSSProperties}>{t.care.subtitle}</p>
      </header>

      <p className={styles.mode}>{t.care.mode}</p>

      <div className={styles.hotspots} aria-label="Зоны ухода за автомобилем">
        {zones.map((zone) => {
          const isActive = zone.id === activeId;
          const zoneCopy = t.care.zones[zone.id];
          return (
            <button
              className={`${styles.hotspot} ${styles[zone.id]} ${styles[zone.side]} ${isActive ? styles.active : ""}`}
              key={zone.id}
              type="button"
              aria-pressed={isActive}
              aria-label={`${zone.number} — ${zoneCopy.name}`}
              data-motion="fade"
              style={{ "--motion-delay": `${260 + zones.indexOf(zone) * 70}ms` } as React.CSSProperties}
              onClick={() => setActiveId(zone.id)}
            >
              {zone.side === "right" ? <span className={styles.hotspotLabel}>{zone.number}&nbsp;&nbsp;{zoneCopy.name}</span> : null}
              <span className={styles.leader} aria-hidden="true" />
              <span className={styles.point} aria-hidden="true"><span /></span>
              {zone.side === "left" ? <span className={styles.hotspotLabel}>{zone.number}&nbsp;&nbsp;{zoneCopy.name}</span> : null}
            </button>
          );
        })}
      </div>

      <aside className={styles.panel} data-motion="up" style={{ "--motion-delay": "420ms" } as React.CSSProperties} aria-live="polite" aria-atomic="true">
        <div className={styles.panelContent} key={activeZone.id}>
          <p className={styles.panelLabel}>{t.care.panelLabel}&nbsp;&nbsp;/&nbsp;&nbsp;{activeZone.number}</p>
          <h3>{t.care.zones[activeZone.id].name}</h3>
          <p className={styles.panelDescription}>{t.care.zones[activeZone.id].description}</p>
          <p className={styles.panelHint}>{t.care.panelHint}</p>
        </div>
      </aside>

      <p className={styles.bottomInstruction}>{t.care.instruction}</p>
      <p className={styles.bottomCount}>{t.care.count}</p>
    </section>
  );
}
