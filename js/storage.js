export function getExperiences() {
    return JSON.parse(localStorage.getItem("localList")) || [];
}

export function saveExperiences(list) {
    localStorage.setItem("localList", JSON.stringify(list));
}