export function initPWA(installBtn) {

    let deferredPrompt = null;

    // Verificar se o app está instalado
    function isAppInstalled() {
        return window.matchMedia("(display-mode: standalone)").matches;
    }

    // Controle inicial do botão "Instalar App"
    function controlInstallButton(installBtn) {
        if (isAppInstalled()) {
            installBtn.style.display = "none";
            console.log("App já está instalado");
        } else {
            installBtn.style.display = "block";
            console.log("App não se encontra instalado");
        }
    }

    // Registrar Service Worker
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker
                .register("./service-worker.js")
                .then(() => console.log("Service Worker registrado com sucesso"))
                .catch((error) => console.log("Erro ao registrar Service Worker: ", error));
        });
    }

    // Capturar evento de instalação, quando disponível
    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e;
        console.log("Evento de instalação está disponível");
    });

    // Detectar quando o app foi instalado
    window.addEventListener("appinstalled", () => {
        console.log("App instalado com sucesso");
        installBtn.style.display = "none";
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

    // Executa ao carregar
    controlInstallButton(installBtn);
}