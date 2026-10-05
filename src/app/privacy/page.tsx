import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { pilotWhatsAppUrl, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How the JakSambung website handles pilot inquiry data and external services.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const inquiryProvider = process.env.NEXT_PUBLIC_INQUIRY_PROVIDER;

  return (
    <main className="legal-page" id="main-content">
      <header className="legal-header"><Link href="/" aria-label="Return to JakSambung home"><BrandMark /></Link><Link href="/">Back to site ↗</Link></header>
      <article className="legal-content">
        <div className="legal-title"><span>Website privacy notice</span><h1>Privacy, in plain language.</h1><p>Last updated: 5 October 2026</p></div>
        <section><h2>About this notice</h2><p>This notice describes how the JakSambung website handles information submitted through our pilot inquiry form. It does not make claims about a future customer deployment, which would require its own agreed data governance and privacy assessment.</p></section>
        <section><h2>Information you provide</h2><p>The inquiry form asks for your name, work email, organization, city, organization type, event context, and pilot objective. We use this information only to understand your request, respond to you, and evaluate whether a pilot conversation is relevant.</p></section>
        <section><h2>How inquiries are delivered</h2><p>{inquiryProvider ? `Website form information is delivered through ${inquiryProvider}, our configured form processor.` : "Production form delivery is not currently configured. The website does not transmit inquiry-form data and offers direct WhatsApp contact instead."}</p></section>
        <section><h2>Retention and deletion</h2><p>We retain inquiry information only while it is useful for the conversation and our legitimate business records. To ask about your information or request deletion, contact Muhammad Jamil using the channel below. We will assess requests according to the laws and obligations that apply.</p></section>
        <section><h2>Analytics and telemetry</h2><p>This initial website does not configure advertising trackers or analytics. If anonymous website telemetry is introduced later, this notice will be updated before it is enabled.</p></section>
        <section><h2>Third-party services</h2><p>Links to LinkedIn and WhatsApp take you to third-party services. Their own privacy notices and terms govern information those services collect. Do not send sensitive personal information through the pilot inquiry or WhatsApp message.</p></section>
        <section><h2>Product privacy principles</h2><p>JakSambung is designed around aggregated and anonymous spatial signals, data minimization, configurable retention, and possible edge processing. No facial recognition is required. These are product architecture principles, not a claim of formal certification.</p></section>
        <section><h2>Contact</h2><p>For privacy questions, contact Muhammad Jamil through <a href={pilotWhatsAppUrl} target="_blank" rel="noreferrer">WhatsApp at {siteConfig.founderWhatsAppDisplay}</a>.</p></section>
      </article>
      <footer className="legal-footer"><span>JakSambung</span><span>From Crowd Flow to City Flow.</span></footer>
    </main>
  );
}
