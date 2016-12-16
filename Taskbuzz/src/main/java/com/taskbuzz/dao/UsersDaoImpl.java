package com.taskbuzz.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.taskbuzz.model.Users;

@Transactional
@Repository
public class UsersDaoImpl implements UsersDao {

	@Autowired
	SessionFactory sessionfactory;
	public void saveUser(Users user) {
		
		sessionfactory.getCurrentSession().save(user);
		
	}
	public int validateUser(String username, String password) {
	
	int res=0;
		
		Session session=sessionfactory.getCurrentSession();
		Query result=session.createQuery("from Users u where u.username='"+username+"'");
		List<Users> users=result.list();
		System.out.println("user:"+users);
		if(users.size()==0){
			res=0;
		}
		else
		{
		for(int i=0;i<users.size();i++)
		{
			System.out.println("inside for loop");
			String dbuserName=users.get(i).getUsername();
			String dbpassword=users.get(i).getPassword();
			
			if(dbuserName.equals(username)&&dbpassword.equals(password))
			{
				res=1;
				System.out.println("result is:"+res);
			}
			
		}
		}
		return res;
	}
	
	

}
