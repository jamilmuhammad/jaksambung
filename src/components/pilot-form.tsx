"use client";

import { FormEvent, useState } from "react";
import { pilotWhatsAppUrl, siteConfig } from "@/config/site";

type FormStatus = "idle" | "sending" | "success" | "demo" | "error";

export function PilotForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const endpoint = process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT;
  const provider = process.env.NEXT_PUBLIC_INQUIRY_PROVIDER;
  const hasSecureEndpoint = Boolean(endpoint?.startsWith("https://") && provider);
  const deliveryEnabled = process.env.NODE_ENV !== "production" || hasSecureEndpoint;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const payload = Object.fromEntries(new FormData(form).entries());
    if (payload.companyWebsite) return;

    if (!hasSecureEndpoint || !endpoint) {
      setStatus("demo");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Submission was not confirmed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (!deliveryEnabled) {
    return (
      <div className="form-unavailable">
        <span>Pilot inquiry delivery is not configured yet.</span>
        <p>No form data will be collected. Start the conversation directly with Muhammad Jamil through WhatsApp.</p>
        <a className="button button-signal" href={pilotWhatsAppUrl} target="_blank" rel="noreferrer">
          Open WhatsApp at {siteConfig.founderWhatsAppDisplay}<span aria-hidden="true">↗</span>
        </a>
        <p className="third-party-note">Opens the third-party WhatsApp service.</p>
      </div>
    );
  }

  return (
    <form className="pilot-form" onSubmit={submit}>
      <div className="form-grid">
        <label>Name<input name="name" autoComplete="name" required /></label>
        <label>Work email<input name="email" type="email" autoComplete="email" required /></label>
        <label>Organization<input name="organization" autoComplete="organization" required /></label>
        <label>City<input name="city" autoComplete="address-level2" required /></label>
        <label>Organization type
          <select name="customerType" required defaultValue="">
            <option value="" disabled>Select one</option>
            <option>Event organizer</option><option>Venue operator</option>
            <option>Mobility operator</option><option>City authority</option><option>Other</option>
          </select>
        </label>
        <label>Event context<input name="eventType" placeholder="Marathon, concert, district..." required /></label>
      </div>
      <label>Pilot objective<textarea name="objective" rows={4} placeholder="What movement challenge should we explore?" required /></label>
      <label className="honeypot" aria-hidden="true">Website<input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label>
      <div className="form-footer">
        <p>By contacting us, you acknowledge our <a href="/privacy">privacy notice</a>.</p>
        <button className="button button-signal" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Start a pilot conversation"}<span aria-hidden="true">↗</span>
        </button>
      </div>
      <div className="form-status" role="status">
        {status === "demo" && <>Demo mode: no inquiry was transmitted. Contact us directly on <a href={pilotWhatsAppUrl} target="_blank" rel="noreferrer">WhatsApp at {siteConfig.founderWhatsAppDisplay}</a>.</>}
        {status === "success" && "Your inquiry was received. We will continue the conversation soon."}
        {status === "error" && <>Delivery was not confirmed. Please retry or contact us on <a href={pilotWhatsAppUrl} target="_blank" rel="noreferrer">WhatsApp</a>.</>}
      </div>
      {hasSecureEndpoint && <p className="processor-note">Inquiry delivery is processed by {provider}.</p>}
    </form>
  );
}
