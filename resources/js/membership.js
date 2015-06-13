$(document).ready(function() {
	
	// register form listeners
    $('#register-form').submit(function (evt) {
        evt.preventDefault();
         $('#register-message')
         .html($('#register-name').val() +', thank you for your registration!')
         .fadeIn('slow');
         $('#register-form')[0].reset();
    });
    $('#register-accordion a').click(function(evt) {
        $('#register-message').html('');
    });
	
});
