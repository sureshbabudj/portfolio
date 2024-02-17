/* eslint-disable no-console */
import jQuery from "jquery";
import "@popperjs/core";
import * as bootstrap from "bootstrap";

// export for others scripts to use
window.$ = window.jQuery = jQuery;

// eslint-disable-next-line no-unused-vars
function convertImageToDataImage(img) {
  // img can be "../img/zooplus.svg"
  fetch(`../img/${img}.svg`)
    .then((response) => response.text())
    .then((svgContent) => {
      // Convert the SVG to a data URL
      const dataUrl = `data:image/svg+xml;base64,${btoa(svgContent)}`;

      // Log the data URL (you can use it as an image source)
      console.log(dataUrl);
    })
    .catch((error) => console.error("Error fetching SVG:", error));
}

$(document).ready(() => {
  // Enable tooltips everywhere
  $(function () {
    const popoverTriggerList = document.querySelectorAll(
      '[data-toggle="tooltip"]'
    );

    [...popoverTriggerList].map(
      (popoverTriggerEl) =>
        new bootstrap.Tooltip(popoverTriggerEl, {
          container: "body",
          trigger: "hover focus",
          placement: "top",
        })
    );
  });

  // Fetch the SVG content from a file (replace 'your-svg-file.svg' with your actual file path)
  // convertImageToDataImage("kishaa");

  // Replace copyright year
  const copyrightYear = document.getElementById("copyright-year");
  copyrightYear.textContent = new Date(Date.now()).getFullYear();
});
