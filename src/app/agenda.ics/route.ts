import { getSettings, getUpcomingEvents } from "@/lib/content";
import { siteUrl } from "@/lib/format";

/** iCalendar feed of upcoming events. Visitors can download it or subscribe to it in their calendar app. */

function escape(text: string) {
  return text.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/([,;])/g, "\\$1");
}

function stamp(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** Lines longer than 75 octets must be folded (RFC 5545). */
function fold(line: string) {
  const parts: string[] = [];
  let rest = line;
  while (rest.length > 74) {
    parts.push(rest.slice(0, 74));
    rest = ` ${rest.slice(74)}`;
  }
  parts.push(rest);
  return parts.join("\r\n");
}

async function buildCalendar() {
  "use cache";
  const [events, settings] = await Promise.all([getUpcomingEvents(), getSettings()]);
  const host = new URL(siteUrl()).host;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${settings.name}//Agenda//NL`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escape(`${settings.name} activiteiten`)}`,
    "X-WR-TIMEZONE:Europe/Amsterdam",
  ];
  for (const e of events) {
    if (!e.start) continue;
    const end = e.end ?? new Date(new Date(e.start).getTime() + 2 * 60 * 60 * 1000).toISOString();
    lines.push(
      "BEGIN:VEVENT",
      `UID:${e._id}@${host}`,
      `DTSTAMP:${stamp(e.start)}`,
      `DTSTART:${stamp(e.start)}`,
      `DTEND:${stamp(end)}`,
      `SUMMARY:${escape(e.title)}`,
      ...(e.location ? [`LOCATION:${escape(e.location)}`] : []),
      ...(e.description ? [`DESCRIPTION:${escape(e.description)}`] : []),
      `URL:${siteUrl()}/activiteiten`,
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return lines.map(fold).join("\r\n") + "\r\n";
}

export async function GET() {
  return new Response(await buildCalendar(), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="studuroj-agenda.ics"',
    },
  });
}
