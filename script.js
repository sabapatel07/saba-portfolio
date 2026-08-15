/* Shared navigation + theme controls for every page */

(function () {
    const root = document.documentElement;
    const themeButton = document.getElementById("themeToggle");
    const menuButton = document.getElementById("menuToggle");
    const menu = document.getElementById("navMenu");

    function updateThemeButton() {
        if (!themeButton) return;
        const light = root.getAttribute("data-theme") === "light";
        themeButton.textContent = light ? "☀" : "☾";
        themeButton.setAttribute(
            "aria-label",
            light ? "Switch to dark theme" : "Switch to light theme"
        );
        themeButton.title = light ? "Switch to dark theme" : "Switch to light theme";
    }

    const savedTheme = localStorage.getItem("saba-theme");
    if (savedTheme === "light") {
        root.setAttribute("data-theme", "light");
    }
    updateThemeButton();

    themeButton?.addEventListener("click", function () {
        const light = root.getAttribute("data-theme") === "light";

        if (light) {
            root.removeAttribute("data-theme");
            localStorage.setItem("saba-theme", "dark");
        } else {
            root.setAttribute("data-theme", "light");
            localStorage.setItem("saba-theme", "light");
        }

        updateThemeButton();
    });

    menuButton?.addEventListener("click", function () {
        const open = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", String(!open));
        menuButton.setAttribute(
            "aria-label",
            open ? "Open navigation menu" : "Close navigation menu"
        );
        menu?.classList.toggle("is-open", !open);
    });

    menu?.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            menuButton?.setAttribute("aria-expanded", "false");
            menuButton?.setAttribute("aria-label", "Open navigation menu");
            menu?.classList.remove("is-open");
        });
    });

    /* If a project link was used, prefill the contact subject. */
    const project = new URLSearchParams(window.location.search).get("project");
    const subject = document.getElementById("subject");

    if (project && subject) {
        subject.value = "Project enquiry: " + project;
    }
})();