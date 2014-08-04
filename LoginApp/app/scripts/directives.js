angular.module('loginAppApp.directives', [])
	.directive('d3Bars', ['d3Service', function(d3Service){
		return {
			restrict: 'EA',
			scope: {
				data: '=' // bi-directional data-binding
			},
			link: function(scope, element, attrs){
				d3Service.d3().then(function(d3){
					var margin = parseInt(attrs.margin) || 20,
						barHeight = parseInt(attrs.barHeight) || 20,
						barPadding = parseInt(attrs.barPadding) || 5;
					var svg = d3.select(element[0])
								.append("svg")
								.style("width", "100%");
								
					// Browser onresize event
		          	window.onresize = function() {
		            	scope.$apply();
		          	};
		 

		          	var data = attrs.monthData.replace(/[\[*\]*"*]/g, "").split(',');

		          	// data
		          	var whichMonths = [];
      	            var monthCounts = [];

      	            for (var i = 0; i < data.length; i++) {
      	                if(whichMonths.indexOf(data[i]) == -1){
      	                    whichMonths.push(data[i]);
      	                    monthCounts.push(1);
      	                }
      	                for (var j = 0; j < whichMonths.length; j++) {
      	                    if(data[i] == whichMonths[j]){
      	                        monthCounts[j]++;
      	                    }  
      	                };
      	            };
      	            scope.barChartData = [];

      	            for (var i = 0; i < monthCounts.length; i++) {
      	                scope.barChartData.push({
      	                    count: monthCounts[i]-1,
      	                    month: whichMonths[i]
      	                })
      	            };

		          	// Watch for resize event
		          	scope.$watch(function() {
		            	return angular.element(window)[0].innerWidth;
		          	}, function() {
		            	scope.render(scope.barChartData);
		          	});

		          	$('.graphTab').click(function(){
		          		return angular.element(window)[0].innerWidth;
		          	}, function(){
		          		scope.render(scope.barChartData);
		          	})

		          	scope.$watch('data', function(newVals, oldVals) {
		          		return scope.render(newVals);
		          	}, true);

		          	scope.render = function(data) {
		          		// remove all previous items before render
		            	svg.selectAll('*').remove();

		            	//if we dont pass any data return out of the element
		            	if(!data) return;

		            	//set up variables
		            	var width = d3.select(element[0]).node().offsetWidth - margin,
		            		//calculate the height
		            		height = data.length * (barHeight + barPadding),
		            		//use the category20() scale function for multicolor support
		            		color = d3.scale.category20(),
		            		//our xScale
		            		xScale = d3.scale.linear()
		            			.domain([0, d3.max(data, function(d){
		            				return d.count;
		            			})])
		            			.range([0, width]);

		            	//set the height b ased on the calculations above
		            	svg.attr('height', height);

		            	//create rectangles for barchart
		            	svg.selectAll('rect')
		            		.data(data).enter()
		            			.append('rect')
		            			.attr('height', barHeight)
		            			.attr('width', function(d){
		            				return xScale(d.count);
		            			})
		            			.attr('x', Math.round(margin/2))
		            			.attr('y', function(d,i){
		            				return i* (barHeight+barPadding);
		            			})
		            			.attr('fill', function(d) {return color(d.count)})
		          	}
		          	scope.render(scope.barChartData);
				})
			}
		}
	}])
	.directive('card', function(){
		return {
			restrict: 'E',
			templateUrl: '../views/main.html',

		}
	})