package com.taskbuzz.dao;

import java.util.List;

import com.taskbuzz.model.Tasks;

public interface TaskDao  {

	void addTask(Tasks task);
	
	void updateTask(Tasks task);
	
	void deleteTask(Tasks task);
	
	List<Tasks> viewMyTasks(String posted_by); //false
	
	List<Tasks> viewTasks(String posted_by);  //true
}
