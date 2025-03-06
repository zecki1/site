"use client";

import React from "react";
import TextTranslator from "@/components/TextTranslator";
import styles from "./Mouse.module.css";

const Mouse: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mouse}>
        <div className={styles.scrollWheel}></div>
      </div>
      <span className={styles.text}>
        <TextTranslator>
          {{
            ptBR: <>Role para baixo</>,
            en: <>Scroll down</>,
            es: <>Desplázate hacia abajo</>,
          }}
        </TextTranslator>
      </span>
    </div>
  );
};

export default Mouse;