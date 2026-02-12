const SCRIPTURA_BASE_URL = "https://www.scriptura-api.com";

type DayTextResult = {
  reference: string;
  text: string;
};

function safeString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function extractVerseText(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const data = payload as Record<string, unknown>;

  const direct = [
    data.text,
    data.verse,
    data.content,
    data.daytext,
    data.dayText,
    data.message,
  ].find((value) => typeof value === "string");

  if (typeof direct === "string") {
    return direct;
  }

  if (Array.isArray(data.verses) && data.verses.length > 0) {
    const first = data.verses[0] as Record<string, unknown>;
    if (typeof first?.text === "string") {
      return first.text;
    }
  }

  return null;
}

function parseReference(reference: string) {
  const normalized = reference.trim();
  const match = normalized.match(/^(.+?)\s+(\d+):(\d+)$/);

  if (!match) {
    return null;
  }

  return {
    book: match[1],
    chapter: match[2],
    verse: match[3],
  };
}

export async function fetchDayText(): Promise<DayTextResult | null> {
  try {
    const response = await fetch(`${SCRIPTURA_BASE_URL}/api/daytext`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as Record<string, unknown>;
    const text = extractVerseText(payload);
    const reference =
      safeString(payload.reference) ||
      safeString(payload.ref) ||
      safeString(payload.verse_ref) ||
      "Dagtekst";

    if (!text) {
      return null;
    }

    return { reference, text };
  } catch {
    return null;
  }
}

export async function fetchVerseByReference(reference: string): Promise<string | null> {
  const parsed = parseReference(reference);
  if (!parsed) {
    return null;
  }

  const query = new URLSearchParams({
    book: parsed.book,
    chapter: parsed.chapter,
    verse: parsed.verse,
    version: "statenvertaling",
  });

  try {
    const response = await fetch(`${SCRIPTURA_BASE_URL}/api/verse?${query.toString()}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const payload = await response.json();
    return extractVerseText(payload);
  } catch {
    return null;
  }
}
