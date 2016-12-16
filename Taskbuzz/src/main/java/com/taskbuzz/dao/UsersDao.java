package com.taskbuzz.dao;

import com.taskbuzz.model.Users;

public interface UsersDao {

	void saveUser(Users user);
	int validateUser(String username,String password);
}
