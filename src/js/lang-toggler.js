export default function() {
  var isMenuOpen = false;
  var $document = $(document);
  var $container = $('.lang-toggler');
  var $toggle = $('.lang-toggler__btn');
  var $list = $('.lang-toggler__list');

  var onMenuOpen = function onMenuOpen() {
    $container.addClass('lang-toggler--opened');
    $document.on('click', '.lang-toggler__link', onDocumentClick);
  };

  var onMenuClose = function onMenuClose() {
    $container.removeClass('lang-toggler--opened');
    $document.off('click', '.lang-toggler__link', onDocumentClick);
  };

  var onDocumentClick = function onDocumentClick(event) {
    if ($.contains($container[0], event.target)) {
      return;
    }
    onMenuClose();
  };

  $document.on('click', '.lang-toggler__btn', function () {
    isMenuOpen = !isMenuOpen;
    isMenuOpen ? onMenuOpen() : onMenuClose();
  });
}