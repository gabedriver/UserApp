'use strict';

/**
 * @ngdoc function
 * @name loginAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the loginAppApp
 */
angular.module('loginAppApp')
	.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
        $http.get("../data/userData.json").success(function(data){
        	$scope.data = data;
        	$scope.users = [];
        	for (var i = 0; i < data.length; i++) {
        		var currentUser = data[i].User;
        		if($scope.users.length > 0){
        			var length = $scope.users.length;
        			for (var k = 0; k < $scope.users.length; k++) {
        				if($scope.users[k].name == currentUser){
                            // console.log($scope.users[k]);
        					$scope.users[k].average_number_of_requests_per_login.push(data[i]['Average number of Requests  per login']);
		        			$scope.users[k].average_number_of_users_per_day.push(data[i]['Average number of Users per Day']);
		        			$scope.users[k].month.push(data[i].Month);
		        			$scope.users[k].number_of_cancelled_jobs.push(data[i]['Number of Cancelled jobs']);
		        			$scope.users[k].number_of_requests.push(data[i]['Number of Requests']);
		        			$scope.users[k].number_of_sessions.push(data[i]['Number of Sessions']);
		        			$scope.users[k].number_of_reports_touched.push(parseInt(data[i]['Number of reports touched']));
                            $scope.users[k].reports.push(data[i].Report);
		        			$scope.users[k].report_types.push(data[i]['Type Of Report']);
		        			$scope.users[k].weekdays.push(data[i].Weekday);
		        			break;
        				} else if(k == $scope.users.length-1){
        					$scope.users.push({
		        				name: currentUser,
		        				average_number_of_requests_per_login: [data[i]['Average number of Requests  per login']],
		        				average_number_of_users_per_day: [data[i]['Average number of Users per Day']],
		        				month: [data[i].Month],
		        				number_of_cancelled_jobs: [data[i]['Number of Cancelled jobs']],
		        				number_of_requests: [data[i]['Number of Requests']],
		        				number_of_sessions: [data[i]['Number of Sessions']],
		        				number_of_reports_touched: [parseInt(data[i]['Number of reports touched'])],
		        				reports: [data[i].Report],
                                report_types: [data[i]["Type Of Report"]],
		        				weekdays: [data[i].Weekday]
        					})
        					break;
        				}
        			};
        		} else {
        			$scope.users.push({
        				name: currentUser,
        				average_number_of_requests_per_login: [data[i]['Average number of Requests  per login']],
        				average_number_of_users_per_day: [data[i]['Average number of Users per Day']],
        				month: [data[i].Month],
        				number_of_cancelled_jobs: [data[i]['Number of Cancelled jobs']],
        				number_of_requests: [data[i]['Number of Requests']],
        				number_of_sessions: [data[i]['Number of Sessions']],
        				number_of_reports_touched: [parseInt(data[i]['Number of reports touched'])],
        				reports: [data[i].Report],
                        report_types: [data[i]["Type Of Report"]],
        				weekdays: [data[i].Weekday]
        			})
        		}
        	};
            
            $scope.firstHalf = $scope.users.slice(0, $scope.users.length/2);
            $scope.secondHalf = $scope.users.slice($scope.users.length/2, $scope.users.length);
            console.log($scope.secondHalf);
            console.log($scope.firstHalf);
        	$scope.list = [
        		"Jonny",
        		"bobby",
        		"willa",
        		"scout"
        	]
			var navBar = $('.navbar');
            //change the styling of the navbar after scrolling down a bit
			$(document).scroll(function() {
			    navBar.css({boxShadow: $(this).scrollTop()>2 ? "0px 4px 20px -5px #727872":"none",
                            opacity: ".95"
                        });
			});
            $scope.averageOf = function(array){
                var total = 0;
                for (var i = 0; i < array.length; i++) {
                    total += array[i];
                };
                total = total/(array.length);
                // console.log(total);
                return total;
            }
            $scope.typesOfReports = [];
            for (var i = 0; i < data.length; i++) {
                if($scope.typesOfReports.indexOf(data[i]["Type Of Report"]) == -1){
                    $scope.typesOfReports.push(data[i]["Type Of Report"]);
                } else {
                    continue;
                }
            };

            $scope.totalOf = function(array, type){
                var count = 0;
                for (var i = 0; i < array.length; i++) {
                    if(array[i] == type){
                        count++;
                    }
                };
                return count;
            }
            console.log($scope.typesOfReports);

            $scope.reportFilter = function(obj){
                $scope.dropdownString = obj;
                console.log($("#filterTitle"));
                console.log(obj.length);
                if(obj.length === 0){
                    $("#filterTitle").html('Filter By Report <span class="caret"></span>');
                } else {
                    $("#filterTitle").html(obj + ' <span class="caret"></span>');
                }
            }
                
            $scope.reportDetail = $(".reportDetail");

            $scope.reportDetail.click(function(){
                console.log($(this));
            })

            $("#background").style("width", function(){
                return $(window).innerWidth;
            })
            .style("height", function(){
                return $(window).innerHeight;
            })

            // $scope.drawBarChart = function(months){

            //     var margin = {
            //         top: 5,
            //         right: 5,
            //         bottom: 5,
            //         left: 5
            //     };

            //     var barWidth = 300 - margin.left - margin.right;
            //     var barHeight = 200 - margin.top - margin.bottom;

            //     var parseDate = d3.time.format("%x").parse;

            //     var x = d3.scale.ordinal()
            //         .rangeRoundBands([0, barWidth], .1);

            //     var y = d3.scale.linear()
            //         .range([barHeight, 0]);

            //     var xAxis = d3.svg.axis()
            //         .scale(x)
            //         .orient("bottom");

            //     var yAxis = d3.svg.axis()
            //         .scale(y)
            //         .orient("right");

            //     var svg = d3.select(".monthChart").append("svg")
            //         .attr('class', 'barSvg')
            //         .attr("width", barWidth + margin.left + margin.right)
            //         .attr("height", barHeight + margin.top + margin.bottom)
            //         .append("g")
            //         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            //     var whichMonths = [];
            //     var monthCounts = [];

            //     for (var i = 0; i < months.length; i++) {
            //         if(whichMonths.indexOf(months[i]) == -1){
            //             whichMonths.push(months[i]);
            //             monthCounts.push(1);
            //         }
            //         for (var j = 0; j < whichMonths.length; j++) {
            //             if(months[i] == whichMonths[j]){
            //                 monthCounts[j]++;
            //             }  
            //         };
            //     };
            //     console.log(monthCounts);

            //     var data = [];

            //     for (var i = 0; i < monthCounts.length; i++) {
            //         data.push({
            //             count: monthCounts[i],
            //             month: whichMonths[i]
            //         })
            //     };
            //     console.log(data);

            //     x.domain(whichMonths);
            //     y.domain([0, getMaxOfArray(monthCounts)]);

            //     console.log('checkpoint 3')

            //     svg.selectAll(".bar")
            //         .data(data)
            //         .enter().append("rect")
            //             .attr("class", "bar")
            //             .attr("x", function(d) {
            //                 console.log("checkpoint 4")
            //                 return x(d.month) + x.rangeBand();
            //              })
            //             .attr("width", x.rangeBand() / 2)
            //             .attr("y", function(d) {
            //                 return barHeight - y(getMaxOfArray(monthCounts))
            //             })
            //             .attr("height", 0)
            //             .transition()
            //             .duration(700).ease("elastic")
            //             .delay(function(d, i) {
            //                 return 50 * i;
            //             })
            //             .attr("y", function(d) {
            //                 console.log("checkpoint 6")
            //                 return y(d.count);
            //             })
            //             .attr("height", function(d) {
            //                 return barHeight - y(d.count);
            //             })

            // }
            function getMaxOfArray(numArray) {
              return Math.max.apply(null, numArray);
            }
      	});
	}]);

