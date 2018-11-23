$(function(){

  $('.menu-btn').on('click', function(){
    $(this).toggleClass('menu-btn--close');
    $('.menu').toggleClass('menu--active');
  });

  $('.menu__bg').on('click', function() {
    $(this).closest('.menu').removeClass('menu--active');
  });

  $('.question__text').on('click', function(){
    var question = $(this).closest('.question').toggleClass('question--opened');
    question.find('.question__answer').slideToggle();
  });

  var patterns = {
    name: /^[a-zA-Zа-яёА-ЯЁ0-9]+$/,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  };

  $('.subscribe__form').on('submit', function(e){
    e.preventDefault();
    console.log('validate');

    var $this = $(this);
    var hasErrors = false;
    var $inputs = $this.find('input');

    $inputs.each(function() {
      this.value = this.value.trim();
      if (this.hasAttribute('data-pattern')) {
        if (!patterns[this.getAttribute('data-pattern')].test(this.value)) {
          var $formgroup = $(this).closest('.formgroup');
          if ($formgroup.has('.formgroup__error').length === 0) {
            $formgroup.append(
              '<div class="formgroup__error">' + 
                this.getAttribute('data-error') + 
              '</div>'
            );
          }
          hasErrors = true;
        }
      }
    });

    if(!hasErrors) {
      this.submit();
      this.reset();
    }
  });

  langToggler();

  function langToggler() {
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

});
