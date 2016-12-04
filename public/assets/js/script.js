var menuAndOverlay = function() {
  $("nav").toggleClass("slide-right");
  $(".side-menu-icon").toggleClass("fa-bars fa-times");
  $(".overlay").toggleClass("overlay-visibility");
}

$(".side-menu-icon").click(function() {
  menuAndOverlay();
});

$(".overlay").click(function() {
  menuAndOverlay();
});
