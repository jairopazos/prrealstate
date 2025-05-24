package com.tfm.inmopr.model.services;

import com.tfm.inmopr.model.entities.User;
import com.tfm.inmopr.model.entities.UserDao;
import com.tfm.inmopr.model.exceptions.DuplicateInstanceException;
import com.tfm.inmopr.model.exceptions.IncorrectLoginException;
import com.tfm.inmopr.model.exceptions.InstanceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private PermissionChecker permissionChecker;

    @Autowired
    private UserDao userDao;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly=true)
    public User login(String email, String password) throws IncorrectLoginException {

        Optional<User> user = userDao.findByEmail(email);

        if (!user.isPresent()) {
            throw new IncorrectLoginException(email, password);
        }

        if (!passwordEncoder.matches(password, user.get().getPassword())) {
            throw new IncorrectLoginException(email, password);
        }

        return user.get();

    }

    @Override
    public void signUp(User user) throws DuplicateInstanceException {

        if (userDao.existsByEmail(user.getEmail())) {
            throw new DuplicateInstanceException("project.entities.user", user.getEmail());
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userDao.save(user);

    }

    @Override
    public User updateProfile(Long id, String firstName, String lastName, String email, LocalDate birthDate, String password) throws InstanceNotFoundException {

        User user = permissionChecker.checkUser(id);

        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setBirthDate(birthDate);
        user.setPassword(password);

        return user;

    }
}
