export default function() {
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
}
