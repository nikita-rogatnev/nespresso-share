$(document).ready(function () {
    $(".intro .slider__slide").click(function (e) {
        e.preventDefault();
        $(".modal").removeClass('is-hidden');
        $(".slider").addClass('is-modal');
        $(".intro").addClass('is-blur');
    });

    $(".modal__close").click(function (e) {
        e.preventDefault();
        $(".modal, .form, .final").addClass('is-hidden');
        $(".slider").removeClass('is-modal is-hidden');
        $(".intro").removeClass('is-blur');
    });

    $(".slider__link a").click(function (e) {
        e.preventDefault();
        $(".slider").removeClass('is-modal');
        $(".form").removeClass('is-hidden');
    });

    $(".form button").click(function (e) {
        e.preventDefault();
        $(".form").addClass('is-hidden');
        $(".final").removeClass('is-hidden');
    });


    //grab the width and calculate left value
    var item_width = $('.slider__slide').outerWidth();
    var left_value = item_width * (-1);

    //move the last item before first item, just in case user click prev button
    $('.slider__slides .slider__slide:first').before($('.slider__slides .slider__slide:last'));

    //set the default item to the correct position
    $('.slider__slides').css({'left': left_value});


    //if user clicked on prev button
    $('#prev').click(function () {

        //get the right position
        var left_indent = parseInt($('.slider__slides').css('left')) + item_width;

        //slide the item
        $('.slider__slides').animate({'left': left_indent}, 200, function () {

            //move the last item and put it as first item
            $('.slider__slides .slider__slide:first').before($('.slider__slides .slider__slide:last'));

            //set the default item to correct position
            $('.slider__slides').css({'left': left_value});

        });

        //cancel the link behavior
        return false;
    });


    //if user clicked on next button
    $('#next').click(function () {

        //get the right position
        var left_indent = parseInt($('.slider__slides').css('left')) - item_width;

        //slide the item
        $('.slider__slides').animate({'left': left_indent}, 200, function () {

            //move the first item and put it as last item
            $('.slider__slides .slider__slide:last').after($('.slider__slides .slider__slide:first'));

            //set the default item to correct position
            $('.slider__slides').css({'left': left_value});

        });

        //cancel the link behavior
        return false;

    });

});
