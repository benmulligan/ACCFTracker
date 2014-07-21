(function(){

	var app = angular.module("cityFolk", []);
	
	app.factory("FishDataService", function() {
		var ref = new Firebase("https://crackling-fire-2826.firebaseio.com/accf/fish");
		return {
			getFish: function() 
			{
				var fish = [];
				ref.on("child_added", function(snapshot) {
					fish.push(snapshot.val());
				});
				return fish;
			}	,
			addFish: function(fish) {
				ref.push(fish);
			}
		}
	});
	
	app.factory("BugDataService", function() {
		var ref = new Firebase("https://crackling-fire-2826.firebaseio.com/accf/bugs");
		return {
			getBugs: function() 
			{
				var bugs = [];
				ref.on("child_added", function(snapshot) {
					bugs.push(snapshot.val());
				});
				return bugs;
			}	,
			addBug: function(bug) {
				ref.push(bug);
			}
		}
	});

	app.controller("cityFolkController", [ "FishDataService", "BugDataService", function(fishService, bugService){
	
	//	var cfCtrl = this;
	
		//$scope.user = "Guest " + Math.round(Math.random()*101);
		
		this.allFish = fishService.getFish();
		this.allBugs = bugService.getBugs();

		this.showAddFish = true;
		this.showAddBug = true;
		
		this.currentFish = [];
		this.addFish = function(){
			fishService.addFish(this.currentFish);
			this.currentFish = [];
		}
		
		this.currentBug = [];
		this.addBug = function(){
			bugService.addBug(this.currentBug);
			this.currentBug = [];
		}
	}]);
	
	app.directive("fishTable", function()
	{
		return {
			restrict: 'E',
			templateUrl: 'fish-table.html'
		};
	});
	
	app.directive("addFishForm", function()
	{
		return {
			restrict: 'E',
			templateUrl: 'addfishform.html'
		};
	});
	
	app.directive("addBugForm", function()
	{
		return {
			restrict: 'E',
			templateUrl: 'addbugform.html'
		};
	});
	
	
	app.directive("bugTable", function()
	{
		return {
			restrict: "E",
			templateUrl: 'bugTable.html'
		};
	});
	

	
	app.controller("tabController", function(){
	
		this.activeTab = 0;
		this.setTab = function(index) { this.activeTab = index; };
		this.tabIsActive = function(index) { return this.activeTab === index;};
	
	});
	


	
	var fishData = [
		{name : "Carp", sellPrice: "100"},
		{name: "Bass", sellPrice: "200"}
	];

	var bugData = [
		{name : "Bee", sellPrice: "100"},
		{name: "Ant", sellPrice: "200"}
	];






})();