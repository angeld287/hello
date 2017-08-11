// Starrr plugin (https://github.com/dobtco/starrr)
var __slice = [].slice;

(function($, window) {
  var Starrr;

  Starrr = (function() {
    Starrr.prototype.defaults = {
      rating: void 0,
      numStars: 5,
      change: function(e, value) {}
    };

    function Starrr($el, options) {
      var i, _, _ref,
        _this = this;

      this.options = $.extend({}, this.defaults, options);
      this.$el = $el;
      _ref = this.defaults;
      for (i in _ref) {
        _ = _ref[i];
        if (this.$el.data(i) != null) {
          this.options[i] = this.$el.data(i);
        }
      }
      this.createStars();
      this.syncRating();
      this.$el.on('mouseover.starrr', 'span', function(e) {
        return _this.syncRating(_this.$el.find('span').index(e.currentTarget) + 1);
      });
      this.$el.on('mouseout.starrr', function() {
        return _this.syncRating();
      });
      this.$el.on('click.starrr', 'span', function(e) {
        return _this.setRating(_this.$el.find('span').index(e.currentTarget) + 1);
      });
      this.$el.on('starrr:change', this.options.change);
    }

    Starrr.prototype.createStars = function() {
      var _i, _ref, _results;

      _results = [];
      for (_i = 1, _ref = this.options.numStars; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--) {
        _results.push(this.$el.append("<span class='glyphicon .glyphicon-star-empty'></span>"));
      }
      return _results;
    };

    Starrr.prototype.setRating = function(rating) {
      if (this.options.rating === rating) {
        rating = void 0;
      }
      this.options.rating = rating;
      this.syncRating();
      return this.$el.trigger('starrr:change', rating);
    };

    Starrr.prototype.syncRating = function(rating) {
      var i, _i, _j, _ref;

      rating || (rating = this.options.rating);
      if (rating) {
        for (i = _i = 0, _ref = rating - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          this.$el.find('span').eq(i).removeClass('glyphicon-star-empty').addClass('glyphicon-star');
        }
      }
      if (rating && rating < 5) {
        for (i = _j = rating; rating <= 4 ? _j <= 4 : _j >= 4; i = rating <= 4 ? ++_j : --_j) {
          this.$el.find('span').eq(i).removeClass('glyphicon-star').addClass('glyphicon-star-empty');
        }
      }
      if (!rating) {
        return this.$el.find('span').removeClass('glyphicon-star').addClass('glyphicon-star-empty');
      }
    };

    return Starrr;

  })();
  return $.fn.extend({
    starrr: function() {
      var args, option;

      option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this.each(function() {
        var data;

        data = $(this).data('star-rating');
        if (!data) {
          $(this).data('star-rating', (data = new Starrr($(this), option)));
        }
        if (typeof option === 'string') {
          return data[option].apply(data, args);
        }
      });
    }
  });
})(window.jQuery, window);

$(function() {
  return $(".starrr").starrr();
});

$( document ).ready(function() {
      
  $('#stars').on('starrr:change', function(e, value){
    $('#count').html(value);
    //alert(value);
    //El campo value contiene el valor de rating elegido por el usuario.
    var id_rest = window.location.search.substring(1);
    id_rest = id_rest.replace('id=','');
    var dataString="user_voted="+localStorage.getItem("userId")+"&restaurant_voted="+id_rest+"&number_voted="+value+"&insert=";
	//alert(dataString);
    
    $.ajax({
 		 type: "POST",
 		 url: "http://35.192.11.211/Restaurant_Recomend/database/restaurant_management/insert_rating.php",
 		 data: dataString,
 		 crossDomain: true,
 		 cache: false,
 		 beforeSend: function(){},
 		 success: function(data){
 			 if(data=="success"){
 				 	//esconder botacion de usuario
 				 //alert("done");
 				 $("#stars").fadeOut("slow");
 				SetearValorGeneral();
 				 }
 				 else if(data=="error"){
 					 alert("error php");
 				 }
 			 }
 		 });
    
    function SetearValorGeneral(){
    	//setea valor general al rating
    	var dataString = window.location.search.substring(1);
		var url = 'http://35.192.11.211/Restaurant_Recomend/database/restaurant_management/return_rating_x_rest.php'
		//alert(dataString);
			$("#stars-existing").empty();
		$.ajax({
			type: "GET",
			url: url,
			data: dataString,
			dataType: "json",
			crossDomain: true,
			cache: false,
			beforeSend: function(){},
			success: function(result){
				if(result == 0){
					for(i = 0; i < 5; i++){
						 $("#stars-existing").append("<span class='glyphicon glyphicon-star-empty'></span>");
					 }
				}else {
					$.each(result, function(i, field){
						 //alert();
						 for(i = 0; i < 5; i++){
							 if(i < field.number_voted - 1){
								 $("#stars-existing").append("<span class='glyphicon glyphicon-star'></span>");
							 }else{
								 $("#stars-existing").append("<span class='glyphicon glyphicon-star-empty'></span>"); 
							 }
						 }
						 $("#count-existing").empty();
						 $("#count-existing").append(field.number_voted);
						 //$('.starrr').attr('data-rating', "4");
					});
				}
			},
			error: function(request, status, error){
				alert(request.responseText+" | "+status+" | "+error);
			}				
		});
    }
  });
  
  $('#stars-existing').on('starrr:change', function(e, value){
    $('#count-existing').html(value);
  });
  
});