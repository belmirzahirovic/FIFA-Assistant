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
  var imagesPerPage = 24;
  let allPlayers = [];
  let searchTerm = "";
  function showImagesForPage(page) {
    const playerContainer = document.querySelector(".image-grid");
    playerContainer.innerHTML = "";
    const start = (page - 1) * imagesPerPage;
    const end = start + imagesPerPage;
    let playersToShow = allPlayers;
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
                      <span>${player.Overall_Rating || ""}</span>
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
  function searchPlayerByName(name) {
    searchTerm = name;
    currentPage = 1;
    showImagesForPage(currentPage);
  }
  document
    .getElementById("searchInputMain")
    .addEventListener("input", function (event) {
      const name = event.target.value;
      searchPlayerByName(name);
    });
  document
    .getElementById("nextPageButton")
    .addEventListener("click", function () {
      if (currentPage * imagesPerPage < allPlayers.length) {
        currentPage++;
        showImagesForPage(currentPage);
      }
    });
  document
    .getElementById("previousPageButton")
    .addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage--;
        showImagesForPage(currentPage);
      }
    });
  fetchPlayerData();
});
