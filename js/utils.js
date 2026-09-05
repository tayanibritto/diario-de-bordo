// Organizar entradas por data
export function sortByDate(list) {
    return list.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    });
}

// Formatar a data de acordo com o calendário do Brasil
export function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
}