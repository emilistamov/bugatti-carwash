"use client";

import { useI18n } from "@/i18n/I18nProvider";
import styles from "./FinalCta.module.css";

export function FinalCta() {
  const { t } = useI18n();
  return (
    <section id="final-cta" className={styles.section} aria-labelledby="final-cta-title">
      <div className={styles.inner}>
        <p className={styles.eyebrow} data-motion="up">{t.finalCta.eyebrow}</p>

        <div className={styles.content}>
          <h2 id="final-cta-title" className={styles.title} data-motion="up" style={{ "--motion-delay": "100ms" } as React.CSSProperties}>
            {t.finalCta.title[0]}
            <br />
            {t.finalCta.title[1]}
          </h2>

          <p className={styles.supportingText} data-motion="up" style={{ "--motion-delay": "210ms" } as React.CSSProperties}>
            {t.finalCta.supporting}
          </p>

          <a
            className={styles.callButton}
            data-motion="up"
            style={{ "--motion-delay": "310ms" } as React.CSSProperties}
            href="tel:+998971110808"
            aria-label={t.hero.callAria}
          >
            {t.common.call}
          </a>

          <span className={styles.verticalLine} data-motion="line" style={{ "--motion-delay": "420ms" } as React.CSSProperties} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
