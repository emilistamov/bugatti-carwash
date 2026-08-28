"use client";

import Image from "next/image";
import { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./ServiceConfigurator.module.css";

type VehicleType = {
  id: "sedan" | "crossover" | "jeep";
  number: string;
  price: number;
  media: string;
};

const vehicleTypes: VehicleType[] = [
  {
    id: "sedan",
    number: "01",
    price: 200_000,
    media: "/images/bugatti-story/heritage.png",
  },
  {
    id: "crossover",
    number: "02",
    price: 250_000,
    media: "/images/configurator/crossover-suv.png",
  },
  {
    id: "jeep",
    number: "03",
    price: 300_000,
    media: "/images/configurator/jeep-g-class.png",
  },
];

const dryFogPrice = 50_000;

function formatPrice(price: number) {
  return new Intl.NumberFormat("ru-RU").format(price).replace(/\u00a0/g, " ");
}

export function ServiceConfigurator() {
  const { t } = useI18n();
  const [selectedId, setSelectedId] = useState<VehicleType["id"]>("sedan");
  const [dryFogEnabled, setDryFogEnabled] = useState(false);

  const selectedVehicle =
    vehicleTypes.find((vehicle) => vehicle.id === selectedId) ?? vehicleTypes[0];
  const totalPrice = selectedVehicle.price + (dryFogEnabled ? dryFogPrice : 0);
  const selectedCopy = t.config.vehicles[selectedVehicle.id];

  return (
    <section id="service-configurator" className={styles.section} aria-labelledby="configurator-title">
      <div className={styles.inner}>
        <header className={styles.header} data-motion="up">
          <div>
            <p className={styles.eyebrow}>{t.config.eyebrow}</p>
            <h2 id="configurator-title" className={styles.title}>
              {t.config.title[0]}
              <br />
              {t.config.title[1]}
            </h2>
          </div>
          <p className={styles.intro}>
            {t.config.intro}
          </p>
        </header>

        <div className={styles.tabs} data-motion="up" style={{ "--motion-delay": "120ms" } as React.CSSProperties} role="tablist" aria-label={t.config.categoryAria}>
          {vehicleTypes.map((vehicle) => {
            const isSelected = vehicle.id === selectedId;
            return (
              <button
                key={vehicle.id}
                id={`vehicle-tab-${vehicle.id}`}
                className={styles.tab}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls="vehicle-configuration"
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setSelectedId(vehicle.id)}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                  event.preventDefault();
                  const currentIndex = vehicleTypes.findIndex((item) => item.id === selectedId);
                  const direction = event.key === "ArrowRight" ? 1 : -1;
                  const nextIndex = (currentIndex + direction + vehicleTypes.length) % vehicleTypes.length;
                  setSelectedId(vehicleTypes[nextIndex].id);
                  document.getElementById(`vehicle-tab-${vehicleTypes[nextIndex].id}`)?.focus();
                }}
              >
                <span>{vehicle.number}</span>
                {t.config.vehicles[vehicle.id].label}
              </button>
            );
          })}
        </div>

        <div
          id="vehicle-configuration"
          className={styles.configuration}
          data-motion="up"
          style={{ "--motion-delay": "180ms" } as React.CSSProperties}
          role="tabpanel"
          aria-labelledby={`vehicle-tab-${selectedVehicle.id}`}
        >
          <div className={styles.media} key={selectedVehicle.id}>
            <Image
              className={`${styles.image} ${
                selectedVehicle.id === "crossover"
                  ? styles.crossoverImage
                  : selectedVehicle.id === "jeep"
                    ? styles.jeepImage
                    : ""
              }`}
              src={selectedVehicle.media}
              alt={selectedCopy.alt}
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
            />
            <div className={styles.mediaShade} aria-hidden="true" />
            <p className={styles.mediaCaption}>
              {selectedVehicle.number} / {selectedCopy.label}
            </p>
          </div>

          <div className={styles.details} key={`${selectedVehicle.id}-${dryFogEnabled}`}>
            <div className={styles.priceBlock} aria-live="polite" aria-atomic="true">
              <p className={styles.selectedLabel}>{t.config.selected} / {selectedCopy.label}</p>
              <p className={styles.price}>{formatPrice(totalPrice)}</p>
              <p className={styles.currency}>{t.common.currency}</p>
            </div>

            <h3 className={styles.serviceTitle}>{t.config.serviceTitle}</h3>

            <div className={styles.included}>
              <p className={styles.metaLabel}>{t.config.included}</p>
              <div className={styles.includedItems}>
                <span>{t.config.interiorCleaning}</span>
                <span className={styles.plus}>+</span>
                <span>{t.config.wheelCleaning}</span>
              </div>
            </div>

            <div className={styles.option}>
              <div>
                <p className={styles.optionLabel}>{t.config.extra}</p>
                <p className={styles.optionName}>{t.config.dryFog}</p>
              </div>
              <div className={styles.optionAction}>
                <p>+{formatPrice(dryFogPrice)} {t.common.currency}</p>
                <button
                  className={styles.switch}
                  type="button"
                  role="switch"
                  aria-checked={dryFogEnabled}
                  aria-label={t.config.addDryFogAria}
                  onClick={() => setDryFogEnabled((current) => !current)}
                >
                  <span className={styles.switchText}>
                    {dryFogEnabled ? t.config.added : t.config.add}
                  </span>
                  <span className={styles.switchTrack} aria-hidden="true">
                    <span className={styles.switchThumb} />
                  </span>
                </button>
              </div>
            </div>

            <a className={styles.callButton} href="tel:+998971110808">
              {t.common.call}
            </a>
            <a className={styles.phone} href="tel:+998971110808">
              +998 97 111 08 08
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
