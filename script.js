// data model: categories -> items
const DATA = {
  "ALUMINIUM": [
    { id: "casting", label: "CASTING" }
  ],
  "FOAM PACKAGING": [
    { id: "3dprint", label: "3D PRINTING FILAMENT" },
    { id: "habitat", label: "HABITAT INSULATION" },
  ],
  "RESIN": [
    { id: "flowchart", label: "HABITAT COMPONENTS FLOWCHART" },
  ],
  "CARBON FIBER": [
    { id: "3dprint1", label: "3D PRINTING FILAMENT" },
  ],
  "AIR CUSHION": [
    { id: "regolith", label: "REGOLITH-FILLED BALLAST" },
  ],


  
};

document.addEventListener("DOMContentLoaded", () => {
  const catSelect = document.getElementById("select-category");
  const itemSelect = document.getElementById("select-item");
  const goBtn = document.getElementById("go-btn");

  // Fill category select
  Object.keys(DATA).forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    catSelect.appendChild(opt);
  });

  // When category changes -> populate items
  catSelect.addEventListener("change", () => {
    const cat = catSelect.value;
    itemSelect.innerHTML = '<option value="">— Select item —</option>';
    itemSelect.disabled = true;
    goBtn.disabled = true;

    if (!cat) return;

    const items = DATA[cat] || [];
    items.forEach(it => {
      const opt = document.createElement("option");
      opt.value = it.id;
      opt.textContent = it.label;
      itemSelect.appendChild(opt);
    });

    itemSelect.disabled = false;
  });

  // enable Go once item selected
  itemSelect.addEventListener("change", () => {
    goBtn.disabled = !itemSelect.value;
  });

  // navigate to info page when clicking Go
  goBtn.addEventListener("click", () => {
    const cat = catSelect.value;
    const item = itemSelect.value;
    if (!cat || !item) return;

    // Special case: Foam Packaging → 3D PRINTING FILAMENT
    if (cat === "FOAM PACKAGING" && item === "3dprint") {
      window.location.href = "foam_filament_process.html";
      return; // <-- ADDED: Stop execution after navigation
    }

    if (cat === "FOAM PACKAGING" && item === "habitat") {
      window.location.href = "foam_filament_insulation.html";
      return; // <-- ADDED: Stop execution after navigation
    }
    if (cat === "RESIN" && item === "flowchart") {
      window.location.href = "resin_reuse.html";
      return; // <-- ADDED: Stop execution after navigation
    }
    // Special case: Foam Packaging → 3D PRINTING FILAMENT
    if (cat === "ALUMINIUM" && item === "casting") {
      window.location.href = "aluminium_recycling.html";
      return; // <-- ADDED: Stop execution after navigation
    }
    // Special case: Foam Packaging → 3D PRINTING FILAMENT
    if (cat === "CARBON FIBER" && item === "3dprint1") {
      window.location.href = "carbonfibre.html";
      return; // <-- ADDED: Stop execution after navigation
    }
    if (cat === "AIR CUSHION" && item === "regolith") {
      window.location.href = "aircushion.html";
      return; // <-- ADDED: Stop execution after navigation
    }



    // Pass selection via query parameters (default case)
    const url = `info.html?cat=${encodeURIComponent(cat)}&item=${encodeURIComponent(item)}`;
    window.location.href = url;
  });
});