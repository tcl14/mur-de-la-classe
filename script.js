const cities = [
  { name: "Bafoussam", region: "Ouest" },
  { name: "Dschang", region: "Ouest" },
  { name: "Mbouda", region: "Ouest" },
  { name: "Bayangam", region: "Ouest" },
  { name: "Banyo", region: "Adamaoua" },
  { name: "Poli", region: "Nord" },
  { name: "Bangangté", region: "Ouest" },
  { name: "Foumban", region: "Ouest" },
  { name: "Douala", region: "Littoral" },
  { name: "Edéa", region: "Littoral" },
  { name: "Nkongsamba", region: "Littoral" },
  { name: "Campo", region: "Sud" },
  { name: "Manjo", region: "Littoral" },
  { name: "Yaoundé", region: "Centre" },
  { name: "Mbalmayo", region: "Centre" },
  { name: "Kribi", region: "Sud" },
  { name: "Sangmélima", region: "Sud" },
  { name: "Ambam", region: "Sud" },
  { name: "Bertoua", region: "Est" },
  { name: "Batouri", region: "Est" },
  { name: "Abong-Mbang", region: "Est" },
  { name: "Yokadouma", region: "Est" },
  { name: "Garoua", region: "Nord" },
  { name: "Guider", region: "Nord" },
  { name: "Ngaoundéré", region: "Adamaoua" },
  { name: "Meiganga", region: "Adamaoua" },
  { name: "Tibati", region: "Adamaoua" },
  { name: "Banyo", region: "Adamaoua" },
  { name: "Bamenda", region: "Nord-Ouest" },
  { name: "Kumbo", region: "Nord-Ouest" },
  { name: "Wum", region: "Nord-Ouest" },
  { name: "Ndop", region: "Nord-Ouest" },
  { name: "Limbe", region: "Sud-Ouest" },
  { name: "Buea", region: "Sud-Ouest" },
  { name: "Kumba", region: "Sud-Ouest" },
  { name: "Mamfe", region: "Sud-Ouest" },
  { name: "Tiko", region: "Sud-Ouest" }
];

const grid = document.getElementById("cityGrid");
const searchInput = document.getElementById("searchInput");
const regionFilter = document.getElementById("regionFilter");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const resetButton = document.getElementById("resetButton");

const regions = [...new Set(cities.map(city => city.region))].sort((a, b) => a.localeCompare(b, "fr"));
regions.forEach(region => {
  const option = document.createElement("option");
  option.value = region;
  option.textContent = region;
  regionFilter.appendChild(option);
});

function normalize(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function renderCities() {
  const query = normalize(searchInput.value.trim());
  const selectedRegion = regionFilter.value;

  const filtered = cities.filter(city => {
    const matchesName = normalize(city.name).includes(query);
    const matchesRegion = selectedRegion === "Toutes" || city.region === selectedRegion;
    return matchesName && matchesRegion;
  });

  grid.innerHTML = "";
  filtered.forEach((city, index) => {
    const card = document.createElement("article");
    card.className = "city-card";
    card.style.animationDelay = `${Math.min(index * 35, 350)}ms`;
    card.style.setProperty("--tint", ["#e4f3e9", "#fff3d4", "#fce8e8"][index % 3]);

    const top = document.createElement("div");
    top.className = "city-top";

    const heading = document.createElement("h3");
    heading.textContent = city.name;

    const number = document.createElement("span");
    number.className = "city-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const tag = document.createElement("span");
    tag.className = "region-tag";
    tag.textContent = city.region;

    top.append(heading, number);
    card.append(top, tag);
    grid.appendChild(card);
  });

  resultCount.textContent = `${filtered.length} ville${filtered.length > 1 ? "s" : ""} affichée${filtered.length > 1 ? "s" : ""}`;
  emptyState.hidden = filtered.length !== 0;
}

searchInput.addEventListener("input", renderCities);
regionFilter.addEventListener("change", renderCities);
resetButton.addEventListener("click", () => {
  searchInput.value = "";
  regionFilter.value = "Toutes";
  renderCities();
});

renderCities();
