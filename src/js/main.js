import langToggler from 'lang-toggler';
import questions from 'questions';
import formValidation from 'form-validation';

$(function(){

  $('.menu-btn').on('click', function(){
    $(this).toggleClass('menu-btn--close');
    $('.menu').toggleClass('menu--active');
  });

  $('.menu__bg').on('click', function() {
    $(this).closest('.menu').removeClass('menu--active');
  });


  formValidation();
  questions();
  langToggler();

});
