// ==UserScript==
// @name         Letterboxd++
// @namespace    https://github.com/shmup/lbpp
// @version      1.4
// @description  Adds custom links under the movie details on Letterboxd.
// @author
// @match        https://letterboxd.com/film/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  "use strict";

  function getMovieTitle() {
    const titleElement = document.querySelector(
      "h1.headline-1.filmtitle .name"
    );
    return titleElement
      ? titleElement.textContent.trim().replace(/\s+/g, " ")
      : null;
  }

  function getReleaseYear() {
    const yearElement = document.querySelector("div.releaseyear a");
    return yearElement ? yearElement.textContent.trim() : null;
  }

  function createLink(href, text, icon) {
    const link = document.createElement("a");
    link.href = href;
    link.textContent = `${icon ? `${icon} ` : ""}${text}`;
    link.target = "_blank";
    link.style.marginRight = "10px";
    return link;
  }

  function addLinks(links) {
    const detailsDiv = document.querySelector("div.details");
    if (!detailsDiv) return;

    const linkContainer = document.createElement("div");
    linkContainer.style.marginTop = "10px";
    linkContainer.style.padding = "10px";
    linkContainer.style.border = "1px solid rgb(0, 172, 28)";
    linkContainer.style.borderRadius = "5px";

    links.forEach(({ href, text, icon }) => {
      const link = createLink(href, text, icon);
      linkContainer.appendChild(link);
    });

    detailsDiv.appendChild(linkContainer);
  }

  function init() {
    const movieTitle = getMovieTitle();
    const releaseYear = getReleaseYear();
    if (!movieTitle || !releaseYear) return;

    const searchQueries = {
      BITSEARCH: `${movieTitle} ${releaseYear}`,
      BTDIG: `${movieTitle} ${releaseYear}`,
      TD: `${movieTitle} ${releaseYear}`,
      TPB: `${movieTitle} ${releaseYear}`,
      WIKI: `${movieTitle} (${releaseYear} film)`,
      YT: `${movieTitle} ${releaseYear} trailer`,
    };

    const links = [
      {
        icon: "🔍",
        text: "YT",
        href: `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQueries.YT)}`,
      },
      {
        icon: "🔍",
        text: "WIKI",
        href: `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(searchQueries.WIKI)}&ns0=1`,
      },
      {
        icon: "🔍",
        text: "TD",
        href: `https://www.torrentday.com/t?q=${encodeURIComponent(searchQueries.TD)}`,
      },
      {
        icon: "🔍",
        text: "TPB",
        href: `https://thepiratebay.org/search.php?q=${encodeURIComponent(searchQueries.TPB)}&video=on&search=Pirate+Search&page=0&orderby=`,
      },
      {
        icon: "🔍",
        text: "BITSEARCH",
        href: `https://bitsearch.to/search?q=${encodeURIComponent(searchQueries.BITSEARCH)}`,
      },
      {
        icon: "🔍",
        text: "BTDIG",
        href: `https://btdig.com/search?q=${encodeURIComponent(searchQueries.BTDIG)}`,
      },
    ];

    addLinks(links);
  }

  init();
})();
