/* globals $ toastr */

$(document).ready(function () {
    const regBtn = $('#reg-btn');

    regBtn.on('click', function (event) {
        event.preventDefault();
        const usernameForm = $('#username').val();
        const passwordForm = $('#password').val();
        const emailForm = $('#email').val();
        const bioForm = $('#bio').val();

        const pattern = new RegExp(/^[a-zA-Z0-9._]{3,20}$/);
        const passPattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/);
        const emailPattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        const usernameTest = pattern.test(usernameForm);
        const passTest = passPattern.test(passwordForm);
        const emailTest = emailPattern.test(emailForm);

        if (!usernameTest) {
            toastr.error('Invalid username');
            return;
        }

        if (!passTest) {
            toastr.error('Invalid password');
            return;
        }

        if (emailForm.length > 1 && !emailTest) {
            toastr.error('Invalid email');
            return;
        }

        $.ajax({
            type: 'POST',
            url: '/auth/sign-up',
            data: {
                username: usernameForm,
                password: passwordForm,
                email: emailForm,
                bio: bioForm,
            },
            success: function (data) {
                toastr.success('Registration done');
                window.location = '/auth/sign-in';
            },
            error: function (request, status, error) {
                toastr.error('Invalid username or password');
            },
        });
    });
});
