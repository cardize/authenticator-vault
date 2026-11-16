// Ziyaretçinin diline göre içeriği gösterir; seçim yalnızca bu tarayıcıda hatırlanır.
(function () {
  var supported = ["tr", "en", "es", "fr", "de", "pt-BR"];
  function pick() {
    try { var saved = localStorage.getItem("lang"); if (supported.indexOf(saved) >= 0) return saved; } catch (e) {}
    var wanted = (navigator.languages || [navigator.language || "en"]);
    for (var i = 0; i < wanted.length; i++) {
      var code = wanted[i];
      if (/^pt/i.test(code)) return "pt-BR";
      var short = code.slice(0, 2).toLowerCase();
      if (supported.indexOf(short) >= 0) return short;
    }
    return "en";
  }
  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-lang]").forEach(function (el) { el.hidden = el.getAttribute("data-lang") !== lang; });
    document.querySelectorAll("nav.languages button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-set") === lang ? "true" : "false");
    });
    var title = document.querySelector('[data-lang="' + lang + '"] [data-title]');
    if (title) document.title = title.getAttribute("data-title");
  }
  document.addEventListener("click", function (event) {
    var button = event.target.closest("nav.languages button");
    if (!button) return;
    var lang = button.getAttribute("data-set");
    try { localStorage.setItem("lang", lang); } catch (e) {}
    apply(lang);
  });
  apply(pick());
})();
