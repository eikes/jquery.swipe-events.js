(function($) { 
  $.fn.swipeEvents = function() {
    return this.each(function() {
      
      var startX,
          startY,
          $this = $(this);
      
      $this.bind('touchstart', touchstart);
      
      function touchstart(event) {
        var touches = event.originalEvent.touches;
        if (touches && touches.length) {
          startX = touches[0].pageX;
          startY = touches[0].pageY;
          $this.bind('touchmove', touchmove);
          $this.bind('touchend', touchend);
        }
        event.preventDefault();
      }
      
      function touchmove(event) {
        var touches = event.originalEvent.touches;
        if (touches && touches.length) {
          var deltaX = startX - touches[0].pageX;
          var deltaY = startY - touches[0].pageY;
          var threshold = window.devicePixelRatio >= 2 ? 25 : 50;
          
          if (deltaX >= threshold) {
            $this.trigger("swipeLeft");
          }
          if (deltaX <= -threshold) {
            $this.trigger("swipeRight");
          }
          if (deltaY >= threshold) {
            $this.trigger("swipeUp");
          }
          if (deltaY <= -threshold) {
            $this.trigger("swipeDown");
          }
          if (Math.abs(deltaX) >= threshold || Math.abs(deltaY) >= threshold) {
            $this.unbind('touchmove', touchmove);
            $this.unbind('touchend', touchend);
          }
        }
        event.preventDefault();
      }
      
      function touchend(event) {
        $this.unbind('touchmove', touchmove);
        event.preventDefault();
      }
      
    });
  };
})(jQuery);
