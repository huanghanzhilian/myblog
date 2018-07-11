//左侧导航
$('.sidebar-fold').on('click',function(){
	var isStatus = $(this).hasClass('on')
    if (isStatus) {
        $(this).removeClass('on');
        $(this).removeClass('icon-sanhengxian');
        $('.g-sd').removeClass('nemu_max');
		$('.g-mn').removeClass('nemu_max');
    } else {
        $(this).addClass('on');
        $(this).addClass('icon-sanhengxian');
        $('.g-sd').addClass('nemu_max');
		$('.g-mn').addClass('nemu_max');
    }
})