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
async function fetchPlayerNames(query, dropdownId) {
  if (query === "") {
    document.getElementById(dropdownId).style.display = "none";
    return;
  }
  try {
    const response = await fetch(
      `/search_players?query=${encodeURIComponent(query)}`
    );
    if (response.ok) {
      const playerNames = await response.json();
      updateDropdown(playerNames, dropdownId);
    } else {
      console.error("Failed to fetch player names:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching player names:", error);
  }
}
function updateDropdown(playerNames, dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  dropdown.innerHTML = "";
  playerNames.forEach((playerName) => {
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = playerName;
    a.addEventListener("click", function () {
      selectPlayer(playerName, dropdownId);
    });
    dropdown.appendChild(a);
  });
  dropdown.style.display = "block";
}
async function selectPlayer(playerName, dropdownId) {
  const dropdowns = document.querySelectorAll(".dropdown-content");
  dropdowns.forEach((dropdown) => (dropdown.style.display = "none"));
  try {
    const response = await fetch(
      `/player_details?name=${encodeURIComponent(playerName)}`
    );
    if (response.ok) {
      const playerDetails = await response.json();
      displayPlayerCard(playerDetails, dropdownId);
      displayPlayerDetails(playerDetails, dropdownId);
      displayPlayerAttributes(playerDetails, dropdownId);
      const detailsContainerId =
        dropdownId === "dropdownPlayer1" ? "player1Details" : "player2Details";
      const attributesContainerId =
        dropdownId === "dropdownPlayer1"
          ? "player1Attributes"
          : "player2Attributes";
      document.getElementById(detailsContainerId).classList.remove("hidden");
      document.getElementById(attributesContainerId).classList.remove("hidden");
    } else {
      console.error("Failed to fetch player details:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching player details:", error);
  }
}
function displayPlayerCard(player, dropdownId) {
  const playerCardContainerId =
    dropdownId === "dropdownPlayer1" ? "player1Card" : "player2Card";
  const playerCardContainer = document.getElementById(playerCardContainerId);
  const playerCardHTML = `
        <div class="fut-player-card">
            <div class="player-card-top">
                <div class="player-master-info">
                    <div class="player-position">${player.Position || ""}</div>
                </div>
                <div class="player-picture">
                    <img src="${
                      player.Image_Link || "images/default.png"
                    }" alt="${player.Name || "Player image"}">
                </div>
            </div>
            <div class="player-card-bottom">
                <div class="player-info">
                    <div class="player-name">${player.Name || ""}</div>
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
        </div>
    `;
  playerCardContainer.innerHTML = playerCardHTML;
}
function displayPlayerDetails(player, dropdownId) {
  const detailsPrefix =
    dropdownId === "dropdownPlayer1" ? "player1" : "player2";
  document.getElementById(`${detailsPrefix}Name`).textContent =
    player.Name || "";
  document.getElementById(`${detailsPrefix}OverallRating`).textContent =
    player.Overall_Rating || "";
  document.getElementById(`${detailsPrefix}Club`).textContent =
    player.Club || "";
  document.getElementById(`${detailsPrefix}Nation`).textContent =
    player.Nation || "";
  document.getElementById(`${detailsPrefix}Position`).textContent =
    player.Position || "";
  document.getElementById(`${detailsPrefix}Foot`).textContent =
    player.Foot || "";
  document.getElementById(`${detailsPrefix}SkillMoves`).textContent =
    player.Skill_Moves || "";
  document.getElementById(`${detailsPrefix}WeakFoot`).textContent =
    player.Weak_Foot || "";
  document.getElementById(`${detailsPrefix}Height`).textContent =
    player.Height || "";
  document.getElementById(`${detailsPrefix}Weight`).textContent =
    player.Weight || "";
  document.getElementById(`${detailsPrefix}AttDefWR`).textContent =
    player.Att_Def_WR || "";
  document.getElementById(`${detailsPrefix}Age`).textContent = player.Age || "";
}
function displayPlayerAttributes(player, dropdownId) {
  const attributesPrefix =
    dropdownId === "dropdownPlayer1" ? "player1" : "player2";
  document.getElementById(`${attributesPrefix}Acceleration`).textContent =
    player.Acceleration || "";
  document.getElementById(`${attributesPrefix}SprintSpeed`).textContent =
    player.Sprint_Speed || "";
  document.getElementById(`${attributesPrefix}AttPosition`).textContent =
    player.Att_Position || "";
  document.getElementById(`${attributesPrefix}Finishing`).textContent =
    player.Finishing || "";
  document.getElementById(`${attributesPrefix}ShotPower`).textContent =
    player.Shot_Power || "";
  document.getElementById(`${attributesPrefix}LongShots`).textContent =
    player.Long_Shots || "";
  document.getElementById(`${attributesPrefix}Volleys`).textContent =
    player.Volleys || "";
  document.getElementById(`${attributesPrefix}Penalties`).textContent =
    player.Penalties || "";
  document.getElementById(`${attributesPrefix}Vision`).textContent =
    player.Vision || "";
  document.getElementById(`${attributesPrefix}Crossing`).textContent =
    player.Crossing || "";
  document.getElementById(`${attributesPrefix}FKAcc`).textContent =
    player.FK_Acc || "";
  document.getElementById(`${attributesPrefix}ShortPass`).textContent =
    player.Short_Pass || "";
  document.getElementById(`${attributesPrefix}LongPass`).textContent =
    player.Long_Pass || "";
  document.getElementById(`${attributesPrefix}Curve`).textContent =
    player.Curve || "";
  document.getElementById(`${attributesPrefix}Agility`).textContent =
    player.Agility || "";
  document.getElementById(`${attributesPrefix}Balance`).textContent =
    player.Balance || "";
  document.getElementById(`${attributesPrefix}Reactions`).textContent =
    player.Reactions || "";
  document.getElementById(`${attributesPrefix}BallControl`).textContent =
    player.Ball_Control || "";
  document.getElementById(`${attributesPrefix}Dribbling`).textContent =
    player.Dribbling || "";
  document.getElementById(`${attributesPrefix}Composure`).textContent =
    player.Composure || "";
  document.getElementById(`${attributesPrefix}Interceptions`).textContent =
    player.Interceptions || "";
  document.getElementById(`${attributesPrefix}HeadingAcc`).textContent =
    player.Heading_Acc || "";
  document.getElementById(`${attributesPrefix}DefAware`).textContent =
    player.Def_Aware || "";
  document.getElementById(`${attributesPrefix}StandTackle`).textContent =
    player.Stand_Tackle || "";
  document.getElementById(`${attributesPrefix}SlideTackle`).textContent =
    player.Slide_Tackle || "";
  document.getElementById(`${attributesPrefix}Jumping`).textContent =
    player.Jumping || "";
  document.getElementById(`${attributesPrefix}Stamina`).textContent =
    player.Stamina || "";
  document.getElementById(`${attributesPrefix}Strength`).textContent =
    player.Strength || "";
  document.getElementById(`${attributesPrefix}Aggression`).textContent =
    player.Aggression || "";
}
document.getElementById("searchPlayer1").addEventListener("input", function () {
  fetchPlayerNames(this.value, "dropdownPlayer1");
});
document.getElementById("searchPlayer2").addEventListener("input", function () {
  fetchPlayerNames(this.value, "dropdownPlayer2");
});
