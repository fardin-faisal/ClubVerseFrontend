document.addEventListener("DOMContentLoaded", () => {
  // Load common header and footer
  fetch("components/header.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;

      // Initialize toggler functionality after header is loaded
      const toggler = document.getElementById("toggler");
      const menuList = document.getElementById("menuList");

      if (toggler && menuList) {
        toggler.addEventListener("click", () => {
          menuList.classList.toggle("active");
        });
      }
    });

  fetch("components/footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
    });

  // Sample club data
  const clubs = [
    {
      name: "CSE Club",
      description: "Innovate in technology",
      department: "CSE",
    },
    {
      name: "EEE Club",
      description: "Empowering electrical engineering",
      department: "EEE",
    },
    {
      name: "Pharmacy Club",
      description: "Promoting health and wellness",
      department: "Pharmacy",
    },
    {
      name: "Drama Club",
      description: "Performing arts enthusiasts",
      department: "Open to All",
    },
  ];

  // Populate clubs dynamically
  const clubsList = document.getElementById("clubs-list");
  function populateClubs(data) {
    if (clubsList) {
      clubsList.innerHTML = "";
      data.forEach((club) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <h4>${club.name}</h4>
          <p>${club.description}</p>
          <button>Join Club</button>
        `;
        clubsList.appendChild(card);
      });
    }
  }
  populateClubs(clubs);

  // Filter clubs
  window.filterClubs = () => {
    const search = document.getElementById("search")
      ? document.getElementById("search").value.toLowerCase()
      : "";
    const department = document.getElementById("department-filter")
      ? document.getElementById("department-filter").value
      : "";
    const filteredClubs = clubs.filter((club) => {
      return (
        (club.name.toLowerCase().includes(search) ||
          club.description.toLowerCase().includes(search)) &&
        (department === "" || club.department === department)
      );
    });
    populateClubs(filteredClubs);
  };
});
