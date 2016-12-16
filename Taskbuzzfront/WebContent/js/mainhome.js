
var taskbuzz=angular.module('taskbuzz',['ngRoute']);
 taskbuzz.config(function($routeProvider)
{
	 $routeProvider.when("/register",
			 {
		 templateUrl:"slides/register.html",
		 controller:"registerController"
			 }
	 		)
	 		
	 		.when("/login",
	 				{
	 			templateUrl:"slides/login.html",
	 			controller:"loginController"
	 				})
	 				
	 				.when("/logout",
	 				{
	 			templateUrl:"slides/logout.html",
	 			controller:"logoutController"
	 				})
	 				
	 				.when("/userHome",
	 		    			{
	 		    		templateUrl:"slides/userHome.html",
	 		    		controller:"userHomeController"
	 		    			}
	 		    			)
	 		    			
	 		    .when("/viewMyTasks",
	 		    		{
	 		    	templateUrl:"slides/tasks.html",
	 		    	controller:"taskController"
	 		    		})
	 		    			
}		 
 );
 
 taskbuzz.controller('registerController',function($scope,$http)
{
	 console.log("i am in register");
	 
	 $scope.register=function()
	 {
		 var user={
				 username:$scope.username,
		         password:$scope.password,
			     mobile:$scope.mobile
		 };
		 var res=$http.post("http://localhost:8354/Taskbuzz/registerUser",user);
 		res.success(function(data, status, headers,config){
 			console.log("status:"+status);
	 });
	 }
	 
}		 
 );
 
 
 taskbuzz.controller("loginController",['$scope','$http','$location','$rootScope',function($scope,$http,$location,$rootScope)		
                             		   {
                             	   console.log("in login controller");
                             	   $scope.login=function()
                             	   {
                             		   var login={
                             				   username:$scope.username,
                             				   password:$scope.password   
                             		   };
                             		   $http.post('http://localhost:8354/Taskbuzz/authenticate',login).then(function (response) {
                             				 console.log("result   data:"+response.data);
                             				 var r=response.data.toString();
                             				 console.log("response:"+r);
                             			     
                             					if(r==1)
                             						{
                             						
                             						$rootScope.login=false;
                             						$rootScope.register=false;
                             						$rootScope.logout=true;
                             						$rootScope.viewMyTasks=true;
                             						
                             						console.log('logout:'+$rootScope.logout);
                             						console.log("wat is this ya:"+response.data);
                             						console.log("uname from root scope:"+$rootScope.uname);
                             						console.log("username:"+$scope.username);
                             						$rootScope.uname=$scope.username;
                             						console.log("uname:"+$rootScope.uname);
                             						$location.path('/userHome');
                             						}
                             					if(r==0)
                             						{
                             						$scope.username="";
                             						$scope.password="";
                             						$scope.message="username/password incorrect";
                             						$location.path('/login');
                             						}
                             							
                             		   });
                             	   }
                             		   }]
                                );
                      
 taskbuzz.controller("userHomeController", function($scope,$http,$rootScope)
{
 console.log("userhome")	; 
}		 
 );
 
 
  taskbuzz.controller("taskController",function($scope,$http,$rootScope)	
			{	
	  $rootScope.login=false;
		$rootScope.register=false;
		$rootScope.logout=true;
		$rootScope.viewMyTasks=true;
				 $http.get("http://localhost:8354/Taskbuzz/viewMyTasks/"+$rootScope.uname).then(function (response) 
						 {$scope.tasks = response.data;});
				
				console.log("In Controller");
				$scope.addTask=function()
				{
					console.log("unameis:"+$rootScope.uname);
					var dataObj = {
			    			task:$scope.task,
			    			discription:$scope.discription,
			    			duedate:$scope.duedate,
			 				posted_by:$rootScope.uname
			 		}
					console.log("title:"+dataObj);
					var res = $http.post("http://localhost:8354/Taskbuzz/addTask",dataObj);
					$http.get("http://localhost:8354/Taskbuzz/viewMyTasks/"+$rootScope.uname).then(function (response) {$scope.tasks = response.data;});
				    res.success(function(data, status, headers, config) {
				    $scope.message = data;
				 	console.log("status:"+status);
				 		});
				};
				
				
			
				$scope.editTask=function(mytask)
				{
					console.log("inside updatetask");
					console.log("task:"+mytask);
					$scope.dataToEdit=mytask;
				}
				$scope.saveEdit=function()
				{
					var dataObj = {
							task_Id:$scope.dataToEdit.task_Id,
			    			task:$scope.dataToEdit.task,
			    			discription:$scope.dataToEdit.discription,
			    			duedate:$scope.dataToEdit.duedate,
			 				posted_by:$rootScope.uname
			 		};
					$http.put('http://localhost:8354/Taskbuzz/updateTask', dataObj);
					$http.get("http://localhost:8354/Taskbuzz/viewMyTasks/"+$rootScope.uname)
			 	    .then(function (response) {$scope.tasks= response.data;});
				}
				$scope.deleteTask=function(dataToEdit)
				{
					console.log("delete task called");
					console.log("task"+$scope.dataToEdit.task_Id);
					var del=
						{
					task_Id:$scope.dataToEdit.task_Id
						}
					console.log("task_Id:"+$scope.dataToEdit.task_Id);
					$http.post('http://localhost:8354/Taskbuzz/deleteTask/',del);
					 $http.get("http://localhost:8354/Taskbuzz/viewMyTasks/"+$rootScope.uname)
				 	    .then(function (response) {$scope.tasks = response.data;});
				}
				
				$scope.finnot=function(mytask)
				{
					console.log("inside finnot");
					console.log("mytask:"+mytask);
					$scope.taskstatus=mytask;
					
				}
				$scope.finishedTask=function()
				{
					console.log("posted by:"+$scope.taskstatus.posted_by);
					console.log("in finnot");
					var edit=
						{
							task_Id:$scope.taskstatus.task_Id,
							task:$scope.taskstatus.task,
							discription:$scope.taskstatus.discription,
							posted_by:$scope.taskstatus.posted_by,
							duedate:$scope.taskstatus.duedate,
							status:true
						}
					
					$http.put("http://localhost:8354/Taskbuzz/updateTask",edit);
					 $http.get("http://localhost:8354/Taskbuzz/viewMyTasks/"+$rootScope.uname)
					    .then(function (response) {
					    	
					    	$scope.tasks = response.data;
					    	
					    	console.log("data:"+response.data);
					    });
				}
				$http.get("http://localhost:8354/Taskbuzz/viewTasks/"+$rootScope.uname)
			    .then(function (response) {
			    	
			    	$scope.notasks = response.data;
			    	
			    	console.log("data:"+response.data);
			    });
			});
  
  taskbuzz.controller("logoutController",function($scope,$rootScope)
		  {
	  
	  $rootScope.login=true;
		$rootScope.register=true;
		$rootScope.logout=false;
		$rootScope.viewMyTasks=false;
		  });
                                