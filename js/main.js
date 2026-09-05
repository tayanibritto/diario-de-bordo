import { sortByDate } from "./utils.js";
import { getExperiences, saveExperiences } from "./storage.js";
import { renderList } from "./ui.js";
import { initPWA } from "./pwa.js";

//Seletores
const form = document.getElementById("rgForm");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const dateInput = document.getElementById("date");
const rgList = document.getElementById("xpList");
const installBtn = document.getElementById("installBtn");

// Carregar dados do localStorage
let localList = getExperiences();
localList = sortByDate(localList);

// Adicionar nova entrada
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const newExp = {
        title: titleInput.value,
        description: descInput.value,
        date: dateInput.value,
    };

    localList.push(newExp);
    localList = sortByDate(localList);
    saveExperiences(localList);
    renderList(rgList, localList, removeExp);

    // Limpar formulário
    form.reset();
});

// Remover entrada
function removeExp(index) {
    localList.splice(index, 1);
    saveExperiences(localList);
    renderList(rgList, localList, removeExp);
}

// Renderizar lista ao carregar
renderList(rgList, localList, removeExp);

initPWA(installBtn);
