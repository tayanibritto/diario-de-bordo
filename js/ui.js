import { formatDate } from "./utils.js";

// Criar item de experiência
export function createExperienceItem(experiencia, index, removeExp) {
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
export function renderList(rgList, localList, removeExp) {
    rgList.innerHTML = "";

    const fragment = document.createDocumentFragment();

    localList.forEach((experiencia, index) => {
        const item = createExperienceItem(experiencia, index, removeExp);

        fragment.appendChild(item);
    });

    rgList.appendChild(fragment);
}