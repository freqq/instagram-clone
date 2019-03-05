$(window)
    .scroll(function () {
        if ($(document).scrollTop() > 50) {
            $('nav').addClass('shrink');
            $("#brand-name").addClass('shrink');
        } else {
            $('nav').removeClass('shrink');
            $("#brand-name").removeClass('shrink');
        }
    });

$(document).on('click', '.new-box .dropdown-menu', function (e) {
    e.stopPropagation();
});