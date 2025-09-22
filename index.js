/*
===========================================================
 MENU BURGER (version pour .nav avec .nav__center / .nav__right)
-----------------------------------------------------------
Ce script :

1) Récupère les éléments de ta nav :
   - #burger        → le bouton hamburger (ouvert/fermé)
   - #mobileNav     → le conteneur du menu déroulant mobile
   - .nav__center   → les liens centraux (Menu, Librairie, etc.)
   - .nav__right    → les icônes (favoris, panier, profil) + le bouton "Contact"

2) Construit le contenu du menu mobile à l’ouverture :
   - On CLONE .nav__center et .nav__right (pour garder les liens et icônes)
   - On retire la classe sur le conteneur cloné (pas sur les enfants)
     pour éviter d’embarquer la mise en page desktop (grille, gaps…)
   - On injecte les clones dans #mobileNav, verticalement

3) Gère l’accessibilité et l’UX :
   - aria-expanded sur le bouton burger
   - Fermeture du menu si l’on clique en dehors, appuie sur Échap,
     ou quand on clique sur un lien du menu
   - Fermeture auto si l’écran repasse en desktop (> 1024px)

Pré-requis dans ton HTML :
- Un bouton :  <button id="burger" class="burger" aria-controls="mobileNav" aria-expanded="false">...</button>
- Un menu mobile : <nav id="mobileNav" class="mobile-nav" aria-label="Menu mobile"></nav>
- La nav version desktop : <nav class="nav__center">...</nav> et <div class="nav__right">...</div>
===========================================================
*/
(function () {
  // 1) Sélecteurs : on pointe les éléments nécessaires.
  const burger    = document.getElementById("burger");       // Le bouton hamburger
  const mobileNav = document.getElementById("mobileNav");    // Le conteneur du menu mobile (masqué/affiché)
  const center    = document.querySelector(".nav__center");  // Les liens du centre (ex: Menu, Librairie)
  const right     = document.querySelector(".nav__right");   // À droite : icônes + bouton "Contact"

  // Garde-fous : si un élément manque, on quitte (évite erreurs JS)
  if (!burger || !mobileNav || !center || !right) return;

  /*
  -----------------------------------------------------------
   buildMobileMenu()
   - Construit le contenu du menu mobile à chaque ouverture
   - On repart d'un conteneur vide pour être toujours à jour
  -----------------------------------------------------------
  */
  function buildMobileMenu() {
    // On nettoie d’abord le contenu si on rouvre plusieurs fois
    mobileNav.innerHTML = "";

    // 1) CLONE des liens centraux
    //    On clone en profondeur (true) pour récupérer les enfants (les <a>)
    const centerClone = center.cloneNode(true);

    // IMPORTANT : on retire la classe DU CONTENEUR cloné (pas des enfants)
    // - But : ne pas garder sa mise en page desktop (flex centré, grands gaps…)
    // - Les classes des <a> internes, .ico, .btn-contact… restent intactes
    centerClone.className = "";

    // On ajoute ce bloc en premier dans le menu mobile
    mobileNav.appendChild(centerClone);

    // 2) CLONE du bloc de droite (icônes + bouton contact)
    const rightClone = right.cloneNode(true);
    rightClone.className = ""; // même logique : on enlève la classe du conteneur seulement
    mobileNav.appendChild(rightClone);

    // 3) Fermer le menu quand on clique sur un lien (expérience utilisateur standard)
    mobileNav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => closeMenu());
    });
  }

  /*
  -----------------------------------------------------------
   openMenu() / closeMenu() / toggleMenu()
   - Ouverture/fermeture visuelles + attribut ARIA pour accessibilité
  -----------------------------------------------------------
  */
  function openMenu() {
    buildMobileMenu();                           // On (re)construit le contenu
    mobileNav.classList.add("show");            // Classe CSS qui affiche/annime
    burger.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    mobileNav.classList.remove("show");
    burger.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    if (mobileNav.classList.contains("show")) closeMenu();
    else openMenu();
  }

  // Clic sur le burger → on ouvre/ferme
  burger.addEventListener("click", toggleMenu);

  /*
  -----------------------------------------------------------
   Accessibilité / confort d’usage :
   - Échap pour fermer
   - Clic à l’extérieur pour fermer
   - Fermeture auto quand on passe en desktop
  -----------------------------------------------------------
  */

  // Touche Échap → ferme le menu s’il est ouvert
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Clic en dehors du menu → ferme (si ouvert)
  document.addEventListener("click", (e) => {
    if (!mobileNav.classList.contains("show")) return; // si déjà fermé, on ignore
    const clickInsideMenu = mobileNav.contains(e.target);
    const clickOnBurger   = burger.contains(e.target);
    if (!clickInsideMenu && !clickOnBurger) closeMenu();
  });

  // Si on repasse en desktop (largeur > 1024px), on ferme le menu mobile
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) closeMenu();
  });
})();

/*
-----------------------------------------------------------
  Scroll fluide vers le haut (#top)
  - Pour tout lien <a href="#top">, on remonte la page en douceur
-----------------------------------------------------------
*/
document.querySelectorAll('a[href="#top"]').forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

