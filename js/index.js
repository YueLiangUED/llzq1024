/* 
* @Author: Marte
* @Date:   2017-05-26 11:03:33
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-28 22:57:00
*/

$(document).ready(function(){
    // 页面自定义滚动
    
    // 样式计算
    
    function refreshStyle() {
        var winH = $(window).height();
        var headerH = $('.header').height();
        var calendarH = $('.calendar').height();
        var hearerInfH = $('.hearer-inf').height();
        $('.wrapper').height(winH + headerH);
        var wraaperH = $('.wrapper').height();
        $('.view-wrap .content').height(wraaperH - headerH - calendarH -hearerInfH);
        $('.content-item').css({
            'min-height': wraaperH - headerH - calendarH -hearerInfH + 'px'
        });
    }
    setTimeout(function () {
        refreshStyle();
    },300);
    
    

    // 自定义滚动
    var viewScroll, siderbarScroll, contentScroll;
    
    viewScroll = new IScroll('.view-wrap', {
        bounce: false,
        click: true,
    });
    siderbarScroll = new IScroll('.siderbar', {
        bounce: true,
        click: true,
        momentum: false
    });
    contentScroll = new IScroll('.content-body', {
        bounce: true,
        click: true,
        momentum: false
    });

    setTimeout(function () {
        viewScroll.refresh();
        contentScroll.refresh();
        siderbarScroll.refresh();
    },400);

    // siderbar点击事件
    $('.siderbar li').on('tap', function () {
        
        setTimeout(function () {
            contentScroll.refresh();
        },0);
        var thisIndex = $(this).index();
        $('.siderbar li').removeClass('act');
        $(this).addClass('act');
        $('.content-item').hide();
        var thisContent = $('.content-item')[thisIndex];
        $(thisContent).show();
    });

    // 获取月份时间
    var nowDate = new Date();
    var nowMonth = nowDate.getMonth() + 1;
    var nowDay = nowDate.getDate();
    $('.nowMonth').text(nowMonth);
    $('.nowDay').text(nowDay);

    function getCountDays() {
        var curDate = new Date();
        var curMonth = curDate.getMonth();
        curDate.setMonth(curMonth + 1);
        curDate.setDate(0);
        return curDate.getDate();
    }
    $('.count-day').text( getCountDays() - nowDay);

    // 滑动
    var mySwiper = new Swiper ('.swiper-container', {
        loop: true,
        effect : 'coverflow',
        slidesPerView: 'auto',
        loopedSlides :3,
        centeredSlides: true,
        coverflow: {
            rotate: 0,
            stretch: -6,
            depth: 0,
            modifier: 2,
            slideShadows : false
        },
        autoplay: 2000
      });
      
    //   弹窗
    (function () {

        // 隐藏底部弹窗
        function hidePop() {
            $lPop.animate({
                'bottom': -$lPop.height()
            },250, function () {
                $lPop.css('display', 'block');
            });
        }

        // 显示底部弹窗
        function showPop() {
            $lPop.animate({
                'bottom': 0
            },250);
        }

        // 调整底部弹窗top值使其隐藏
        var $lPop = $('.l-pop');
        $lPop.css('bottom', -$lPop.height());

        //点击套餐包弹出弹窗
        $('.item-section-list li').on('click', function (event) {
            event.preventDefault();
            showPop();
            $('.mask').show();
        });

        // 点击底部弹窗取消 隐藏底部弹窗
        $('.l-pop-footer .cancel').on('click', function () {
            hidePop();
            $('.mask').hide();
        });

        // 点击底部弹窗确定 隐藏底部弹窗 显示悬浮弹窗
        $('.l-pop-footer .enter').on('click', function () {
            hidePop();
            $('.model').show();
        });

        // 点击悬浮弹窗取消 隐藏
        $('.model-footer .cancel').on('click', function () {
            $('.model').hide();
            $('.mask').hide();
        });

        // 点击悬浮弹窗确定 隐藏
        $('.model-footer .enter').on('click', function () {
            $('.model').hide();
            $('.mask').hide();
        });
    })();

    // 查看更多
    $('.more-text').click(function (event) {
        event.preventDefault();
        var $thisItemSection = $(this).parents('.item-section');
        var $thisItemSectionList = $thisItemSection.find('.item-section-list');
        var $thisItemSectionListLi = $thisItemSection.find('.item-section-list li');
        $thisItemSectionList.css({
            'height': 'auto',
            'overflow': 'auto'
        });
        $(this).hide();
        setTimeout(function () {
            contentScroll.refresh();
        },0);
    });

    // 判断套餐包是否大于四个否则就隐藏查看更多
    (function () {
        var $itemSectionList = $('.item-section-list');
        $itemSectionList.each(function () {
            var $thisItemSectionListLi = $(this).find('li');
            var $thisItemSection = $(this).parents('.item-section');
            if ($thisItemSectionListLi.length < 4 || $thisItemSectionListLi.length == 4) {
                var $moreText = $thisItemSection.find('.more-text');
                $moreText.hide();
            }
        });
    })();
});