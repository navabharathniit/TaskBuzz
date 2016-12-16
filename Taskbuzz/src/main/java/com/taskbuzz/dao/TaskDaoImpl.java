package com.taskbuzz.dao;


import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.taskbuzz.model.Tasks;

@Transactional
@Repository
public class TaskDaoImpl implements TaskDao {

	@Autowired
	SessionFactory sessionfactory;
	
	public void addTask(Tasks task) {
	
		sessionfactory.getCurrentSession().save(task);
	}

	public void updateTask(Tasks task) {
		sessionfactory.getCurrentSession().update(task);

	}

	public void deleteTask(Tasks task) {
		sessionfactory.getCurrentSession().delete(task);
		
	}

	public List<Tasks> viewMyTasks(String posted_by) {
		
			System.out.println("Inside the  viewMyTasks(String posted_by)");
			Session session=sessionfactory.getCurrentSession();
			Criteria crit=session.createCriteria(Tasks.class);
			crit.add(Restrictions.eq("posted_by",posted_by));
			crit.add(Restrictions.eq("status",false));
			List list=crit.list();
			System.out.println("list:"+list);
			return list;
		}

	public List<Tasks> viewTasks(String posted_by) {
		
		System.out.println("Inside the  viewTasks(String posted_by)");
		Session session=sessionfactory.getCurrentSession();
		Criteria crit=session.createCriteria(Tasks.class);
		crit.add(Restrictions.eq("posted_by",posted_by));
		crit.add(Restrictions.eq("status",true));
		List list=crit.list();
		System.out.println("list:"+list);
		return list;
	}
	
	}


