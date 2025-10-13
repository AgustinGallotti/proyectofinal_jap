/* Código auspiciado por Fernando, modificado para que ande en nuestra página */

/* Crea el botón toggle y lo agrega al header, quedó fachero */
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header") || document.querySelector("nav.navbar");
  if (header) {
    const toggleBtn = document.createElement("button");
    toggleBtn.id = "theme-toggle-btn";
    toggleBtn.className = "btn btn-secondary";
    toggleBtn.innerHTML = '<i class="bi bi-moon"></i>';
    toggleBtn.style.marginLeft = "1em";
    toggleBtn.title = "Cambiar tema";
    header.appendChild(toggleBtn);

/* Estado inicial según preferencia en localStorage */
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
      toggleBtn.innerHTML = savedTheme === "dark" ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon"></i>';
    }

    toggleBtn.addEventListener("click", toggleTheme);
  }
});

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem("theme", newTheme);

/* Alterna entre la lunita o el solcito con un ternario, como hace arriba con el tema */
  const toggleBtn = document.getElementById("theme-toggle-btn");
  if (toggleBtn) {
    toggleBtn.innerHTML = newTheme === "dark" ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon"></i>';
  }
}
