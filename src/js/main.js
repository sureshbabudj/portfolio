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
    }),
);
const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl, {
    container: "body",
    placement: "top",
  });
});

function renderPhotos(response) {
  var pf = $('<div class="masonry gutterless flickr-photos row justify-content-center"></div>');
  var photos = response.items;
  for (let i = 0; i < photos.length; i++) {
    var post = $('<div class="col-11 col-md-6 col-lg-4 mb-3 brick photo-item"></div>');
    var link = $('<a class="photo-item-link" href="' + photos[i].link + '" target="_blank"></a>');
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
    url: "https://www.flickr.com/services/feeds/photos_public.gne?id=36943504@N03&format=json",
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

function isElementInViewport(el) {
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }

  var rect = el.getBoundingClientRect(),
    vWidth = window.innerWidth || document.documentElement.clientWidth,
    vHeight = window.innerHeight || document.documentElement.clientHeight,
    efp = function (x, y) {
      return document.elementFromPoint(x, y);
    };

  // Return false if it's not in the viewport
  if (rect.right < 0 || rect.bottom < 0 || rect.left > vWidth || rect.top > vHeight) return false;

  // Return true if any of its four corners are visible
  return (
    el.contains(efp(rect.left, rect.top)) ||
    el.contains(efp(rect.right, rect.top)) ||
    el.contains(efp(rect.right, rect.bottom)) ||
    el.contains(efp(rect.left, rect.bottom))
  );
}

function getPages() {
  const blogId = '3061034665133655825';
  const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/pages?maxResults=50&key=AIzaSyBdEOnlEcoMygyrx_2Vgrv6T9-REbbfTNo`;
  const fallbackImg = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg5gGFaqSx8vo7HiZRtCfU90Kb9kDrn3a5i_0AcPZZsTd2AD2BEprzGRwHHTYG5jk7xGe3akqB6HKLhBAYVpgeZSbHOM74Lz10w87vJ9zCj80H341bj-FJdQiunFi6d17E7oJrS_jx2JAsIuckCZiNDJja6Yuf7GL9CyfhxH6ksaAx9JKF2NbQCZwXk_9Y/w640-h426/jo-szczepanska-9OKGEVJiTKk-unsplash.jpg";
  $.ajax({
    url,
    context: $('#load-pages')
  }).done(function(data) {
    for (let i = 0; i < data.items.length; i++) {
      const item = data.items[i];
      const pic = $('<div />').append(item.content).find('img').first().attr('src');
      const itemTemplate =
      `<a href="${item.url}" class="col-12 col-md-6 col-lg-4 page-item link-primary text-decoration-none">
          <figure class="figure rounded w-100">
              <img src="${pic ?? fallbackImg}" class="figure-img img-fluid rounded w-100" alt="blog post image">
          </figure>
          <h3 class="blog-title mb-3 fs-4">${item.title}</h3>
      </a>`;
      this.append(itemTemplate)
    }
  });
}

$(function () {
  const anchorRef = [ "about", "contact", "photoroll", "works", "blog", "home"];
  const anchors = $(".sd-navbar-nav a.nav-link");

  function scrollHandler() {
    for (let anchor of anchorRef) {
      const elm = $(`.sd-${anchor}-section`);
      const isVisible = isElementInViewport(elm);
      if (isVisible) {
        anchors.removeClass("active");
        const val = anchor === "home" ? "#" : anchor;
        $(`.sd-navbar-nav a.nav-link[href$="${val}"]`).addClass("active");
      }
    }
  }
  if (isHomePage) {
    $(window).on("DOMContentLoaded load resize scroll", () => {
      scrollHandler();
    });
  }

  getPhotos();
  getPages();

  // Replace copyright year
  const copyrightYear = document.getElementById("copyright-year");
  if (copyrightYear) copyrightYear.textContent = new Date(Date.now()).getFullYear();
});



