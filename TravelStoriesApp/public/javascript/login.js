/* globals $ toastr */

toastr.options.positionClass = 'toast-bottom-right';

$(document).ready(() => {
    const loginBtn = $('#login-btn');

    loginBtn.on('click', (event) => {
        event.preventDefault();
        const usernameForm = $('#username').val();
        const passwordForm = $('#password').val();

        // const pattern = new RegExp(/^[a-zA-Z0-9._]{3,20}$/);
        // const passPattern = new RegExp(`^(?=.*[A-Za-z])
        // (?=.*\d)[A-Za-z\d]{4,}$`);

        // const usernameTest = pattern.test(usernameForm);
        // const passTest = passPattern.test(passwordForm);

        // if (!usernameTest) {
        //     toastr.error(`Invalid username. 
        //     Allowed characters: all leters, numbers, dots and underscore. 
        //     Atleast 3 characters long.`);
        //     return;
        // }

        // if (!passTest) {
        //     toastr.error(`Invalid password. 
        //     Must be at least 4 characters long and must include
        //     letters in mixed case and numbers.`);
        //     return;
        // }

        $.ajax({
            type: 'POST',
            url: '/auth/sign-in',
            data: {
                username: usernameForm,
                password: passwordForm,
            },
            success: (data) => {
                toastr.success('Login done');
                window.location = '/';
            },
            error: (request, status, error) => {
                toastr.error('Invalid username or password');
            },
        });
    });
});
