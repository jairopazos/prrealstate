package com.tfm.inmopr.model.services;

import com.tfm.inmopr.model.entities.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.tfm.inmopr.model.entities.User;
import java.util.Optional;
import com.tfm.inmopr.model.exceptions.InstanceNotFoundException;

@Service
@Transactional(readOnly=true)
public class PermissionCheckerImpl implements PermissionChecker {
	
	@Autowired
	private UserDao userDao;

	@Override
	public void checkUserExists(Long userId) throws InstanceNotFoundException {
		
		if (!userDao.existsById(userId)) {
			throw new InstanceNotFoundException("project.entities.user", userId);
		}
		
	}

	@Override
	public User checkUser(Long userId) throws InstanceNotFoundException {

		Optional<User> user = userDao.findById(userId);
		
		if (!user.isPresent()) {
			throw new InstanceNotFoundException("project.entities.user", userId);
		}
		
		return user.get();
		
	}
}
