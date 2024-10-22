document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    var body = document.body;
    var scrollPosition = window.scrollY + window.innerHeight;
    var documentHeight = document.body.offsetHeight;
    var threshold = 50;
    if (documentHeight - scrollPosition < threshold) {
      body.classList.add("show-footer");
    } else {
      body.classList.remove("show-footer");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var currentPage = 1;
  var imagesPerPage = 20;
  let allPlayers = [];
  let selectedPosition = null;
  let selectedNation = null;
  let selectedClub = null;
  let selectedOverall = null;
  let searchTerm = "";
  function showImagesForPage(page) {
    const playerContainer = document.querySelector(".player-images");
    playerContainer.innerHTML = "";
    const start = (page - 1) * imagesPerPage;
    const end = start + imagesPerPage;
    let playersToShow = allPlayers;
    if (selectedPosition) {
      playersToShow = playersToShow.filter(
        (player) => player.Position === selectedPosition
      );
    }
    if (selectedNation) {
      playersToShow = playersToShow.filter(
        (player) => player.Nation === selectedNation
      );
    }
    if (selectedClub) {
      playersToShow = playersToShow.filter(
        (player) => player.Club === selectedClub
      );
    }
    if (selectedOverall) {
      playersToShow = playersToShow.filter(
        (player) => player.Overall_Rating === selectedOverall
      );
    }
    if (searchTerm) {
      playersToShow = playersToShow.filter((player) =>
        player.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    const paginatedPlayers = playersToShow.slice(start, end);
    paginatedPlayers.forEach((player) => {
      playerContainer.innerHTML += createPlayerCard(player);
    });
  }
  function createPlayerCard(player) {
    return `
        <div class="fut-player-card" onclick="window.location.href='player_bio.html?image_link=${encodeURIComponent(
          player.Image_Link
        )}'">
            <div class="player-card-top">
                <div class="player-master-info">
                    <div class="player-rating">
                        <span>${player.Overall || ""}</span>
                    </div>
                    <div class="player-position">
                        <span>${player.Position || ""}</span>
                    </div>
                </div>
                <div class="player-picture">
                    <img src="${
                      player.Image_Link || "images/default.png"
                    }" alt="${player.Name || "Player image"}" draggable="false"/>
                </div>
            </div>
            <div class="player-card-bottom">
                <div class="player-info">
                    <div class="player-name">
                        <span>${player.Name || ""}</span>
                    </div>
                    <div class="player-features">
                        <div class="player-features-col">
                            <span>
                                <div class="player-feature-value">${
                                  player.Acceleration || ""
                                }</div>
                                <div class="player-feature-title">PAC</div>
                            </span>
                            <span>
                                <div class="player-feature-value">${
                                  player.Shot_Power || ""
                                }</div>
                                <div class="player-feature-title">SHO</div>
                            </span>
                            <span>
                                <div class="player-feature-value">${
                                  player.Short_Pass || ""
                                }</div>
                                <div class="player-feature-title">PAS</div>
                            </span>
                        </div>
                        <div class="player-features-col">
                            <span>
                                <div class="player-feature-value">${
                                  player.Dribbling || ""
                                }</div>
                                <div class="player-feature-title">DRI</div>
                            </span>
                            <span>
                                <div class="player-feature-value">${
                                  player.Def_Aware || ""
                                }</div>
                                <div class="player-feature-title">DEF</div>
                            </span>
                            <span>
                                <div class="player-feature-value">${
                                  player.Strength || ""
                                }</div>
                                <div class="player-feature-title">PHY</div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
  }
  function fetchPlayerData() {
    fetch("/players")
      .then((response) => response.json())
      .then((data) => {
        allPlayers = data;
        showImagesForPage(currentPage);
      })
      .catch((error) => console.error("Error fetching player data:", error));
  }
  function fetchNations() {
    fetch("/nations")
      .then((response) => response.json())
      .then((nations) => {
        const nationOptions = document.getElementById("nationOptions");
        nations.forEach((nation) => {
          const option = document.createElement("a");
          option.href = "#";
          option.textContent = nation;
          option.addEventListener("click", function (event) {
            event.preventDefault();
            selectedNation = nation;
            document.getElementById("nationDropdown").textContent = nation;
            document.getElementById("nationDropdownContent").style.display =
              "none";
          });
          nationOptions.appendChild(option);
        });
      })
      .catch((error) => console.error("Error fetching nations:", error));
  }
  function fetchClubs() {
    fetch("/clubs")
      .then((response) => response.json())
      .then((clubs) => {
        const clubOptions = document.getElementById("clubOptions");
        clubs.forEach((club) => {
          const option = document.createElement("a");
          option.href = "#";
          option.textContent = club;
          option.addEventListener("click", function (event) {
            event.preventDefault();
            selectedClub = club;
            document.getElementById("clubDropdown").textContent = club;
            document.getElementById("clubDropdownContent").style.display =
              "none";
          });
          clubOptions.appendChild(option);
        });
      })
      .catch((error) => console.error("Error fetching clubs:", error));
  }
  function fetchOverallRatings() {
    fetch("/overall_ratings")
      .then((response) => response.json())
      .then((overalls) => {
        const overallOptions = document.getElementById("overallOptions");
        overalls.forEach((overall) => {
          const option = document.createElement("a");
          option.href = "#";
          option.textContent = overall;
          option.addEventListener("click", function (event) {
            event.preventDefault();
            selectedOverall = overall;
            document.getElementById("overallDropdown").textContent = overall;
            document.getElementById("overallDropdownContent").style.display =
              "none";
          });
          overallOptions.appendChild(option);
        });
      })
      .catch((error) =>
        console.error("Error fetching overall ratings:", error)
      );
  }
  function filterPlayersByPosition(position) {
    selectedPosition = position;
    currentPage = 1;
    showImagesForPage(currentPage);
  }
  function filterPlayersByNation(nation) {
    selectedNation = nation;
    currentPage = 1;
    showImagesForPage(currentPage);
  }
  function filterPlayersByClub(club) {
    selectedClub = club;
    currentPage = 1;
    showImagesForPage(currentPage);
  }
  function filterPlayersByOverall(overall) {
    selectedOverall = overall;
    currentPage = 1;
    showImagesForPage(currentPage);
  }
  function searchPlayerByName(name) {
    searchTerm = name;
    currentPage = 1;
    showImagesForPage(currentPage);
  }
  document
    .getElementById("nextPageButton")
    .addEventListener("click", function () {
      currentPage++;
      showImagesForPage(currentPage);
    });
  document
    .getElementById("previousPageButton")
    .addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage--;
        showImagesForPage(currentPage);
      }
    });
  document
    .getElementById("playerName")
    .addEventListener("input", function (event) {
      const name = event.target.value;
      searchPlayerByName(name);
    });
  fetchPlayerData();
  fetchNations();
  fetchClubs();
  fetchOverallRatings();
  const positionDropdownButton = document.getElementById("positionDropdown");
  const positionDropdownContent = document.getElementById(
    "positionDropdownContent"
  );
  const positionSearchInput = document.getElementById("positionSearch");
  const positionOptions = positionDropdownContent.querySelectorAll("a");
  const applyFiltersButton = document.getElementById("applyFiltersButton");
  positionDropdownButton.addEventListener("click", function (event) {
    event.stopPropagation();
    positionDropdownContent.style.display =
      positionDropdownContent.style.display === "block" ? "none" : "block";
  });
  document.body.addEventListener("click", function (event) {
    if (!positionDropdownContent.contains(event.target)) {
      positionDropdownContent.style.display = "none";
    }
  });
  positionSearchInput.addEventListener("input", function () {
    const searchText = positionSearchInput.value.toLowerCase();
    positionOptions.forEach(function (option) {
      const text = option.textContent.toLowerCase();
      option.style.display = text.includes(searchText) ? "block" : "none";
    });
  });
  positionOptions.forEach(function (option) {
    option.addEventListener("click", function (event) {
      event.preventDefault();
      selectedPosition = option.textContent;
      positionDropdownButton.textContent = selectedPosition;
      positionDropdownContent.style.display = "none";
    });
  });
  const nationDropdownButton = document.getElementById("nationDropdown");
  const nationDropdownContent = document.getElementById(
    "nationDropdownContent"
  );
  const nationSearchInput = document.getElementById("nationSearch");
  nationDropdownButton.addEventListener("click", function (event) {
    event.stopPropagation();
    nationDropdownContent.style.display =
      nationDropdownContent.style.display === "block" ? "none" : "block";
  });
  document.body.addEventListener("click", function (event) {
    if (!nationDropdownContent.contains(event.target)) {
      nationDropdownContent.style.display = "none";
    }
  });
  nationSearchInput.addEventListener("input", function () {
    const searchText = nationSearchInput.value.toLowerCase();
    const nationOptions = nationDropdownContent.querySelectorAll("a");
    nationOptions.forEach(function (option) {
      const text = option.textContent.toLowerCase();
      option.style.display = text.includes(searchText) ? "block" : "none";
    });
  });
  const clubDropdownButton = document.getElementById("clubDropdown");
  const clubDropdownContent = document.getElementById("clubDropdownContent");
  const clubSearchInput = document.getElementById("clubSearch");
  clubDropdownButton.addEventListener("click", function (event) {
    event.stopPropagation();
    clubDropdownContent.style.display =
      clubDropdownContent.style.display === "block" ? "none" : "block";
  });
  document.body.addEventListener("click", function (event) {
    if (!clubDropdownContent.contains(event.target)) {
      clubDropdownContent.style.display = "none";
    }
  });
  clubSearchInput.addEventListener("input", function () {
    const searchText = clubSearchInput.value.toLowerCase();
    const clubOptions = clubDropdownContent.querySelectorAll("a");
    clubOptions.forEach(function (option) {
      const text = option.textContent.toLowerCase();
      option.style.display = text.includes(searchText) ? "block" : "none";
    });
  });
  const overallDropdownButton = document.getElementById("overallDropdown");
  const overallDropdownContent = document.getElementById(
    "overallDropdownContent"
  );
  const overallSearchInput = document.getElementById("overallSearch");
  overallDropdownButton.addEventListener("click", function (event) {
    event.stopPropagation();
    overallDropdownContent.style.display =
      overallDropdownContent.style.display === "block" ? "none" : "block";
  });
  document.body.addEventListener("click", function (event) {
    if (!overallDropdownContent.contains(event.target)) {
      overallDropdownContent.style.display = "none";
    }
  });
  overallSearchInput.addEventListener("input", function () {
    const searchText = overallSearchInput.value.toLowerCase();
    const overallOptions = overallDropdownContent.querySelectorAll("a");
    overallOptions.forEach(function (option) {
      const text = option.textContent.toLowerCase();
      option.style.display = text.includes(searchText) ? "block" : "none";
    });
  });
  applyFiltersButton.addEventListener("click", function () {
    filterPlayersByPosition(selectedPosition);
    filterPlayersByNation(selectedNation);
    filterPlayersByClub(selectedClub);
    filterPlayersByOverall(selectedOverall);
  });
  document
    .getElementById("resetFiltersButton")
    .addEventListener("click", function () {
      selectedPosition = null;
      selectedNation = null;
      selectedClub = null;
      selectedOverall = null;
      searchTerm = "";
      document.getElementById("positionDropdown").textContent =
        "Select Position";
      document.getElementById("nationDropdown").textContent = "Select Nation";
      document.getElementById("clubDropdown").textContent = "Select Club";
      document.getElementById("overallDropdown").textContent =
        "Select Overall Rating";
      document.getElementById("playerName").value = "";
      showImagesForPage(1, allPlayers);
    });
});
