class Calendar {
  constructor(container) {
    this.container = container;
    this.date = new Date();
    this.events = [];
    this.init();
  }

  async init() {
    await this.fetchEvents();
    this.render();
    this.addEventListeners();
  }

  async fetchEvents() {
    try {
      // Get first and last day of current month
      const year = this.date.getFullYear();
      const month = this.date.getMonth();

      // Set to beginning of month in local timezone
      const firstDay = new Date(Date.UTC(year, month, 1));
      const lastDay = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999));

      // Convert to ISO string for API
      const timeMin = firstDay.toISOString();
      const timeMax = lastDay.toISOString();

      // Fetch events for the entire month
      this.events = await getCalendarEvents(timeMin, timeMax);
      console.log("Calendar events for month:", this.events);
    } catch (error) {
      console.error("Error fetching events:", error);
      this.events = [];
    }
  }

  render() {
    const year = this.date.getFullYear();
    const month = this.date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    this.container.innerHTML = `
      <div class="custom-calendar">
        <div class="calendar-header">
          <button class="prev-month">←</button>
          <h2>${monthNames[month]} ${year}</h2>
          <button class="next-month">→</button>
        </div>
        <div class="calendar-body">
          <div class="weekdays">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div class="days">
            ${this.generateDays(daysInMonth, startingDay)}
          </div>
        </div>
      </div>
    `;
  }

  generateDays(daysInMonth, startingDay) {
    let days = "";

    // Add empty cells for days before the first of the month
    for (let i = 0; i < startingDay; i++) {
      days += '<div class="day empty"></div>';
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        day
      );
      const events = this.getEventsForDate(currentDate);
      const hasEvents = events.length > 0;

      days += `
        <div class="day ${
          hasEvents ? "has-events" : ""
        }" data-date="${currentDate.toISOString()}">
          <span class="day-number">${day}</span>
          ${hasEvents ? this.generateEventsList(events) : ""}
        </div>
      `;
    }

    return days;
  }

  getEventsForDate(date) {
    return this.events.filter((event) => {
      const eventDate = new Date(event.start.dateTime || event.start.date);
      return eventDate.toDateString() === date.toDateString();
    });
  }

  generateEventsList(events) {
    return `
      <div class="event-list">
        ${events
          .map(
            (event) => `
          <div class="calendar-event">
            <span class="event-title">${event.summary}</span>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  addEventListeners() {
    const prevButton = this.container.querySelector(".prev-month");
    const nextButton = this.container.querySelector(".next-month");

    prevButton.addEventListener("click", async () => {
      let year = this.date.getFullYear();
      let month = this.date.getMonth() - 1;

      if (month < 0) {
        month = 11;
        year -= 1;
      }

      this.date = new Date(year, month, 1);
      await this.fetchEvents();
      this.render();
    });

    nextButton.addEventListener("click", async () => {
      let year = this.date.getFullYear();
      let month = this.date.getMonth() + 1;

      if (month > 11) {
        month = 0;
        year += 1;
      }

      this.date = new Date(year, month, 1);
      await this.fetchEvents();
      this.render();
    });

    // Add event listeners for day clicks
    this.container.addEventListener("click", (e) => {
      const dayEl = e.target.closest(".day");
      if (dayEl && dayEl.dataset.date) {
        const events = this.getEventsForDate(new Date(dayEl.dataset.date));
        if (events.length > 0) {
          this.showEventDetails(events, dayEl);
        }
      }
    });
  }

  showEventDetails(events, element) {
    const modal = document.createElement("div");
    modal.className = "calendar-modal";
    modal.innerHTML = `
      <div class="modal-content">
        <h3>${new Date(
          events[0].start.dateTime || events[0].start.date
        ).toLocaleDateString()}</h3>
        ${events
          .map(
            (event) => `
          <div class="modal-event">
            <h4>${event.summary}</h4>
            <p>${event.description || ""}</p>
            <p class="event-time">
              ${new Date(
                event.start.dateTime || event.start.date
              ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
        `
          )
          .join("")}
        <button class="modal-close">Close</button>
      </div>
    `;

    document.body.appendChild(modal);
    modal.querySelector(".modal-close").addEventListener("click", () => {
      modal.remove();
    });
  }
}
