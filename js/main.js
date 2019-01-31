$(function(){
    
    $('.slideshow').each(function(){
        
        var $slides = $(this).find( ' img ' ),
            slideCount = $slides.length,
            currentIndex = 0;
        
        $slides.eq(currentIndex).fadeIn();
        
        setInterval(showNextSlide,7500);
        
        function showNextSlide(){
            
            var nextIndex = (currentIndex + 1)% slideCount;
            $slides.eq(currentIndex).fadeOut();
            
            $slides.eq(nextIndex).fadeIn();
            
            currentIndex = nextIndex;
        }
    });
});


$(function(){
    $('#gallery').each(function(){
        var $container = $(this);
        $container.masonry({
            columnWidth:230,
            gutter:10,
            itemSelector:'.gallery-item'
        });
        $.getJSON('../data/content.json',function(data){
            var elements = [];
            $.each(data,function(i,item){
                var itemHTML =
                    '<li class="gallery-item is-loading">'+
                    '<a href=" ' + item.images.large + ' ">'+
                    '<img src=" ' + item.images.thumb + ' " alt=" ' + item.title + ' ">'+
                    '</a>' + '</li>';
                elements.push($(itemHTML).get(0));
            });
            $container.append(elements);
            $container.imagesLoaded(function(){
                $(elements).removeClass('is-loading');
                $container.masonry('appended',elements);
            });
        });
    });
});