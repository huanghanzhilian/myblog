$(document).ready(function() {
	var o = $(window).height();
    function n() {
        $(document.body).height() < o ? $("#footer").addClass("navbar-fixed-bottom") : $("#footer").removeClass("navbar-fixed-bottom")
    }
    n();
});