// Inject button styles
const style = document.createElement("style");
style.textContent = 
`.copy-svg-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 12px;
  padding: 2px 5px;
  cursor: pointer;
  z-index: 1000;
}
.copy-svg-btn:hover {
  background: #f0f0f0;
}`
;
document.head.appendChild(style);

// ...existing code...

function observeDOM() {
  addCopyButtonsToIcons();
  const observer = new MutationObserver(addCopyButtonsToIcons);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Listen to search input changes
  const searchInput = document.querySelector('input[aria-label="search"]');
  console.log(searchInput)
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      setTimeout(addCopyButtonsToIcons(), 100); // Wait for icons to update
    });
  }
}

// ...existing code...


function addCopyButtonsToIcons() {
const icons = document.querySelectorAll('.icon svg:not(.copy-svg-injected)');

  icons.forEach((svg) => {
    if (svg.closest("button")) return;
    const wrapper = svg.parentElement;
    if (!wrapper) return;

    svg.classList.add("copy-svg-injected");

    const btn = document.createElement("button");
    btn.innerText = "📋";
    btn.className = "copy-svg-btn";
    btn.title = "Copy SVG";

    wrapper.style.position = "relative";
    wrapper.appendChild(btn);

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const svgClone = svg.cloneNode(true);
      svgClone.setAttribute("xmlns", "http://www.w3.org/2000/svg");

      const container = document.createElement("div");
      container.appendChild(svgClone);
      const svgString = container.innerHTML;

      navigator.clipboard.writeText(svgString).then(() => {
        btn.innerText = "✅";
        setTimeout(() => (btn.innerText = "📋"), 1000);
      });
    });
  });
}

function observeDOM() {
  addCopyButtonsToIcons();
  const observer = new MutationObserver(addCopyButtonsToIcons);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", observeDOM);
} else {
  observeDOM();
}