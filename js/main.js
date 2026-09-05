import { sortByDate } from "./utils.js";
import { getExperiences, saveExperiences } from "./storage.js";
import { renderList } from "./ui.js";

//Seletores
const form = document.getElementById("rgForm");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const dateInput = document.getElementById("date");
const rgList = document.getElementById("xpList");
let deferredPrompt = null;
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

// Registrar Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./service-worker.js")
            .then(() => console.log("Service Worker registrado com sucesso"))
            .catch((error) => console.log("Erro ao registrar Service Worker: ", error));
    });
}

// Verificar se o app está instalado
function isAppInstalled() {
    return window.matchMedia("(display-mode: standalone)").matches;
}

// Controle inicial do botão "Instalar App"
function controlInstallButton() {
    if (isAppInstalled()) {
        installBtn.style.display = "none";
        console.log("App já está instalado");
    } else {
        installBtn.style.display = "block";
        console.log("App não se encontra instalado");
    }
}

// Capturar evento de instalação, quando disponível
window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log("Evento de instalação está disponível");
});

// Clique no botão de "Instalar App"
installBtn.addEventListener("click", async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();

        const { outcome } = await deferredPrompt.userChoice;
        console.log("Resultado: ", outcome);

        deferredPrompt = null;
    } else {
        console.log("Para instalar, use o menu do navegador (⋮) - Instalar app");
    }

    installBtn.style.display = "none";
});

// Detectar quando o app foi instalado
window.addEventListener("appinstalled", () => {
    console.log("App instalado com sucesso");
    installBtn.style.display = "none";
});

// Executa ao carregar
document.addEventListener("DOMContentLoaded", () => {
    controlInstallButton();
});
