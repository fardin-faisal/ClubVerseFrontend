// Function to load HTML content into a specified div
function loadHTML(url, elementId) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch((error) => console.error("Error loading file:", error));
}

// Load header and footer from the 'components' folder
loadHTML("components/header.html", "sidebar");
loadHTML("components/footer.html", "footer");

// --- Sidebar Toggle for Mobile ---
document.addEventListener("DOMContentLoaded", function () {
  const sidebarToggler = document.querySelector(".sidebar-toggler");
  const sidebar = document.querySelector(".sidebar");

  sidebarToggler.addEventListener("click", function () {
    sidebar.classList.toggle("active");
  });

  // Highlight active page in sidebar
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".sidebar a").forEach((link) => {
    if (link.href.includes(currentPage)) {
      link.classList.add("active");
    }
  });
});

// --- Comment Submission Functionality ---
document
  .getElementById("submitComment")
  ?.addEventListener("click", function () {
    const commentInput = document.getElementById("commentInput").value;
    if (commentInput.trim() !== "") {
      const commentList = document.getElementById("commentList");

      // Create a new comment element
      const newComment = document.createElement("div");
      newComment.classList.add("comment");

      // Insert the comment content
      newComment.innerHTML = `<p><strong>Your Name:</strong> ${commentInput}</p>`;

      // Append to the comment list
      commentList.appendChild(newComment);

      // Clear the textarea after submission
      document.getElementById("commentInput").value = "";
    }
  });

// --- Dynamic Club and Event Cards Injection ---
document.addEventListener("DOMContentLoaded", function () {
  // Example data for Featured Clubs and Upcoming Events (could be fetched dynamically)
  const featuredClubs = [
    {
      name: "CSE Club",
      description: "Innovate and collaborate in technology.",
    },
    {
      name: "EEE Club",
      description: "Explore advancements in electrical engineering.",
    },
  ];

  const upcomingEvents = [
    {
      name: "CSE Fest",
      date: "March 25, 2024",
      description: "A grand event for technology enthusiasts.",
    },
  ];

  // Function to create club cards dynamically
  const featuredClubsContainer = document.getElementById(
    "featured-clubs-container"
  );
  featuredClubs.forEach((club) => {
    const clubCard = document.createElement("div");
    clubCard.classList.add("col-md-4");
    clubCard.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${club.name}</h5>
          <p class="card-text">${club.description}</p>
        </div>
      </div>
    `;
    featuredClubsContainer.appendChild(clubCard);
  });

  // Function to create event cards dynamically
  const upcomingEventsContainer = document.getElementById(
    "upcoming-events-container"
  );
  upcomingEvents.forEach((event) => {
    const eventCard = document.createElement("div");
    eventCard.classList.add("col-md-4");
    eventCard.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${event.name}</h5>
          <p class="card-text">${event.description}</p>
          <p class="card-text"><small class="text-muted">${event.date}</small></p>
        </div>
      </div>
    `;
    upcomingEventsContainer.appendChild(eventCard);
  });
});
