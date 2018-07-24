$(document).ready(function() {
	var o = $(window).height();
    function n() {
        $(document.body).height() < o ? $("#footer").addClass("navbar-fixed-bottom") : $("#footer").removeClass("navbar-fixed-bottom")
    }
    n();


    $('.reply2_btn').on('click',function(){
    	var user_status=$('#user_status').attr('user_status');
        if(!user_status){
        	location.href='/signin';
        	return;
        }
    	$(this).parent().next().show();
    })
});

