package com.taskbuzz.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.taskbuzz.dao.TaskDao;
import com.taskbuzz.model.Tasks;

@RestController
public class TaskController {
	
@Autowired
 
TaskDao taskdao;

@RequestMapping(value="/addTask",headers="accept=Application/json",method=RequestMethod.POST)

public void addTask(@RequestBody Tasks task){
	taskdao.addTask(task);
}

@RequestMapping(value="/updateTask",headers="accept=Application/json",method=RequestMethod.PUT)

public void updateTask(@RequestBody Tasks task)
{
	taskdao.updateTask(task);
}

@RequestMapping(value="/deleteTask",headers="accept=Application/json",method=RequestMethod.POST)

public void deleteTask(@RequestBody Tasks task)
{
	taskdao.deleteTask(task);
}

@RequestMapping(value="/viewMyTasks/{posted_by}",headers="accept=Application/json",method=RequestMethod.GET)
public List<Tasks> viewMyTasks(@PathVariable("posted_by") String posted_by)
{
	System.out.println("given name:"+posted_by);
	List<Tasks> tasks= taskdao.viewMyTasks(posted_by);
	return tasks;
}

@RequestMapping(value="/viewTasks/{posted_by}",headers="accept=Application/json",method=RequestMethod.GET)
public List<Tasks> viewTasks(@PathVariable("posted_by") String posted_by)
{
	System.out.println("given name:"+posted_by);
	List<Tasks> tasks= taskdao.viewTasks(posted_by);
	return tasks;
}
}
