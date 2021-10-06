const toggler = document.getElementById("checkbox_t");

var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
if (storedTheme) {
  document.documentElement.setAttribute('data-theme', storedTheme)

  var toggle_dark = document.getElementById('checkbox_t');
  // Toggle key based on current theme
  if (storedTheme === "light") {
    toggle_dark.checked = false;
  } else {
    toggle_dark.checked = true;
  }
}

toggler.addEventListener("change", () => {
  var currentTheme = document.documentElement.getAttribute("data-theme");
  var targetTheme = "light";

  if (currentTheme === "light") {
      targetTheme = "dark";
  }

  document.documentElement.setAttribute('data-theme', targetTheme)
  localStorage.setItem('theme', targetTheme);
});

toggler.addEventListener("keyup", (e) => {
  e = e || window.event;
  
  if (e.key === "Enter")
    e.preventDefault();
    document.getElementById("checkbox_t").trigger("change");
});