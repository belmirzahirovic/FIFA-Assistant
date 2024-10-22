document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const imageLink = urlParams.get("image_link");

  if (imageLink) {
    fetch(`/player_image?image_link=${encodeURIComponent(imageLink)}`)
      .then((response) => response.json())
      .then((player) => {
        const playerCardContainer = document.getElementById(
          "playerCardContainer"
        );
        const playerCardHTML = `
                    <div class="fut-player-card">
                        <div class="player-card-top">
                            <div class="player-master-info">
                                <div class="player-position">${
                                  player.Position || "N/A"
                                }</div>
                            </div>
                            <div class="player-picture">
                                <img src="${
                                  player.Image_Link || "images/default.png"
                                }" alt="${
          player.Name || "Player image"
        }" id="playerImage">
                            </div>
                        </div>
                        <div class="player-card-bottom">
                            <div class="player-info">
                                <div class="player-name">${
                                  player.Name || "N/A"
                                }</div>
                                <div class="player-features">
                                    <div class="player-features-col">
                                        <span>
                                            <div class="player-feature-value">${
                                              player.Acceleration || "N/A"
                                            }</div>
                                            <div class="player-feature-title">PAC</div>
                                        </span>
                                        <span>
                                            <div class="player-feature-value">${
                                              player.Shot_Power || "N/A"
                                            }</div>
                                            <div class="player-feature-title">SHO</div>
                                        </span>
                                        <span>
                                            <div class="player-feature-value">${
                                              player.Short_Pass || "N/A"
                                            }</div>
                                            <div class="player-feature-title">PAS</div>
                                        </span>
                                    </div>
                                    <div class="player-features-col">
                                        <span>
                                            <div class="player-feature-value">${
                                              player.Dribbling || "N/A"
                                            }</div>
                                            <div class="player-feature-title">DRI</div>
                                        </span>
                                        <span>
                                            <div class="player-feature-value">${
                                              player.Def_Aware || "N/A"
                                            }</div>
                                            <div class="player-feature-title">DEF</div>
                                        </span>
                                        <span>
                                            <div class="player-feature-value">${
                                              player.Strength || "N/A"
                                            }</div>
                                            <div class="player-feature-title">PHY</div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
        playerCardContainer.innerHTML = playerCardHTML;

        document.getElementById("playerName").textContent =
          player.Name || "N/A";
        document.getElementById("playerRating").textContent = `${
          player.Overall_Rating || "N/A"
        } OVR`;
        document.getElementById("playerNameinput").textContent =
          player.Name || "N/A";
        document.getElementById("playerOverall").textContent =
          player.Overall_Rating || "N/A";
        document.getElementById("playerClub").textContent =
          player.Club || "N/A";
        document.getElementById("playerNation").textContent =
          player.Nation || "N/A";
        document.getElementById("playerPosition").textContent =
          player.Position || "N/A";
        document.getElementById("playerFoot").textContent =
          player.Foot || "N/A";
        document.getElementById("playerSkillMoves").textContent = `${
          player.Skill_Moves || "N/A"
        }★`;
        document.getElementById("playerWeakFoot").textContent = `${
          player.Weak_Foot || "N/A"
        }★`;
        document.getElementById("playerHeight").textContent = `${
          player.Height || "N/A"
        } cm`;
        document.getElementById("playerWeight").textContent = `${
          player.Weight || "N/A"
        } kg`;
        document.getElementById("playerAttDefWR").textContent =
          player.Att_Def_WR || "N/A";
        document.getElementById("playerAge").textContent = player.Age || "N/A";
        document.getElementById("acceleration").textContent =
          player.Acceleration || "N/A";
        document.getElementById("sprintSpeed").textContent =
          player.Sprint_Speed || "N/A";
        document.getElementById("attPosition").textContent =
          player.Att_Position || "N/A";
        document.getElementById("finishing").textContent =
          player.Finishing || "N/A";
        document.getElementById("shotPower").textContent =
          player.Shot_Power || "N/A";
        document.getElementById("longShots").textContent =
          player.Long_Shots || "N/A";
        document.getElementById("volleys").textContent =
          player.Volleys || "N/A";
        document.getElementById("penalties").textContent =
          player.Penalties || "N/A";
        document.getElementById("vision").textContent = player.Vision || "N/A";
        document.getElementById("crossing").textContent =
          player.Crossing || "N/A";
        document.getElementById("fkAcc").textContent = player.FK_Acc || "N/A";
        document.getElementById("shortPass").textContent =
          player.Short_Pass || "N/A";
        document.getElementById("longPass").textContent =
          player.Long_Pass || "N/A";
        document.getElementById("curve").textContent = player.Curve || "N/A";
        document.getElementById("agility").textContent =
          player.Agility || "N/A";
        document.getElementById("balance").textContent =
          player.Balance || "N/A";
        document.getElementById("reactions").textContent =
          player.Reactions || "N/A";
        document.getElementById("ballControl").textContent =
          player.Ball_Control || "N/A";
        document.getElementById("dribbling").textContent =
          player.Dribbling || "N/A";
        document.getElementById("composure").textContent =
          player.Composure || "N/A";
        document.getElementById("interceptions").textContent =
          player.Interceptions || "N/A";
        document.getElementById("headingAcc").textContent =
          player.Heading_Acc || "N/A";
        document.getElementById("defAware").textContent =
          player.Def_Aware || "N/A";
        document.getElementById("standTackle").textContent =
          player.Stand_Tackle || "N/A";
        document.getElementById("slideTackle").textContent =
          player.Slide_Tackle || "N/A";
        document.getElementById("jumping").textContent =
          player.Jumping || "N/A";
        document.getElementById("stamina").textContent =
          player.Stamina || "N/A";
        document.getElementById("strength").textContent =
          player.Strength || "N/A";
        document.getElementById("aggression").textContent =
          player.Aggression || "N/A";

        fetchChemistryLinks(player.Name);
      })
      .catch((error) => console.error("Error fetching player data:", error));
  }

  let chemistryLinks = [];
  let currentChemistryPage = 0;
  const chemistryLinksPerPage = 10;

  async function fetchChemistryLinks(playerName) {
    try {
      const response = await fetch(
        `/chemistry_links?name=${encodeURIComponent(playerName)}`
      );
      if (response.ok) {
        chemistryLinks = await response.json();
        showChemistryLinksPage(currentChemistryPage);
      } else {
        console.error("Failed to fetch chemistry links:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching chemistry links:", error);
    }
  }

  function showChemistryLinksPage(page) {
    const chemistryLinksContainer = document.getElementById("chemistryLinks");
    chemistryLinksContainer.innerHTML = "";

    const start = page * chemistryLinksPerPage;
    const end = start + chemistryLinksPerPage;

    const playersToShow = chemistryLinks.slice(start, end);
    playersToShow.forEach((player) => {
      const playerCard = createPlayerCard(player);
      chemistryLinksContainer.appendChild(playerCard);
    });

    document.getElementById("prevChemistryBtn").style.display =
      page > 0 ? "block" : "none";
    document.getElementById("nextChemistryBtn").style.display =
      end < chemistryLinks.length ? "block" : "none";
  }

  document
    .getElementById("prevChemistryBtn")
    .addEventListener("click", function () {
      if (currentChemistryPage > 0) {
        currentChemistryPage--;
        showChemistryLinksPage(currentChemistryPage);
      }
    });

  document
    .getElementById("nextChemistryBtn")
    .addEventListener("click", function () {
      if (
        (currentChemistryPage + 1) * chemistryLinksPerPage <
        chemistryLinks.length
      ) {
        currentChemistryPage++;
        showChemistryLinksPage(currentChemistryPage);
      }
    });

  function createPlayerCard(player) {
    const card = document.createElement("div");
    card.className = "fut-player-card";
    card.onclick = function () {
      window.location.href = `player_bio.html?image_link=${encodeURIComponent(
        player.Image_Link
      )}`;
    };
    card.innerHTML = `
            <div class="player-card-top">
                <div class="player-master-info">
                    <div class="player-position">
                        <span>${player.Position || ""}</span>
                    </div>
                </div>
                <div class="player-picture">
                    <img src="${
                      player.Image_Link || "images/default.png"
                    }" alt="${
      player.Name || "Player image"
    }" draggable="false"/>
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
        `;
    return card;
  }
});

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
  const cards = Array.from(
    document.querySelectorAll(".player-cards-container .card")
  );
  const cardsPerPage = 14;
  let currentPage = 0;

  function showPage(page) {
    const start = page * cardsPerPage;
    const end = start + cardsPerPage;
    cards.forEach((card, index) => {
      card.style.display = index >= start && index < end ? "" : "none";
    });
  }

  document.getElementById("prevBtn").addEventListener("click", function () {
    if (currentPage > 0) {
      currentPage--;
      showPage(currentPage);
    }
  });

  document.getElementById("nextBtn").addEventListener("click", function () {
    if ((currentPage + 1) * cardsPerPage < cards.length) {
      currentPage++;
      showPage(currentPage);
    }
  });

  showPage(0);
});
