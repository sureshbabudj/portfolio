import "../scss/styles.scss";
import * as jQuery from "jquery";
import * as bootstrap from "bootstrap";
import "@popperjs/core";

window.$ = window.jQuery = jQuery;

// When the user scrolls down 50px from the top of the document, resize the header's font size
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  const nav = document.querySelector(".sd-nav");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    nav.style.height = "4rem";
  } else {
    nav.style.height = "6rem";
  }
}

// Enable tooltips everywhere
const tooltipTriggerList = document.querySelectorAll('[data-toggle="tooltip"]');
[...tooltipTriggerList].map(
  (el) =>
    new bootstrap.Tooltip(el, {
      container: "body",
      trigger: "hover focus",
      placement: "top",
    })
);
const popoverTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="popover"]')
);
popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl, {
    container: "body",
    placement: "top",
  });
});

function renderPhotos(response) {
  var pf = $('<div class="masonry gutterless flickr-photos"></div>');
  var photos = response.items;
  for (let i = 0; i < photos.length; i++) {
    var post = $('<div class="brick photo-item"></div>');
    var link = $(
      '<a class="photo-item-link" href="' +
        photos[i].link +
        '" target="_blank"></a>'
    );
    var image = $('<img src="' + photos[i].media.m.replace("_m", "") + '" />');
    var title = $(`<h4 class="photo-title">${photos[i].title}</h4>`);
    $(link).append(image);
    $(link).append(title);
    $(post).append(link);
    $(pf).append(post);
  }
  $("#photos-wrapper #photos-outer").append(pf);
}

function getPhotos() {
  $("#photos-wrapper .loader-wrap").show({
    imgWidth: 280,
  });

  $.ajax({
    url:
      "https://www.flickr.com/services/feeds/photos_public.gne?id=36943504@N03&format=json",
    jsonp: "callback",
    dataType: "jsonp",
    jsonpCallback: "jsonFlickrFeed",
    data: {
      format: "json",
    },
    success: function (response) {
      $("#photos-wrapper .loader-wrap").hide();
      renderPhotos(response);
    },
    error: function (err) {
      $("#photos-wrapper .loader-wrap").hide();
      console.log(err);
    },
  });
}

$(function () {
  console.log("jquery init");
  getPhotos();
});
// Replace copyright year
const copyrightYear = document.getElementById("copyright-year");
if (copyrightYear)
  copyrightYear.textContent = new Date(Date.now()).getFullYear();
