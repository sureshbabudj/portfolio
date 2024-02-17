/* eslint-disable no-console */
import "../scss/styles.scss";
import "bootstrap";

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
    $('[data-toggle="tooltip"]').tooltip({
      container: "body",
      trigger: "hover",
    });
  });
  // Fetch the SVG content from a file (replace 'your-svg-file.svg' with your actual file path)
  // convertImageToDataImage("kishaa");

  // Replace copyright year
  const copyrightYear = document.getElementById("copyright-year");
  copyrightYear.textContent = new Date(Date.now()).getFullYear();
});
