'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:commentList
 * @description
 * # commentList
 '{{postTimeElapsed(comment.createdate)}}'


Date is : Sun Sep 09 19:56:42 EDT 2007
Milliseconds since January 1, 1970, 00:00:00 GMT : 1189382202606
sampledata tested : 1448779680804 , 
1448956108356 -- current
1448955808356 -- 5min before
1448869408356  -- day ago
1448264608356  -- x days ago
 */
angular.module('commentList', ['comment'])
  .directive('commentList', function () {
    return {
      template: '<div class="commentList">' +
                  '<comment-model ng-repeat="comment in comments" author="{{comment.author}}">' +
                    '{{comment.msg}}' + '<span class="timeElapsed">' + 'Posted: '+ '{{postTimeElapsed(1448264608356)}}' +'</span>' +  
					/*
					When service return actual date & time for posted comment then we have to remove above hardcoded method ("postTimeElapsed(1448264608356)")
					to 	'{{postTimeElapsed(comment.createdate)}}'
					and rest of the flow will work as it is.
					*/
                  '</comment-model>' +
                  '<span ng-if="comments.length < 1">No comments yet</span>' +
                '</div>',
      restrict: 'E',
      scope: {
        comments: '='
      },
      link: function postLink(scope, element, attrs) {
		  scope.postTimeElapsed = function(postTime) {
			  var currentTime = new Date().getTime();
			  var posttimeelapsed_second = (currentTime - postTime)/1000;
			  var timeElapsed = "";
			  
			  var dayInSecond = (24*60*60);
			  
			  if(posttimeelapsed_second < 59){
				  timeElapsed = "1 Minute Ago"
			  }else if(posttimeelapsed_second > 59 && posttimeelapsed_second < (59*60)){ //59 minute = 59*60
				  timeElapsed = Math.floor(posttimeelapsed_second/60) + " Minutes ago"
			  }else if(posttimeelapsed_second > (59*60) && posttimeelapsed_second < dayInSecond){ //24 hour = 24*60*60
				  timeElapsed = "1 Day Ago"
			  }else if(posttimeelapsed_second >= dayInSecond){
				  timeElapsed = Math.floor(posttimeelapsed_second/dayInSecond) + " Days ago"
			  }
			  
                return timeElapsed ;
            }
	  }
    };
  });
