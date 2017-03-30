	
function resizeIFrameToFitContent( iFrame ) {
    console.log('iFrame', iFrame.id, iFrame.height);
    iFrame.width  = iFrame.contentWindow.document.body.scrollWidth;
    iFrame.height = iFrame.contentWindow.document.body.scrollHeight;
}

window.addEventListener('DOMContentReady', function(e) {
    // or, to resize all iframes:
    var iframes = document.querySelectorAll("iframe");
    for( var i = 0; i < iframes.length; i++) {
        resizeIFrameToFitContent( iframes[i] );
    }
} );



/* TABS */
$('.c-tabs .c-tabs__tab').on('click', function(){
  $(this).parent().children().removeClass('is-active');
  $(this).addClass('is-active');
});



/*Drop down*/

(function($) {

    $('.u-dropdown').each(function() {

        var $this = $(this);

        $(this).find('.u-dropdown__toggle').on('click', function(event) {

            event.stopPropagation();

            $this.toggleClass('is-open');

        });

    });

    $(document).on('click', function() {

        $('.is-open').removeClass('is-open');

    });


})(jQuery);


/*Sidebar*/
$('.js-sidenav-toggle').on('click', function(){
  event.stopPropagation();
  $('body').toggleClass('js-sidenav');
})