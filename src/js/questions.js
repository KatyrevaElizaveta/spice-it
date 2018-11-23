export default function(){
  $('.question__text').on('click', function(){
    var question = $(this).closest('.question').toggleClass('question--opened');
    question.find('.question__answer').slideToggle();
  });
}

