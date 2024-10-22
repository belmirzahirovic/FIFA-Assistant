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
const searchInput = document.getElementById("playerName");
const playerDropdown = document.getElementById("playerDropdown");
const playerImageContainer = document.getElementById("playerImageContainer");
searchInput.addEventListener("input", async function () {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === "") {
    playerDropdown.style.display = "none";
    return;
  }
  try {
    const response = await fetch(
      `/search_players?query=${encodeURIComponent(searchTerm)}`
    );
    if (response.ok) {
      const playerNames = await response.json();
      updateDropdown(playerNames);
    } else {
      console.error("Failed to fetch player names:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching player names:", error);
  }
});
function updateDropdown(playerNames) {
  playerDropdown.innerHTML = "";
  playerNames.forEach((playerName) => {
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = playerName;
    a.addEventListener("click", function () {
      selectPlayer(playerName);
    });
    playerDropdown.appendChild(a);
  });
  playerDropdown.style.display = "block";
}
const playerImages = {
  zidane: "images/zidane.webp",
  messi: "images/messi.png",
  ronaldo: "images/ronaldo.png",
  maradona: "maradona.jpg",
  pelé: "images/pele.webp",
  neymar: "images/neymar.webp",
  mbappé: "images/mbappe.webp",
};
async function selectPlayer(playerName) {
  searchInput.value = "";
  try {
    const response = await fetch(
      `/player_details?name=${encodeURIComponent(playerName)}`
    );
    if (response.ok) {
      const playerDetails = await response.json();
      if (playerDetails && playerDetails.Image_Link) {
        playerImageContainer.innerHTML = createPlayerCard(playerDetails);
        playerImageContainer.style.display = "block";
      } else {
        playerImageContainer.innerHTML = `Image not found for ${playerName}`;
        playerImageContainer.style.display = "block";
      }
      showPlayerDetails(playerDetails);
    } else {
      console.error("Failed to fetch player details:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching player details:", error);
  }
  playerDropdown.style.display = "none";
}
function createPlayerCard(player) {
  return `
            <div class="fut-player-card">
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
                        }" alt="${
    player.Name || "Player image"
  }" draggable="true" ondragstart="drag(event)"/>
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
const dropdownItems = playerDropdown.getElementsByTagName("a");
for (let item of dropdownItems) {
  item.addEventListener("click", function () {
    selectPlayer(item.innerText);
  });
}
function allowDrop(ev) {
  ev.preventDefault();
}
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.src);
  ev.dataTransfer.setData("playerName", ev.target.alt);
}
function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var playerName = ev.dataTransfer.getData("playerName");
  var target = ev.target;
  if (target.className.includes("player")) {
    if (target.getAttribute("data-original-src") === null) {
      target.setAttribute("data-original-src", target.src);
    }
    target.src = data;
    target.alt = playerName;
    addClickHandler(target);
  }
}
function addClickHandler(playerElement) {
  var handler = async function () {
    var playerName = playerElement.alt;
    try {
      const response = await fetch(
        `/player_details?name=${encodeURIComponent(playerName)}`
      );
      if (response.ok) {
        const playerDetails = await response.json();
        if (playerDetails && playerDetails.Image_Link) {
          playerImageContainer.innerHTML = createPlayerCard(playerDetails);
          playerImageContainer.style.display = "block";
        } else {
          playerImageContainer.innerHTML = `Image not found for ${playerName}`;
          playerImageContainer.style.display = "block";
        }
        showPlayerDetails(playerDetails);
      } else {
        console.error("Failed to fetch player details:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching player details:", error);
    }
    var originalSrc = playerElement.getAttribute("data-original-src");
    if (playerElement.src !== originalSrc) {
      var removeButton = document.getElementById("removePlayerButton");
      removeButton.style.display = "inline-block";
      removeButton.onclick = function () {
        removePlayer(playerElement);
      };
    } else {
      document.getElementById("removePlayerButton").style.display = "none";
    }
  };
  playerElement.addEventListener("click", handler);
  playerElement.clickHandler = handler;
}
function showPlayerDetails(player) {
  if (player) {
    document.getElementById("playerNameinput").innerText = player.Name || "";
    document.getElementById("playerOverall").innerText =
      player.Overall_Rating || "";
    document.getElementById("playerClub").innerText = player.Club || "";
    document.getElementById("playerNation").innerText = player.Nation || "";
    document.getElementById("playerPosition").innerText = player.Position || "";
    document.getElementById("playerFoot").innerText = player.Foot || "";
    document.getElementById("playerSkillMoves").innerText =
      player.Skill_Moves || "";
    document.getElementById("playerWeakFoot").innerText =
      player.Weak_Foot || "";
    document.getElementById("playerHeight").innerText = player.Height || "";
    document.getElementById("playerWeight").innerText = player.Weight || "";
    document.getElementById("playerAttDefWR").innerText =
      player.Att_Def_WR || "";
    document.getElementById("playerAge").innerText = player.Age || "";
    document.querySelector(".player-details").style.display = "block";
  } else {
    console.error("Player details not found");
  }
}
function removePlayer(playerElement) {
  var originalSrc = playerElement.getAttribute("data-original-src");
  if (playerElement.src !== originalSrc) {
    playerElement.src = originalSrc;
    document.getElementById("removePlayerButton").style.display = "none";
    document.getElementById("playerImageContainer").style.display = "none";
    clearPlayerDetails();
    document.querySelector(".player-details").style.display = "none";
    playerElement.removeEventListener("click", playerElement.clickHandler);
  } else {
    console.log(
      "This player's image has not been changed and cannot be removed."
    );
  }
}
function clearPlayerDetails() {
  document.getElementById("playerName").innerText = "";
  document.getElementById("playerOverall").innerText = "";
  document.getElementById("playerClub").innerText = "";
  document.getElementById("playerNation").innerText = "";
  document.getElementById("playerPosition").innerText = "";
  document.getElementById("playerFoot").innerText = "";
  document.getElementById("playerSkillMoves").innerText = "";
  document.getElementById("playerWeakFoot").innerText = "";
  document.getElementById("playerHeight").innerText = "";
  document.getElementById("playerWeight").innerText = "";
  document.getElementById("playerAttDefWR").innerText = "";
  document.getElementById("playerAge").innerText = "";
}
