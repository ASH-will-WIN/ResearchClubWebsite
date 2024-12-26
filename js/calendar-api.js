const CALENDAR_ID = CONFIG.CALENDAR_ID;
const API_KEY = CONFIG.API_KEY;

async function getCalendarEvents(timeMin, timeMax, maxResults = null) {
  // If no timeMin provided, use current date
  if (!timeMin) {
    const now = new Date();
    // Set to start of day in local timezone
    now.setHours(0, 0, 0, 0);
    timeMin = now.toISOString();
  }

  let url =
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
      CALENDAR_ID
    )}/events?` +
    `key=${API_KEY}` +
    `&timeMin=${encodeURIComponent(timeMin)}` +
    (timeMax ? `&timeMax=${encodeURIComponent(timeMax)}` : "") +
    (maxResults ? `&maxResults=${maxResults}` : "") +
    `&orderBy=startTime` +
    `&singleEvents=true` +
    `&timeZone=${encodeURIComponent(
      Intl.DateTimeFormat().resolvedOptions().timeZone
    )}`;

  try {
    console.log("Requesting URL:", url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Calendar API Response:", data);

    if (data.error) {
      throw new Error(data.error.message || "Calendar API error");
    }

    return data.items || [];
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return [];
  }
}
