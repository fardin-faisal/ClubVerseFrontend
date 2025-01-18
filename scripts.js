// Utility function to load HTML content
function loadHTML(url, elementId) {
  return fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch((error) => console.error("Error loading file:", error));
}

// Main initialization
document.addEventListener("DOMContentLoaded", function () {
  Promise.all([
    loadHTML("components/header.html", "sidebar"),
    loadHTML("components/footer.html", "footer"),
  ]).then(() => {
    initializeSidebarFunctionality();
    initializeComments();
    initializeDynamicCards();
  });
});

function initializeSidebarFunctionality() {
  const toggleButton = document.querySelector(".sidebar-toggler");
  const sidebar = document.querySelector(".sidebar");
  const mainContent = document.querySelector(".main-content");

  // Sidebar toggle
  if (toggleButton && sidebar) {
    toggleButton.addEventListener("click", () => {
      sidebar.classList.toggle("active");
      mainContent?.classList.toggle("shifted");
    });
  }

  // Enhanced dropdown functionality
  initializeDropdowns();
  highlightActivePage();
}

function initializeDropdowns() {
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", handleDropdownClick);
  });

  document.addEventListener("click", handleOutsideClick);
}

function handleDropdownClick(e) {
  e.preventDefault();
  e.stopPropagation();

  const dropdownMenu = this.nextElementSibling;
  const isOpen = dropdownMenu.classList.contains("show");

  closeAllDropdowns();

  if (!isOpen) {
    dropdownMenu.classList.add("show");
    this.classList.add("active");
  }
}

function handleOutsideClick(e) {
  if (!e.target.matches(".dropdown-toggle")) {
    closeAllDropdowns();
  }
}

function closeAllDropdowns() {
  document
    .querySelectorAll(".dropdown-menu")
    .forEach((menu) => menu.classList.remove("show"));
  document
    .querySelectorAll(".dropdown-toggle")
    .forEach((toggle) => toggle.classList.remove("active"));
}

function highlightActivePage() {
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".menu-link, .sidebar a").forEach((link) => {
    if (
      link.getAttribute("href") === currentPage ||
      link.href.includes(currentPage)
    ) {
      link.classList.add("active");
      link.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    }
  });
}

function initializeComments() {
  const submitComment = document.getElementById("submitComment");
  if (!submitComment) return;

  submitComment.addEventListener("click", handleCommentSubmission);
}

function handleCommentSubmission() {
  const commentInput = document.getElementById("commentInput");
  const commentText = commentInput.value.trim();

  if (commentText) {
    addCommentToList(commentText);
    commentInput.value = "";
  }
}

function addCommentToList(commentText) {
  const commentList = document.getElementById("commentList");
  const newComment = document.createElement("div");
  newComment.classList.add("comment");
  newComment.innerHTML = `
      <p><strong>Your Name:</strong> ${commentText}</p>
  `;
  commentList.appendChild(newComment);
}

function initializeDynamicCards() {
  const containers = {
    clubs: document.getElementById("featured-clubs-container"),
    events: document.getElementById("upcoming-events-container"),
  };

  if (!containers.clubs && !containers.events) return;

  const data = {
    clubs: [
      {
        name: "CSE Club",
        description: "Innovate and collaborate in technology.",
      },
      {
        name: "EEE Club",
        description: "Explore advancements in electrical engineering.",
      },
      {
        name: "Pharmacy Club",
        description: "Discover pharmaceutical sciences.",
      },
    ],
    events: [
      {
        name: "CSE Fest",
        date: "March 25, 2024",
        description: "A grand event for technology enthusiasts.",
      },
      {
        name: "Tech Summit",
        date: "April 15, 2024",
        description: "Annual technology conference.",
      },
      {
        name: "Code Sprint",
        date: "May 1, 2024",
        description: "24-hour coding challenge.",
      },
    ],
  };

  if (containers.clubs) {
    renderCards(containers.clubs, data.clubs, createClubCard);
  }

  if (containers.events) {
    renderCards(containers.events, data.events, createEventCard);
  }
}

function renderCards(container, items, cardCreator) {
  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    fragment.appendChild(cardCreator(item));
  });
  container.appendChild(fragment);
}

// function createClubCard(club) {
//   const card = document.createElement("div");
//   card.classList.add("club-card");
//   card.innerHTML = `
//       <h3 class="club-title">${club.name}</h3>
//       <p class="club-description">${club.description}</p>
//   `;
//   return card;
// }
// function createEventCard(event) {
//   const card = document.createElement("div");
//   card.classList.add("event-card");
//   card.innerHTML = `
//       <h3 class="event-title">${event.name}</h3>
//       <p class="event-date">${event.date}</p>
//       <p class="event-description">${event.description}</p>
//   `;
//   return card;
// }

function filterClubs() {
  const searchTerm = document.getElementById('clubSearch').value.toLowerCase();
  const department = document.getElementById('departmentFilter').value;
  const category = document.getElementById('categoryFilter').value;
  
  const clubs = document.querySelectorAll('.club-card');
  
  clubs.forEach(club => {
      const clubName = club.querySelector('.club-title').textContent.toLowerCase();
      const clubDept = club.dataset.department;
      const clubCategory = club.dataset.category;
      
      const matchesSearch = clubName.includes(searchTerm);
      const matchesDepartment = department === '' || clubDept === department;
      const matchesCategory = category === '' || clubCategory === category;
      
      club.style.display = 
          matchesSearch && matchesDepartment && matchesCategory ? 'block' : 'none';
  });
}



function createClubCard(club) {
  const div = document.createElement("div");
  div.classList.add("col-md-4");
  div.innerHTML = `
      <div class="card">
          <div class="card-body">
              <h5 class="card-title">${club.name}</h5>
              <p class="card-text">${club.description}</p>
          </div>
      </div>
  `;
  return div;
}

function createEventCard(event) {
  const div = document.createElement("div");
  div.classList.add("col-md-4");
  div.innerHTML = `
      <div class="card">
          <div class="card-body">
              <h5 class="card-title">${event.name}</h5>
              <p class="card-text">${event.description}</p>
              <p class="card-text"><small class="text-muted">${event.date}</small></p>
          </div>
      </div>
  `;
  return div;
}

// Profile picture preview
document.getElementById('profilePicture')?.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          document.getElementById('profilePreview').src = e.target.result;
      }
      reader.readAsDataURL(file);
  }
});

// Form submission
document.getElementById('profileForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Collect form data
  const formData = new FormData(this);
  
  // Here you would typically send the data to your backend
  console.log('Profile update submitted:', Object.fromEntries(formData));
  
  // Show success message
  alert('Profile updated successfully!');
});
