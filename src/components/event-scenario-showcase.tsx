"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { eventScenarioCards, type EventScenarioKind } from "@/data/event-scenarios";

function EventArtwork({ kind, accent, active }: { kind: EventScenarioKind; accent: string; active: boolean }) {
  const reduceMotion = useReducedMotion();
  const loop = reduceMotion || !active ? undefined : { duration: 4.5, repeat: Infinity, ease: "easeInOut" as const };
  const gradientId = `event-gradient-${kind}`;

  return (
    <svg viewBox="0 0 720 520" role="img" aria-label={`Abstract illustration for ${kind} events`}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#54d6d0" />
          <stop offset=".48" stopColor={accent} />
          <stop offset="1" stopColor="#ff5a36" />
        </linearGradient>
        <filter id={`event-glow-${kind}`}><feGaussianBlur stdDeviation="13" /></filter>
      </defs>
      <g className="art-contours">
        {[0, 1, 2, 3, 4].map((line) => (
          <motion.path
            key={line}
            d={`M-30 ${100 + line * 66} C120 ${20 + line * 56}, 215 ${185 + line * 38}, 390 ${95 + line * 62} S650 ${80 + line * 70}, 770 ${145 + line * 55}`}
            animate={active && !reduceMotion ? { pathLength: [0.68, 1, 0.68], opacity: [.22, .55, .22] } : { pathLength: 1, opacity: .28 }}
            transition={{ duration: 5 + line * .5, repeat: Infinity, ease: "easeInOut", delay: line * .18 }}
          />
        ))}
      </g>
      <motion.ellipse cx="365" cy="278" rx="205" ry="160" fill={accent} opacity=".16" filter={`url(#event-glow-${kind})`} animate={active && !reduceMotion ? { rx: [180, 225, 180], opacity: [.1, .2, .1] } : undefined} transition={loop} />

      {kind === "running" && (
        <motion.g className="art-figure" animate={active && !reduceMotion ? { y: [3, -8, 3], rotate: [-1, 1, -1] } : undefined} transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}>
          <circle cx="392" cy="119" r="30" fill={`url(#${gradientId})`} />
          <path d="M374 151 C339 182 328 237 353 278 L407 316 L449 279 L415 239 L441 187 L410 153Z" fill={`url(#${gradientId})`} />
          <path d="M352 179 L276 236 L226 210 L205 232 L280 277 L372 224Z" fill={`url(#${gradientId})`} />
          <path d="M398 306 L333 380 L237 444 L259 475 L371 422 L439 345Z" fill={`url(#${gradientId})`} />
          <path d="M430 301 L492 352 L585 363 L592 399 L475 405 L397 354Z" fill={`url(#${gradientId})`} />
          <path d="M230 441 L180 462 L236 486 L266 474Z" fill={accent} />
          <path d="M583 361 L640 374 L597 407 L578 398Z" fill={accent} />
        </motion.g>
      )}

      {kind === "concert" && (
        <g className="art-concert">
          <motion.path d="M235 66 L340 390 L110 390Z" fill={`url(#${gradientId})`} opacity=".3" animate={active && !reduceMotion ? { opacity: [.15, .5, .15] } : undefined} transition={{ duration: 2.2, repeat: Infinity }} />
          <motion.path d="M485 66 L380 390 L610 390Z" fill={`url(#${gradientId})`} opacity=".3" animate={active && !reduceMotion ? { opacity: [.5, .15, .5] } : undefined} transition={{ duration: 2.2, repeat: Infinity }} />
          <path d="M170 345 H550 V430 H170Z" fill="#132120" stroke={accent} strokeWidth="3" />
          <path d="M235 345 V255 H485 V345M270 255V208H450V255" fill="none" stroke={`url(#${gradientId})`} strokeWidth="8" />
          {[205, 255, 305, 355, 405, 455, 505].map((x, index) => <motion.circle key={x} cx={x} cy={456 - (index % 3) * 8} r="13" fill={index % 2 ? accent : "#54d6d0"} animate={active && !reduceMotion ? { cy: [456 - (index % 3) * 8, 440 - (index % 3) * 8, 456 - (index % 3) * 8] } : undefined} transition={{ duration: .8, repeat: Infinity, delay: index * .09 }} />)}
        </g>
      )}

      {kind === "exhibition" && (
        <motion.g className="art-exhibition" animate={active && !reduceMotion ? { rotateY: [0, 5, 0] } : undefined} transition={loop}>
          <path d="M151 230 L360 112 L571 230 L360 350Z" fill="#132120" stroke={accent} strokeWidth="3" />
          <path d="M151 230 V362 L360 482 V350ZM571 230V362L360 482V350Z" fill="#162a28" stroke={accent} strokeWidth="3" />
          <path d="M225 231 L360 157 L495 231 L360 307Z" fill={`url(#${gradientId})`} opacity=".75" />
          {[0, 1, 2, 3].map((node) => <motion.circle key={node} cx={[214, 507, 278, 442][node]} cy={[322, 322, 389, 389][node]} r="10" fill={node % 2 ? accent : "#54d6d0"} animate={active && !reduceMotion ? { r: [8, 15, 8] } : undefined} transition={{ duration: 1.8, repeat: Infinity, delay: node * .25 }} />)}
        </motion.g>
      )}

      {kind === "company" && (
        <g className="art-company">
          <motion.circle cx="360" cy="270" r="85" fill={`url(#${gradientId})`} opacity=".85" animate={active && !reduceMotion ? { r: [78, 94, 78] } : undefined} transition={loop} />
          {[[-160, -80], [155, -92], [-178, 98], [178, 105], [0, -175], [0, 178]].map(([x, y], index) => (
            <g key={`${x}-${y}`}>
              <motion.path d={`M360 270 L${360 + x} ${270 + y}`} stroke={index % 2 ? accent : "#54d6d0"} strokeWidth="3" strokeDasharray="8 9" animate={active && !reduceMotion ? { strokeDashoffset: [0, -34] } : undefined} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
              <motion.circle cx={360 + x} cy={270 + y} r="20" fill="#132120" stroke={index % 2 ? accent : "#54d6d0"} strokeWidth="4" animate={active && !reduceMotion ? { scale: [1, 1.18, 1] } : undefined} transition={{ duration: 2.4, repeat: Infinity, delay: index * .2 }} />
            </g>
          ))}
          <text x="360" y="278" textAnchor="middle" className="art-company-label">ONE PLAN</text>
        </g>
      )}
    </svg>
  );
}

export function EventScenarioShowcase() {
  const [activeId, setActiveId] = useState<EventScenarioKind>("running");
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [80, -80]);

  return (
    <div className="event-atlas" ref={sectionRef}>
      <motion.div className="atlas-orbit" style={{ y: drift }} aria-hidden="true" />
      <div className="event-card-track">
        {eventScenarioCards.map((card) => {
          const active = activeId === card.id;
          return (
            <motion.article
              layout={!reduceMotion}
              key={card.id}
              className={`event-card event-card-${card.id} ${active ? "is-active" : ""}`}
              style={{ "--event-accent": card.accent } as React.CSSProperties}
              initial={reduceMotion ? false : { opacity: 0, y: 34, scale: .97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: .18 }}
              transition={{ layout: { duration: .58, ease: [0.22, 1, 0.36, 1] } }}
            >
              <button type="button" className="event-card-trigger" aria-expanded={active} onClick={() => setActiveId(card.id)}>
                <span>{card.number}</span><small>{card.descriptor}</small><i aria-hidden="true">{active ? "−" : "+"}</i>
              </button>
              <motion.div
                layout="position"
                className="event-card-art"
                initial={false}
                animate={{ clipPath: active ? "inset(0% 0% 0% 0%)" : "inset(4% 5% 4% 5%)" }}
                transition={{ duration: reduceMotion ? 0 : .55, ease: [0.22, 1, 0.36, 1] }}
              >
                <EventArtwork kind={card.id} accent={card.accent} active={active} />
              </motion.div>
              <motion.div layout="position" className="event-card-title"><span>Event type</span><h3>{card.title}</h3></motion.div>
              <AnimatePresence initial={false}>
                {active && (
                  <motion.div
                    className="event-card-detail"
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                    transition={{ duration: .35, delay: .12 }}
                  >
                    <div className="event-examples">{card.examples.map((example) => <span key={example}>{example}</span>)}</div>
                    <div className="event-operating-model">
                      <div><span>Pressure</span><p>{card.challenge}</p></div>
                      <div><span>JakSambung reads</span><p>{card.signals}</p></div>
                      <div><span>JakSambung orchestrates</span><p>{card.action}</p></div>
                    </div>
                    <div className="event-impact"><span>Modeled impact</span><strong>{card.impact}</strong></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
      <div className="event-marquee" aria-hidden="true">
        <div><span>Running events</span><i>◆</i><span>Concerts</span><i>◆</i><span>Exhibitions</span><i>◆</i><span>Company events</span><i>◆</i><span>City celebrations</span><i>◆</i><span>Festivals</span><i>◆</i></div>
        <div><span>Running events</span><i>◆</i><span>Concerts</span><i>◆</i><span>Exhibitions</span><i>◆</i><span>Company events</span><i>◆</i><span>City celebrations</span><i>◆</i><span>Festivals</span><i>◆</i></div>
      </div>
    </div>
  );
}
