export const siteConfig = {
  name: "JakSambung",
  tagline: "From Crowd Flow to City Flow.",
  description:
    "Privacy-first spatial intelligence to understand, predict, and orchestrate crowd flow across events, public space, transit, and city operations.",
  currentOrigin: "https://jaksambung.vercel.app",
  plannedOrigin: "https://jaksambung.site",
  privacyPath: "/privacy",
  founderWhatsApp: "6281219561519",
  founderWhatsAppDisplay: "+62 812-1956-1519",
  foundingTeam: [
    {
      name: "Muhammad Jamil",
      linkedIn: "https://www.linkedin.com/in/jamilmuhammad/",
    },
    {
      name: "Muhammad Luthfi Arifin",
      linkedIn: "https://www.linkedin.com/in/luthfiarifin/",
    },
    {
      name: "Tri Anggi Anggara Saputra",
      linkedIn: "https://www.linkedin.com/in/trianggianggara/",
    },
  ],
} as const;

export const activeOrigin =
  process.env.NEXT_PUBLIC_SITE_URL || siteConfig.currentOrigin;

export const pilotWhatsAppUrl = `https://wa.me/${siteConfig.founderWhatsApp}?text=${encodeURIComponent(
  "Hello JakSambung, I would like to discuss a city-scale event pilot.",
)}`;
