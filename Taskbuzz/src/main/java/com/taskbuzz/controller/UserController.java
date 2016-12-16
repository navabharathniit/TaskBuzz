package com.taskbuzz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.taskbuzz.dao.UsersDao;
import com.taskbuzz.model.Users;

@RestController
public class UserController {

	@Autowired
	
	UsersDao usersdao;
	@RequestMapping (value="/registerUser",headers="accept=Application/json",method=RequestMethod.POST)
	public void registerUser(@RequestBody Users user){
		usersdao.saveUser(user);
}

	
	@RequestMapping(value="/authenticate", method=RequestMethod.POST,headers="Accept=application/json")
	 public int authenticateUser(@RequestBody Users users)
	 {
		 System.out.println("username:"+users.getUsername());
		 System.out.println("password:"+users.getPassword());
	int result=0;
		 result=usersdao.validateUser(users.getUsername(),users.getPassword());
		 System.out.println("result we have got is:"+result);
		 return result;
	 }

	}

