// ===================================
// Slideshow Functionality (Homepage)
// ===================================
const slides = document.querySelectorAll(".slide");
if (slides.length > 0) {
  let currentSlide = 0;

  // Function to cycle through slides
  function showSlides() {
    // Remove active class from all slides
    slides.forEach((slide, index) => {
      slide.classList.remove("active");
    });
    // Add active class to current slide
    slides[currentSlide].classList.add("active");
    // Move to next slide, loop back to start if at end
    currentSlide = (currentSlide + 1) % slides.length;
  }

  // Start slideshow
  setInterval(showSlides, 3000); // Change slides every 3 seconds
  showSlides(); // Show first slide immediately
}

// ===================================
// Header Shrink Effect
// ===================================
window.addEventListener("scroll", () => {
  const header = document.getElementById("main-header");
  const slideshow = document.querySelector(".slideshow");

  // Add/remove shrink class based on scroll position
  if (window.scrollY > 50) {
    header.classList.add("shrink");
    // If slideshow exists, expand it when header shrinks
    if (slideshow) {
      slideshow.classList.add("expanded");
    }
  } else {
    header.classList.remove("shrink");
    if (slideshow) {
      slideshow.classList.remove("expanded");
    }
  }
});

// ===================================
// Mobile Menu Functionality
// ===================================
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    // Toggle mobile menu when button is clicked
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !e.target.closest(".menu-container") &&
        navLinks.classList.contains("active")
      ) {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
      }
    });

    // Close menu when a link is clicked
    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
      }
    });
  }
});

// ===================================
// Document Showcase Slider
// ===================================
document.addEventListener("DOMContentLoaded", () => {
  const showcaseSlider = document.querySelector(".showcase-slider");
  if (showcaseSlider) {
    const slides = document.querySelectorAll(".showcase-slide");
    const content = document.querySelector(".showcase-content");
    const prevBtn = document.querySelector(".showcase-nav.prev-btn");
    const nextBtn = document.querySelector(".showcase-nav.next-btn");
    let currentIndex = 1;

    const documents = [
      {
        title: "Research Guide",
        description:
          "A comprehensive guide to conducting research, including methodology, data collection techniques, and analysis frameworks.",
        image: "images/BlueFiller.jpg",
        download: "#",
      },
      {
        title: "Research Templates",
        description:
          "Ready-to-use templates for research papers, presentations, and data collection forms.",
        image: "images/ShapesFiller.jpeg",
        download: "#",
      },
      {
        title: "Citation Guide",
        description:
          "Complete guide to proper citation formats and academic writing standards.",
        image: "images/BlueFiller.jpg",
        download: "#",
      },
    ];

    function updateSlides() {
      slides.forEach((slide) => {
        slide.classList.remove("prev", "current", "next");
      });

      const prevIndex =
        (currentIndex - 1 + documents.length) % documents.length;
      const nextIndex = (currentIndex + 1) % documents.length;

      slides[prevIndex]?.classList.add("prev");
      slides[currentIndex]?.classList.add("current");
      slides[nextIndex]?.classList.add("next");

      if (content) {
        content.querySelector("h2").textContent = documents[currentIndex].title;
        content.querySelector("p").textContent =
          documents[currentIndex].description;
        content.querySelector(".download-link").href =
          documents[currentIndex].download;
      }
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % documents.length;
      updateSlides();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + documents.length) % documents.length;
      updateSlides();
    }

    // Add click handlers for navigation buttons
    prevBtn?.addEventListener("click", prevSlide);
    nextBtn?.addEventListener("click", nextSlide);

    // Add click handlers for slides
    slides.forEach((slide) => {
      slide.addEventListener("click", () => {
        if (slide.classList.contains("prev")) {
          prevSlide();
        } else if (slide.classList.contains("next")) {
          nextSlide();
        } else if (slide.classList.contains("current")) {
          // Navigate to document link when clicking current slide
          const link = slide.querySelector(".slide-link");
          if (link) window.location.href = link.href;
        }
      });
    });

    // Initialize the slider
    updateSlides();
  }
});

// ===================================
// Advisor Showcase Slider
// ===================================
document.addEventListener("DOMContentLoaded", () => {
  const advisorShowcase = document.querySelector(".advisor-showcase");
  if (advisorShowcase) {
    const slides = document.querySelectorAll(".showcase-slide");
    const content = document.querySelector(".advisor-info");
    const prevBtn = document.querySelector(".showcase-nav.prev-btn");
    const nextBtn = document.querySelector(".showcase-nav.next-btn");
    let currentIndex = 1;

    const advisors = [
      {
        name: "Dr. Sarah Mitchell",
        title: "Science Department Chair",
        bio: "Leading our research initiatives with over 15 years of experience in scientific research and education. Specializes in molecular biology and student research mentorship.",
        image: "images/BlueFiller.jpg",
      },
      {
        name: "Prof. James Chen",
        title: "Research Program Director",
        bio: "Expert in data analysis and research methodology with a passion for mentoring young researchers. Brings 20 years of academic research experience.",
        image: "images/ShapesFiller.jpeg",
      },
      {
        name: "Dr. Emily Rodriguez",
        title: "Student Research Coordinator",
        bio: "Specializes in connecting students with research opportunities and developing research skills. PhD in Educational Leadership.",
        image: "images/BlueFiller.jpg",
      },
    ];

    function updateSlides() {
      slides.forEach((slide) => {
        slide.classList.remove("prev", "current", "next");
      });

      const prevIndex = (currentIndex - 1 + advisors.length) % advisors.length;
      const nextIndex = (currentIndex + 1) % advisors.length;

      slides[prevIndex]?.classList.add("prev");
      slides[currentIndex]?.classList.add("current");
      slides[nextIndex]?.classList.add("next");

      if (content) {
        content.style.opacity = "0";
        content.style.transform = "translateY(20px)";

        setTimeout(() => {
          content.querySelector("h3").textContent = advisors[currentIndex].name;
          content.querySelector(".advisor-title").textContent =
            advisors[currentIndex].title;
          content.querySelector(".advisor-bio").textContent =
            advisors[currentIndex].bio;

          content.style.opacity = "1";
          content.style.transform = "translateY(0)";
        }, 300);
      }
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % advisors.length;
      updateSlides();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + advisors.length) % advisors.length;
      updateSlides();
    }

    // Add click handlers for navigation buttons
    prevBtn?.addEventListener("click", prevSlide);
    nextBtn?.addEventListener("click", nextSlide);

    // Add click handlers for slides
    slides.forEach((slide) => {
      slide.addEventListener("click", () => {
        if (slide.classList.contains("prev")) {
          prevSlide();
        } else if (slide.classList.contains("next")) {
          nextSlide();
        }
      });
    });

    // Initialize the slider
    updateSlides();
  }
});

// ===================================
// Animate stats when they come into view
// ===================================
document.addEventListener("DOMContentLoaded", () => {
  const stats = document.querySelectorAll(".stat .number");

  // Create an intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalValue = parseInt(target.getAttribute("data-value"));
          animateValue(target, 0, finalValue, 1000);
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.5 }
  );

  // Observe each stat number
  stats.forEach((stat) => observer.observe(stat));

  // Animation function for counting up
  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = Math.floor(progress * (end - start) + start);
      element.textContent = currentValue;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = end;
        if (element.getAttribute("data-suffix")) {
          element.textContent += element.getAttribute("data-suffix");
        }
      }
    };
    window.requestAnimationFrame(step);
  }
});

// Add this to your existing script.js
document.addEventListener("DOMContentLoaded", () => {
  // Function to fetch upcoming events from Google Calendar
  async function fetchCalendarEvents() {
    try {
      console.log("Fetching calendar events...");
      const events = await getCalendarEvents(null, null, 3);
      console.log("Retrieved events:", events);

      const calendarEvents = document.querySelector(".calendar-events");
      if (calendarEvents && events && events.length > 0) {
        calendarEvents.innerHTML = events
          .map((event) => {
            const date = new Date(event.start.dateTime || event.start.date);
            // Format date properly
            const formattedDate = date.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: event.start.dateTime ? "2-digit" : undefined,
              minute: event.start.dateTime ? "2-digit" : undefined,
            });

            return `
              <div class="event">
                <div class="date">
                  ${formattedDate}
                </div>
                <div class="event-content">
                  <strong>${event.summary}</strong>
                  <div class="description">${event.description || ""}</div>
                </div>
              </div>
            `;
          })
          .join("");
      } else {
        console.log("No events found or calendar container not present");
      }
    } catch (error) {
      console.error("Error updating calendar events:", error);
    }
  }

  // Call the function to fetch events
  fetchCalendarEvents();
});
