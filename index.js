//MENU BURGER 
// Lorsque l'utilisateur clique sur l'icône du burger...
document.getElementById("burger").addEventListener("click", function () {
  
  // On sélectionne le menu mobile et les éléments de navigation classiques
  const mobileNav = document.getElementById("mobileNav");
  const navElements = document.getElementById("navElements");

  // On vide le contenu actuel du menu mobile (important si on rouvre plusieurs fois)
  mobileNav.innerHTML = "";

  // On clone les 3 parties de la navigation : menu, icônes, bouton
  const menu = navElements.querySelector(".nav-menu").cloneNode(true);         // liens "Les Cabines", "Menu", "Librarie"
  const icons = navElements.querySelector(".nav-icons").cloneNode(true);       // icônes cœur et panier
  const contact = navElements.querySelector(".btn-contact").cloneNode(true);   // bouton "Contact"

  // On ajoute les éléments dans le menu mobile, un en dessous de l'autre
  mobileNav.appendChild(contact);
  mobileNav.appendChild(icons);
  mobileNav.appendChild(menu);

  // On affiche ou masque le menu mobile avec la classe 'show'
  mobileNav.classList.toggle("show");
});

// Footer logo scroll vers le haute 
  // On sélectionne tous les liens <a> qui ont comme destination l'ancre "#top"
  document.querySelectorAll('a[href="#top"]').forEach(link => {

    // Pour chaque lien trouvé, on ajoute un écouteur d'événement "click"
    link.addEventListener('click', function(e) {

      // On empêche le comportement par défaut du lien (c'est-à-dire le saut instantané vers le haut)
      e.preventDefault();

      // On déclenche un défilement fluide vers le haut de la page
      window.scrollTo({
        top: 0,               // On veut aller en haut de la page (position 0)
        behavior: 'smooth'    // Animation fluide au lieu d’un saut brutal
      });
    });
  });

