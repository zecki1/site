"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TextTranslator from './TextTranslator';

const MarqueeItem = ({ children, baseVelocity }: { children: React.ReactNode; baseVelocity: number }) => {
  const { scrollY } = useScroll();
  // Ajuste a velocidade da transformação para ser mais sutil
  const x = useTransform(scrollY, [0, 5000], [0, 200 * baseVelocity], { clamp: false });

  return (
    <motion.div
      className="flex-shrink-0 flex items-center justify-center whitespace-nowrap px-8"
      style={{ x }}
    >
      {children}
    </motion.div>
  );
};

const ColorChangingMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: marqueeRef,
    offset: ['start end', 'end start'],
  });

  // Interpolação suave entre as cores do tema
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['hsl(var(--background))', 'hsl(var(--primary))', 'hsl(var(--background))']
  );
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['hsl(var(--foreground))', 'hsl(var(--primary-foreground))', 'hsl(var(--foreground))']
  );

  const marqueeItems = [
    "SEO", "CMS Personalizado", "Engajamento", "Tratamento de Imagens",
    "Performance", "Responsividade", "Escalabilidade", "UX/UI Design",
    "Acessibilidade", "Segurança"
  ];

  return (
    <motion.section
      ref={marqueeRef}
      style={{ backgroundColor }}
      className="py-16 md:py-24 overflow-hidden"
    >
      <div className="flex">
        {[...Array(4)].map((_, i) => (
          <MarqueeItem key={i} baseVelocity={i % 2 === 0 ? 1 : -1}>
            <motion.span
              style={{ color: textColor }}
              className="text-4xl md:text-6xl font-bold tracking-tighter"
            >
              {marqueeItems.map(item => (
                <React.Fragment key={item}>
                  <TextTranslator>
                    {{
                      ptBR: item,
                      en: item.replace(/ /g, ''), // Simple transformation for example
                      es: item.replace('mento', 'miento').replace('de', 'de').replace('sivo', 'siva')
                    }}
                  </TextTranslator>
                  <span className="mx-4 text-cyan-400">•</span>
                </React.Fragment>
              ))}
            </motion.span>
          </MarqueeItem>
        ))}
      </div>
    </motion.section>
  );
};

export default ColorChangingMarquee;