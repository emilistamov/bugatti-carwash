"use client";

import Image from "next/image";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./Footer.module.css";

export function Footer() {
  const { t } = useI18n();
  const navigation = [
    { label: t.footer.home, href: "#" },
    { label: t.footer.services, href: "#service-configurator" },
    { label: t.footer.works, href: "#works" },
  ];

  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.columns}>
          <a className={styles.brand} data-motion="fade" href="#" aria-label={t.footer.homeAria}>
            <Image
              src="/images/hero/logo.svg"
              alt="BUGATTI CARWASH & SPA"
              width={168}
              height={124}
            />
          </a>

          <nav className={styles.column} data-motion="up" style={{ "--motion-delay": "80ms" } as React.CSSProperties} aria-label={t.footer.navigationAria}>
            <p className={styles.label}>{t.footer.navigation}</p>
            <ul className={styles.list}>
              {navigation.map((item) => (
                <li key={item.label}>
                  <a className={styles.navLink} href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={`${styles.column} ${styles.contacts}`} data-motion="up" style={{ "--motion-delay": "150ms" } as React.CSSProperties}>
            <p className={styles.label}>{t.footer.contact}</p>

            <div className={styles.contactGroup}>
              <p className={styles.contactType}>{t.footer.phone}</p>
              <a className={styles.contactLink} href="tel:+998971110808">
                +998 97 111 08 08
              </a>
            </div>

            <div className={styles.contactGroup}>
              <p className={styles.contactType}>INSTAGRAM</p>
              <a
                className={styles.contactLink}
                href="https://www.instagram.com/bugatti_carwash/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @bugatti_carwash
              </a>
            </div>

            <div className={styles.contactGroup}>
              <p className={styles.contactType}>TELEGRAM</p>
              <p className={styles.contactValue}>+998 97 111 08 08</p>
            </div>
          </div>

          <div className={`${styles.column} ${styles.cityColumn}`} data-motion="up" style={{ "--motion-delay": "220ms" } as React.CSSProperties}>
            <p className={styles.label}>{t.footer.cityLabel}</p>
            <p className={styles.city}>{t.common.city}</p>
          </div>
        </div>

        <div className={styles.bottom} data-motion="fade" style={{ "--motion-delay": "280ms" } as React.CSSProperties}>
          <p>{t.footer.bottom}</p>
        </div>
      </div>
    </footer>
  );
}
