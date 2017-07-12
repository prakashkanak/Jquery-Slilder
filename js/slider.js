(function ( $ ) {
 
    $.fn.prakash_slider = function( options ) {
 		
		return $(this).each(function(e) {
			
			var $this = $(this);
			var autoplay = options.autoplay;
			var autoplaySpeed = options.autoplaySpeed;
			var arrow = options.arrow;
			var dots = typeof options.dots === 'undefined' ? false : options.dots;
			var display_slide = typeof options.display_slide === 'undefined' ? 1 : options.display_slide;
			var pager_html;
			var autoSlide;
			var currentIndex = 0,
			  items = $this.find('li'),
			  itemAmt = items.length;
			var slide = options.slide;
			var li_width = $this.parents('div').width()/ display_slide;
			
			// on page load run //
			$(this).wrap('<div class="kp_slider">');
			$(this).find('li:first-child').fadeIn('slow');
			
			if(slide == 'slide'){	
				$width = li_width * itemAmt;
				$this.css({'width':$width+'px'});
				$this.find('li').css({'width':li_width+'px'});
			}
			if(dots){ // display or not slider arrow 
				pager();
			}
			if(arrow){ // display or not slider arrow 
				$this.parents('.kp_slider').append('<button class="next arrow">Next</button><button class="prev arrow">Previous</button>');
			}
			// end page load //
			
			function autoplay_slide(){
				if(autoplay)
				autoSlide = setInterval(function() {
					currentIndex += 1;
					if (currentIndex > itemAmt - 1) {
						currentIndex = 0;
					}
					cycleItems();
				}, autoplaySpeed);
			}
			
			function cycleItems() { // display slide
				if(slide == 'slide'){
                                   
					$this.stop(true, false).animate({
                                            
                                            marginLeft: '-'+parseInt(li_width) * parseInt(currentIndex),
                                                
					  }, 1000, 
                                          function() {
					});
                                   
				}
				else{
				  var item = $this.find('li').eq(currentIndex);
				  items.hide();
				  item.fadeIn('slow');
				  multislide();
				}
				$this.parents('.kp_slider').find('.kp-pager-item a').removeClass('active');
				$this.parents('.kp_slider').find('.kp-pager-item').eq(currentIndex).find('a').addClass('active');
			  
			}
			
			function pager(){// display pagination
				pager_html='';
				pager_html += '<div class="kp-pager">';
				for(i= 1; i<=itemAmt; i++){
					class_active = (i==1) ? 'active' : '';
					pager_html += '<div class="kp-pager-item"><a href="#" data-slide-index="'+parseInt(i-1)+'" class="kp-pager-link '+class_active+'">'+i+'</a></div>';
				}
				pager_html += '</div>';
				$this.parents('.kp_slider').append(pager_html);
			}
			
			function multislide(){// multi slide scroll
				if(display_slide)
				$this.find('li').addClass('slide'+display_slide);
				for(var k=1; k<display_slide; k++){
					  $this.find('li').eq(parseInt(currentIndex+k)).fadeIn('slow');
				}
			}
			
			$this.parents('.kp_slider').on("click",'button.next',function() {// next slide click
			  clearInterval(autoSlide);
			  currentIndex += 1;
			  if (currentIndex > itemAmt - 1) {
				currentIndex = 0;
			  }
			  cycleItems();
			  autoplay_slide();
			 
			});
			
			$this.parents('.kp_slider').on("click",'button.prev',function() {// prev slide click
			  clearInterval(autoSlide);
			  
			  currentIndex -= 1;
			  if (currentIndex < 0) {
				currentIndex = itemAmt - 1;
			  }
			  cycleItems();
			  autoplay_slide();
			});
			
			$this.parents('.kp_slider').find('.kp-pager-link').click(function(e) {// pagination click
				clearInterval(autoSlide);
				$this.parents('.kp_slider').find('.kp-pager-link').removeClass('active');
				$(this).addClass('active');
				currentIndex = $(this).data('slide-index');
				if(slide == 'slide'){
                                    $this.stop(true, false).animate({
                                            marginLeft: '-'+parseInt(li_width) * parseInt(currentIndex),
                                    }, 1000, function() {

                                    });
				}
				else{
                                    var item = $this.find('li').eq(currentIndex);
                                      items.hide();
                                      item.fadeIn('slow');
                                      for(var k=1; k<display_slide; k++){
                                        $this.find('li').eq(parseInt(currentIndex+k)).fadeIn('slow');
                                      }
				}
				autoplay_slide();
			  return false;
			});
			
			autoplay_slide();
			cycleItems();
			multislide();
 	});// end loop
	
  };//end slider
 
}( jQuery ));