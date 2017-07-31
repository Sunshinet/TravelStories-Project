/* globals $ toastr */

$(document).ready(function() {
    const regBtn = $('#reg-btn');

    regBtn.on('click', function() {
        const usernameForm = $('#username').val();
        const passwordForm = $('#password').val();

        $.ajax({
            type: 'POST',
            url: '/auth/sign-up',
            data: {
                username: usernameForm,
                password: passwordForm,
            },
            success: function(data) {
                toastr.success('Registration done');
                window.location = '/auth/sign-in';
            },
            error: function(request, status, error) {
                toastr.error('Invalid username or password');
            },
        });
    });
});
