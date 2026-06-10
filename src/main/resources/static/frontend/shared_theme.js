function applyTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }

    const select = document.getElementById("appearanceSelect");
    if (select) {
        select.value = theme;
    }
}