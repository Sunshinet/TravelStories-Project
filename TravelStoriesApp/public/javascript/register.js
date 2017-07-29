/* globals $ toastr */

$(document).ready(function() {
    $('#reg-btn').on('click', function() {
        const el = $('.abc');
        el.css('display', 'none');
        toastr.error(el.text());
    });
});
