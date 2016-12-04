var menuAndOverlay = function() {
  $("nav.v-nav").toggleClass("slide-right");
  $(".side-menu-icon").toggleClass("fa-bars fa-times");
  $(".overlay").toggleClass("overlay-visibility");
}

$(".side-menu-icon, .overlay").click(function() {
  menuAndOverlay();
});
