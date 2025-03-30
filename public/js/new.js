console.log("JS is loading correctly");

document.addEventListener("DOMContentLoaded", () => {
  const openFilterBtn = document.getElementById("openFilter");
  const filterOverlay = document.getElementById("filterOverlay");
  const closeFilterBtn = document.getElementById("closeFilter");
  const applyFiltersBtn = document.getElementById("applyFilters");

  openFilterBtn.addEventListener("click", () => {
    filterOverlay.style.display = "flex";
  });

  filterOverlay.addEventListener("click", (event) => {
    if (event.target === filterOverlay || event.target === closeFilterBtn) {
      filterOverlay.style.display = "none";
    }
  });

  applyFiltersBtn.addEventListener("click", () => {
    let selectedCountry = document.getElementById("country").value;
    let selectedPrice = document.getElementById("priceRange").value;

    console.log("Country:", selectedCountry, "Price:", selectedPrice);

    filterOverlay.style.display = "none";

    window.location.href = `/listings?country=${selectedCountry}&price=${selectedPrice}`;
  });
});
