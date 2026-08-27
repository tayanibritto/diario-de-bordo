//Seletores
const form = document.getElementById("rgForm");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const dateInput = document.getElementById("date");
const rgList = document.getElementById("xpList");
let deferredPrompt = null;
const installBtn = document.getElementById("installBtn");

// Organizar entradas por data
function sortByDate(list) {
    return list.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    });
}

// Carregar dados do localStorage
let localList = JSON.parse(localStorage.getItem("localList")) || [];
localList = sortByDate(localList);

// Salvar dados no localStorage
function saveList() {
    localStorage.setItem("localList", JSON.stringify(localList));
}

// Formatar a data de acordo com o calendário do Brasil
function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
}

// Criar item de experiência
function createExperienceItem(experiencia, index) {
    const li = document.createElement("li");

    const title = document.createElement("strong");
    title.textContent = experiencia.title;

    const description = document.createElement("span");
    description.textContent = experiencia.description;

    const date = document.createElement("small");
    date.textContent = formatDate(experiencia.date);

    const button = document.createElement("button");

    button.classList.add("remove-btn");

    button.setAttribute("aria-label", "Botão de Remover Experiência");

    button.textContent = "X";

    button.addEventListener("click", () => {
        removeExp(index);
    });

    li.appendChild(title);
    li.appendChild(document.createElement("br"));

    li.appendChild(description);
    li.appendChild(document.createElement("br"));

    li.appendChild(date);
    li.appendChild(document.createElement("br"));

    li.appendChild(button);

    return li;
}

// Renderizar a lista de experiências
function renderList() {
    rgList.innerHTML = "";

    const fragment = document.createDocumentFragment();

    localList.forEach((experiencia, index) => {
        const item = createExperienceItem(experiencia, index);

        fragment.appendChild(item);
    });

    rgList.appendChild(fragment);
}

// Adicionar nova entrada
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const newExp = {
        title: titleInput.value,
        description: descInput.value,
        date: dateInput.value
    };

    localList.push(newExp);
    localList = sortByDate(localList);
    saveList();
    renderList();

    // Limpar formulário
    form.reset();
});

// Remover entrada
function removeExp(index) {
    localList.splice(index, 1);
    saveList();
    renderList();
}

// Renderizar lista ao carregar
renderList();

// Registrar Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js")
            .then(() => console.log("Service Worker registrado com sucesso"))
            .catch((error) => console.log("Erro ao registrar Service Worker: ", error));
    });
}

// Verificar se o app está instalado
function isAppInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches;
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
})

// Executa ao carregar
document.addEventListener("DOMContentLoaded", () => {
    controlInstallButton();
});

