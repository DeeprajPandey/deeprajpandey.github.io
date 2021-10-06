const toggler = document.getElementById("checkbox_t");

var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
if (storedTheme)
    document.documentElement.setAttribute('data-theme', storedTheme)

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