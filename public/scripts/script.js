var $docu = $(document);
var $main = $('#main');
var bodyHeight = $docu.height();
var body = $('html, body');

$(window).scroll(function () {
    var rotate = ($docu.scrollTop() / bodyHeight * 360) * 2;
    $('#logo-text').css({ 'transform': 'rotate(' + rotate + 'deg)'});
});



var nav = $('#info nav');
var animateTime = 350;
$('#menu-btn').click(function(){
  if(nav.height() === 0){
    autoHeightAnimate(nav, animateTime);
  } else {
    nav.stop().animate({ height: '0' }, animateTime);
  }
});

/* Function to animate height: auto */
function autoHeightAnimate(element, time){
    var curHeight = element.height(), // Get Default Height
        autoHeight = element.css('height', 'auto').height(); // Get Auto Height
        element.height(curHeight); // Reset to Default Height
        element.stop().animate({ height: autoHeight }, parseInt(time)); // Animate to Auto Height
}

$('#hire-btn').click(function() {
  $("html, body").animate({ scrollTop: $(document).height() }, 500, function() {
    $('#form-name').focus();
  });
});
$('input[type=text], textarea').focus( function(){
  $(this).css({'border-color':'#4183D7'});
});
$('input[type=text], textarea').blur( function(){
  $(this).css({'border-color':'#CCC'});
});

$('#submit').click(function(){
  var error = false;
  var name = $('#form-name').val();
  var email = $('#form-email').val();
  var message = $('#form-message').val();
  if(!name.length) {
    error = true;
    $('#form-name').css({'border-color':'#C0392B'});
  }
  if(!isValidEmailAddress(email)) {
    error = true;
    $('#form-email').css({'border-color':'#C0392B'});
  }
  if(!message.length) {
    error = true;
    $('#form-message').css({'border-color':'#C0392B'});
  }
  if(!error) {
    $.post('/lets-work-together',
        {name: name, email: email, message: message},
        function( data ) {
      });
      $('#form-name').val('');
      $('#form-message').val('');
      $('#form-email').val('');
      $('#form-notify').fadeIn('slow').delay('15000').fadeOut('slow');
  }
});
function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
$('#age').text(getAge("1986/11/06"));
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};

/* Function to animate height: auto */
function autoHeightAnimate(element, time){
    var curHeight = element.height(), // Get Default Height
        autoHeight = element.css('height', 'auto').height(); // Get Auto Height
          element.height(curHeight); // Reset to Default Height
          element.stop().animate({ height: autoHeight }, parseInt(time)); // Animate to Auto Height
}

$('.picture').each( function() {
    var $pic     = $(this),
        getItems = function() {
            var items = [];
            $pic.find('a').each(function() {
            var href = $(this).attr('href');
            var img = new Image();
            img.onload = function() {
                var item = {
                    src : href,
                    w   : this.width,
                    h   : this.height
                }
 
                items.push(item);
              }
              
              
              img.src = href;

            });
            return items;
        }
 
    var items = getItems();
    var $pswp = $('.pswp')[0];
  $pic.on('click', 'figure', function(event) {
      event.preventDefault();
       
      var $index = $(this).index();
      var options = {
          index: $index,
          bgOpacity: 0.7,
          showHideOpacity: true
      }
       
      // Initialize PhotoSwipe
      var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
      lightBox.init();
  });
});

