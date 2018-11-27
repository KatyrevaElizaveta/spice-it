import langToggler from 'lang-toggler';
import questions from 'questions';
import formValidation from 'form-validation';

$(function(){

  $('.menu-btn').on('click', function(){
    $(this).toggleClass('menu-btn--close');
    $('.menu').toggleClass('menu--active');
    $('body').toggleClass('overflow-hidden');
  });

  $('.menu__bg').on('click', function() {
    $(this).closest('.menu').removeClass('menu--active');
    $('body').removeClass('overflow-hidden');
    $('.menu-btn--close').removeClass('menu-btn--close');
  });



  formValidation();
  questions();
  langToggler();

});
