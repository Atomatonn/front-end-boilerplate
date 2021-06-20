// FORM JS
var form = $('.js-contact-form'),
  message = $('.contact-success'),
  form_data;

// Success function
function done_func(response) {
  message.fadeIn()
  message.html(response);
  setTimeout(function () {
    message.fadeOut();
  }, 10000);
  form.find('input:not([type="submit"]), textarea').val('');
}

// fail function
function fail_func(data) {
  message.fadeIn()
  message.html(data.responseText);
  setTimeout(function () {
    message.fadeOut();
  }, 10000);
}

form.submit(function (e) {
  e.preventDefault();
  form_data = $(this).serialize();
  $.ajax({
    type: 'POST',
    url: form.attr('action'),
    data: form_data
  })
  .done(done_func)
  .fail(fail_func);
});
