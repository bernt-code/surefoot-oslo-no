/* ============================================================
   Surefoot Oslo — Shopify Storefront-integrasjon
   ------------------------------------------------------------
   Henter produkter live fra Shopify Storefront API (tokenløst)
   og rendrer dem som cinematic produktkort.

   Bruk i HTML:
     <div class="cat-grid" data-shopify-collection="custom-innerstovler"></div>
     <script src="/shop.js" defer></script>

   Endrer du pris/produkt/bilde i Shopify, oppdateres nettsiden
   automatisk ved neste sidelast. Ingen vedlikehold to steder.
   ============================================================ */
(function () {
  "use strict";

  var SHOP_DOMAIN = "surefootoslo.myshopify.com";
  var API_VERSION = "2026-04";
  var ENDPOINT = "https://" + SHOP_DOMAIN + "/api/" + API_VERSION + "/graphql.json";

  // Formaterer "4600.0" + "NOK" → "4 600 kr"
  function formatPrice(amount, currency) {
    var n = Math.round(parseFloat(amount));
    var s = n.toLocaleString("nb-NO"); // mellomrom som tusenskille
    return currency === "NOK" ? s + " kr" : s + " " + currency;
  }

  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // Kort beskrivelse: første setning, maks ~110 tegn
  function shortBlurb(desc) {
    if (!desc) return "";
    var clean = desc.replace(/\s+/g, " ").trim();
    if (clean.length <= 110) return clean;
    var cut = clean.slice(0, 110);
    var lastSpace = cut.lastIndexOf(" ");
    return (lastSpace > 60 ? cut.slice(0, lastSpace) : cut) + "…";
  }

  var QUERY =
    "query($handle: String!) {" +
    "  collection(handle: $handle) {" +
    "    title" +
    "    products(first: 24) {" +
    "      edges { node {" +
    "        title handle description" +
    "        featuredImage { url altText }" +
    "        priceRange { minVariantPrice { amount currencyCode } }" +
    "        onlineStoreUrl" +
    "      } }" +
    "    }" +
    "  }" +
    "}";

  function fetchCollection(handle) {
    return fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY, variables: { handle: handle } })
    })
      .then(function (r) { return r.json(); })
      .then(function (json) {
        if (!json.data || !json.data.collection) return [];
        return json.data.collection.products.edges.map(function (e) { return e.node; });
      });
  }

  function renderCard(p, idx) {
    var img = p.featuredImage ? p.featuredImage.url : "";
    var alt = p.featuredImage && p.featuredImage.altText ? p.featuredImage.altText : p.title;
    var price = p.priceRange && p.priceRange.minVariantPrice
      ? formatPrice(p.priceRange.minVariantPrice.amount, p.priceRange.minVariantPrice.currencyCode)
      : "Ring for pris";
    var href = p.onlineStoreUrl || "#";
    var tag = ("0" + (idx + 1)).slice(-2);

    var imgStyle = img
      ? 'background-image:url(\'' + img + '\'); background-size:cover; background-position:center;'
      : 'background:linear-gradient(135deg,#1a1a1a,#2a2a2a);';

    return (
      '<a href="' + href + '" target="_blank" rel="noopener" class="cat">' +
        '<div class="cat-img" style="' + imgStyle + '" role="img" aria-label="' + escapeHtml(alt) + '"></div>' +
        '<div class="cat-body">' +
          '<div class="cat-tag">' + tag + '</div>' +
          '<h3 class="cat-title">' + escapeHtml(p.title) + '</h3>' +
          '<p class="cat-blurb">' + escapeHtml(shortBlurb(p.description)) + '</p>' +
          '<div class="cat-foot">' +
            '<span class="cat-price">' + price + '</span>' +
            '<span class="cat-cta">Se produkt →</span>' +
          '</div>' +
        '</div>' +
      '</a>'
    );
  }

  function loadInto(container) {
    var handles = (container.getAttribute("data-shopify-collection") || "")
      .split(",").map(function (h) { return h.trim(); }).filter(Boolean);
    if (!handles.length) return;

    container.setAttribute("aria-busy", "true");

    Promise.all(handles.map(fetchCollection))
      .then(function (lists) {
        var products = [];
        lists.forEach(function (l) { products = products.concat(l); });

        if (!products.length) {
          container.innerHTML =
            '<p style="grid-column:1/-1; color:#777; font-size:15px;">' +
            'Produktene lastes fra butikken. <a href="https://shop.surefoot.no" target="_blank" rel="noopener" style="color:var(--sf-red);">Se nettbutikken →</a></p>';
          return;
        }
        container.innerHTML = products.map(renderCard).join("");
      })
      .catch(function () {
        container.innerHTML =
          '<p style="grid-column:1/-1; color:#777; font-size:15px;">' +
          'Kunne ikke laste produkter akkurat nå. <a href="https://shop.surefoot.no" target="_blank" rel="noopener" style="color:var(--sf-red);">Se nettbutikken →</a></p>';
      })
      .finally(function () { container.removeAttribute("aria-busy"); });
  }

  function init() {
    var containers = document.querySelectorAll("[data-shopify-collection]");
    Array.prototype.forEach.call(containers, loadInto);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
