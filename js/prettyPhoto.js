/* ------------------------------------------------------------------------
	Class: prettyPhoto
	Use: Lightbox clone for jQuery
	Author: Stephane Caron (http://www.no-margin-for-errors.com)
	Version: 2.1.1
------------------------------------------------------------------------- */

	$(document).ready(function(){
		prettyPhoto.init();
	});

	prettyPhoto = {
		options : {
			'animationSpeed' : 'fast', /* fast/normal/slow */
			'padding' : 20, /* padding for each side of the picture */
			'showTitle' : true
		},
		init : function(){
			// Find all the images to overlay
			prettyPhoto.imagesArray = [];
			$("a[rel^='prettyOverlay'],a[rel^='prettyPhoto']").each(function(){
				prettyPhoto.imagesArray[prettyPhoto.imagesArray.length] = this;
				$(this).bind('click',function(){
					prettyPhoto.open(this); return false;
				});
			});
			
			$(window).scroll(function(){ prettyPhoto.centerPicture(); });
			$(window).resize(function(){ prettyPhoto.centerPicture(); prettyPhoto.resizeOverlay(); })
		},
		open : function(caller) {
			prettyPhoto.caller = caller;
			
			// Find out if the picture is part of a set
			theRel = $(caller).attr('rel');
			galleryRegExp = /\[(?:.*)\]/;
			theGallery = galleryRegExp.exec(theRel);
			
			// Calculate the number of items in the set, and the position of the clicked picture.
			prettyPhoto.setCount = 0; /* Total images in the set */
			prettyPhoto.setPosition = 0; /* Position in the set */
			prettyPhoto.arrayPosition = 0; /* Total position in the array */
			prettyPhoto.isSet = false;
			for (i = 0; i < prettyPhoto.imagesArray.length; i++){
				if($(prettyPhoto.imagesArray[i]).attr('rel').indexOf(theGallery) != -1){
					prettyPhoto.setCount++;
					if(prettyPhoto.setCount > 1) prettyPhoto.isSet = true;

					if($(prettyPhoto.imagesArray[i]).attr('href') == $(caller).attr('href')){
						prettyPhoto.setPosition = prettyPhoto.setCount;
						prettyPhoto.arrayPosition = i;
					};
				};
			};
			
			prettyPhoto.buildOverlay(prettyPhoto.isSet);

			// Display the current position
			$('div.pictureHolder span.currentText').html('<span>' + prettyPhoto.setPosition + '</span>' + '/' + prettyPhoto.setCount);

			// Position the picture in the center of the viewing area
			prettyPhoto.centerPicture();
			
			$('div.pictureHolder #fullResImageContainer').hide();
			$('.loaderIcon').show();

			// Preload the neighbour images
			prettyPhoto.preload();
		},
		next : function(){
			// Change the current position
			prettyPhoto.arrayPosition++;
			prettyPhoto.setPosition++;

			// Fade out the current picture
			$('div.pictureHolder #fullResImageContainer').fadeOut(prettyPhoto.options['animationSpeed'],function(){
				$('.loaderIcon').show();
				
				// Preload the neighbour images
				prettyPhoto.preload();
			});
			
			prettyPhoto.hideTitle();
			$('div.pictureHolder .hoverContainer').fadeOut(prettyPhoto.options['animationSpeed']);
			$('div.pictureHolder .details').fadeOut(prettyPhoto.options['animationSpeed'],function(){
				prettyPhoto.checkPosition();
			});
		},
		previous: function(){
			// Change the current position
			prettyPhoto.arrayPosition--;
			prettyPhoto.setPosition--;

			// Fade out the current picture
			$('div.pictureHolder #fullResImageContainer').fadeOut(prettyPhoto.options['animationSpeed'],function(){
				$('.loaderIcon').show();
				
				// Preload the image
				prettyPhoto.preload();
			});

			prettyPhoto.hideTitle();
			$('div.pictureHolder .hoverContainer').fadeOut(prettyPhoto.options['animationSpeed']);
			$('div.pictureHolder .details').fadeOut(prettyPhoto.options['animationSpeed'],function(){
				prettyPhoto.checkPosition();
			});
		},
		checkPosition : function(){
			// If at the end, hide the next link
			(prettyPhoto.setPosition == prettyPhoto.setCount) ? $('div.pictureHolder a.next').hide() : $('div.pictureHolder a.next').show();
			
			// If at the beginning, hide the previous link
			(prettyPhoto.setPosition == 1) ? $('div.pictureHolder a.previous').hide() : $('div.pictureHolder a.previous').show();
			
			// Change the current picture text
			$('div.pictureHolder span.currentText span').text(prettyPhoto.setPosition);
			
			if (prettyPhoto.isSet) {
				if($(prettyPhoto.imagesArray[prettyPhoto.arrayPosition]).attr('title')){
					$('div.pictureHolder .description').html(unescape($(prettyPhoto.imagesArray[prettyPhoto.arrayPosition]).attr('title')));
				}else{
					$('div.pictureHolder .description').text('');
				};
				
				if($(prettyPhoto.imagesArray[prettyPhoto.arrayPosition]).find('img').attr('alt')){
					prettyPhoto.options['showTitle'] = true;
					$('div.prettyPhotoTitle .prettyPhotoTitleContent').html(unescape($(prettyPhoto.imagesArray[prettyPhoto.arrayPosition]).find('img').attr('alt')));
				}else{
					prettyPhoto.options['showTitle'] = false;
				};
			}else{
				if($(prettyPhoto.imagesArray[prettyPhoto.arrayPosition]).attr('title')){
					$('div.pictureHolder .description').html(unescape($(prettyPhoto.caller).attr('title')));
				}else{
					$('div.pictureHolder .description').text('');
				};
				
				if($(prettyPhoto.imagesArray[prettyPhoto.arrayPosition]).find('img').attr('alt')){
					prettyPhoto.options['showTitle'] = true;
					$('div.prettyPhotoTitle .prettyPhotoTitleContent').html(unescape($(prettyPhoto.caller).find('img').attr('alt')));
				}else{
					prettyPhoto.options['showTitle'] = false;
				};
			};
		},
		centerPicture : function(){
			//Make sure the gallery is open
			if($('div.pictureHolder').size() > 0){
				
				var scrollPos = prettyPhoto.getScroll();
				
				$('div.pictureHolder').css({
					'top': ($(window).height()/2) + scrollPos['scrollTop'] - ($('div.pictureHolder').height()/2),
					'left': ($(window).width()/2) + scrollPos['scrollLeft'] - ($('div.pictureHolder').width()/2)
				});
				
				$('div.prettyPhotoTitle').css({
					'top' : $('div.pictureHolder').offset().top - 22,
					'left' : $('div.pictureHolder').offset().left + (prettyPhoto.options['padding']/2)
				});
			};
		},
		preload : function(){
			// Hide the next/previous links if on first or last images.
			prettyPhoto.checkPosition();
			
			// Set the new image
			imgPreloader = new Image();
			
			// Preload the neighbour images
			nextImage = new Image();
			if(prettyPhoto.isSet) nextImage.src = $(prettyPhoto.imagesArray[prettyPhoto.arrayPosition + 1]).attr('href');
			
			prevImage = new Image();
			if(prettyPhoto.isSet && prettyPhoto.imagesArray[prettyPhoto.arrayPosition - 1]) prevImage.src = $(prettyPhoto.imagesArray[prettyPhoto.arrayPosition - 1]).attr('href');

			$('div.pictureHolder .content').css('overflow','hidden');
			
			(prettyPhoto.isSet) ? $('div.pictureHolder #fullResImage').attr('src',$(prettyPhoto.imagesArray[prettyPhoto.arrayPosition]).attr('href')) : $('div.pictureHolder #fullResImage').attr('src',$(prettyPhoto.caller).attr('href'));

			imgPreloader.onload = function(){
				var correctSizes = prettyPhoto.resize(imgPreloader.width,imgPreloader.height);
				imgPreloader.width = correctSizes['width'];
				imgPreloader.height = correctSizes['height'];
				
				// Need that small delay for the anim to be nice
				setTimeout('prettyPhoto.showimage(imgPreloader.width,imgPreloader.height,'+correctSizes["containerWidth"]+','+correctSizes["containerHeight"]+','+correctSizes["contentWidth"]+')',500);
			};
			
			(prettyPhoto.isSet) ? imgPreloader.src = $(prettyPhoto.imagesArray[prettyPhoto.arrayPosition]).attr('href') : imgPreloader.src = $(prettyPhoto.caller).attr('href');
		},
		showimage : function(width,height,containerWidth,containerHeight,contentWidth){
			$('.loaderIcon').hide();
			
			$('div.pictureHolder .content').animate({'height':contentHeight},prettyPhoto.options['animationSpeed']);

			var scrollPos = prettyPhoto.getScroll();

			// Resize the holder
			$('div.pictureHolder').animate({
				'top': scrollPos['scrollTop'] + (($(window).height()/2) - (containerHeight/2)),
				'left': (($(window).width()/2) - (containerWidth/2)),
				'width':containerWidth
			},prettyPhoto.options['animationSpeed'],function(){
				$('#fullResImage').attr({
					'width':width,
					'height':height
				});

				// Show the nav elements
				prettyPhoto.shownav();

				$('div.pictureHolder .hoverContainer').height(height).width(width);

				// Fade the new image
				$('div.pictureHolder #fullResImageContainer').fadeIn(prettyPhoto.options['animationSpeed']);
			});	
		},
		shownav : function(){
			if(prettyPhoto.isSet) $('div.pictureHolder .hoverContainer').fadeIn(prettyPhoto.options['animationSpeed']);
			$('div.pictureHolder .details').fadeIn(prettyPhoto.options['animationSpeed']);
			
			prettyPhoto.showTitle();
		},
		showTitle : function(){
			if(prettyPhoto.options['showTitle']){
				$('div.prettyPhotoTitle').css({
					'top' : $('div.pictureHolder').offset().top,
					'left' : $('div.pictureHolder').offset().left + (prettyPhoto.options['padding']/2),
					'display' : 'block'
				});
				
				$('div.prettyPhotoTitle div.prettyPhotoTitleContent').css('width','auto');
				
				if($('div.prettyPhotoTitle').width() > $('div.pictureHolder').width()){
					$('div.prettyPhotoTitle div.prettyPhotoTitleContent').css('width',$('div.pictureHolder').width() - (prettyPhoto.options['padding'] * 2));
				}else{
					$('div.prettyPhotoTitle div.prettyPhotoTitleContent').css('width','');
				};
				
				$('div.prettyPhotoTitle').animate({'top':($('div.pictureHolder').offset().top - 22)},prettyPhoto.options['animationSpeed']);
			};
		},
		hideTitle : function() {
			$('div.prettyPhotoTitle').animate({'top':($('div.pictureHolder').offset().top)},prettyPhoto.options['animationSpeed'],function() { $(this).css('display','none'); });
		},
		buildOverlay : function(){
			
			// Build the background overlay div
			backgroundDiv = "<div class='prettyPhotoOverlay'></div>";
 			$('body').append(backgroundDiv);
			$('div.prettyPhotoOverlay').css('height',$(document).height());
			$('.prettyPhotoOverlay').bind('click',function(){
				prettyPhoto.close();
			});
			
			// Basic HTML for the picture holder
			pictureHolder = '<div class="pictureHolder"><div class="top"><div class="left"></div><div class="middle"></div><div class="right"></div></div><div class="content"><div class="loaderIcon"></div><div class="hoverContainer"><a class="next" href="#">next</a><a class="previous" href="#">previous</a></div><div id="fullResImageContainer"><img id="fullResImage" src="" /></div><div class="details clearfix"><a class="close" href="#">Close</a><p class="description"></p><p class="currentTextHolder"><span class="currentText"><span>0</span>/<span class="total">0</span></span></p></div></div><div class="bottom"><div class="left"></div><div class="middle"></div><div class="right"></div></div></div>';
			
			// Basic html for the title holder
			titleHolder = '<div class="prettyPhotoTitle"><div class="prettyPhotoTitleLeft"></div><div class="prettyPhotoTitleContent"></div><div class="prettyPhotoTitleRight"></div></div>';

			$('body').append(pictureHolder).append(titleHolder);

			$('.pictureHolder,.titleHolder').css({'opacity': 0});
			$('a.close').bind('click',function(){ prettyPhoto.close(); return false; });
			
			$('.pictureHolder .previous').bind('click',function(){
				prettyPhoto.previous();
				return false;
			});
			
			$('.pictureHolder .next').bind('click',function(){
				prettyPhoto.next();
				return false;
			});

			$('.hoverContainer').css({
				'margin-left':prettyPhoto.options['padding']/2,
				'margin-right':prettyPhoto.options['padding']/2
			});
			
			// If it's not a set, hide the links
			if(!prettyPhoto.isSet) {
				$('.hoverContainer').hide();
				$('.currentTextHolder').hide();
			};

			// Then fade it in
			$('div.prettyPhotoOverlay').css('opacity',0);
			$('div.prettyPhotoOverlay').fadeTo(prettyPhoto.options['animationSpeed'],0.7, function(){
				$('div.pictureHolder').fadeTo(prettyPhoto.options['animationSpeed'],1,function(){
					// To fix an IE bug
					$('div.pictureHolder').attr('style','left:'+$('div.pictureHolder').css('left')+';top:'+$('div.pictureHolder').css('top')+';');
				});
			});
		},
		resize : function(width,height){
			$('div.pictureHolder .details').width(width); /* To have the correct height */
			$('div.pictureHolder .details p.description').width(width - parseFloat($('div.pictureHolder a.close').css('width'))); /* So it doesn't overlap the button */
			
			// Get the container size, to resize the holder to the right dimensions
			contentHeight = parseFloat($('div.pictureHolder .details').height()) + parseFloat($('div.pictureHolder .details').css('margin-top')) + parseFloat($('div.pictureHolder .details').css('margin-bottom'));
			containerHeight = contentHeight + parseFloat($('div.pictureHolder .top').height()) + parseFloat($('div.pictureHolder .bottom').height());
			containerWidth = parseFloat($('div.pictureHolder .content').css("padding-left")) + parseFloat($('div.pictureHolder .content').css("padding-right")) + prettyPhoto.options['padding'];
			
			var newWidth = width;
			var newHeight = height;
			
			// If there's a title, take it into consideration unpon resizing
			if(prettyPhoto.options['showTitle']) containerHeight -= 22;
			
			if((containerWidth + width) > $(window).width() || (containerHeight + height) > $(window).height()) {
				// Get the original geometry and calculate scales
				var xscale=(width+containerWidth + 100)/$(window).width();
				var yscale=(height+containerHeight + 100)/$(window).height();
			
				// Recalculate new size with default ratio
				if (yscale>xscale){
					newWidth = Math.round(width * (1/yscale));
					newHeight = Math.round(height * (1/yscale));
				} else {
					newWidth = Math.round(width * (1/xscale));
					newHeight = Math.round(height * (1/xscale));
				};
			};

			// Get the container size, to resize the holder to the right dimensions
			containerHeight += newHeight;
			contentHeight += newHeight;
			containerWidth += newWidth;
		
			$('div.pictureHolder .details').width(newWidth); /* To have the correct height */
			$('div.pictureHolder .details p.description').width(newWidth - parseFloat($('div.pictureHolder a.close').css('width'))); /* So it doesn't overlap the button */

			return {
				width:newWidth,
				height:newHeight,
				containerHeight:containerHeight,
				containerWidth:containerWidth,
				contentHeight:contentHeight
			};
		},
		resizeOverlay : function() {
			$('div.prettyPhotoOverlay').css({
				'height':$(document).height(),
				'width':$(window).width()
			});
		},
		getScroll : function(){
			scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || 0;
			return {scrollTop:scrollTop,scrollLeft:scrollLeft};
		},
		close : function(){
			$('div.pictureHolder,div.prettyPhotoTitle').fadeTo(prettyPhoto.options['animationSpeed'],0, function(){
				$('div.prettyPhotoOverlay').fadeTo(prettyPhoto.options['animationSpeed'],0, function(){
					$('div.prettyPhotoOverlay').remove();
					$('div.pictureHolder').remove();
				});
			});
		}
	}