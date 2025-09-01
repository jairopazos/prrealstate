package com.tfm.inmopr;

import com.tfm.inmopr.model.entities.User;
import com.tfm.inmopr.model.entities.UserDao;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class UserServiceTest {

    @Autowired
    private UserDao userDao;

    // ==== Helper ============================================================
    private User buildUser(String email, String firstName) {
        User u = new User();
        u.setEmail(email);
        u.setFirstName(firstName);
        u.setLastName("Tester");
        u.setPassword("pwd"); // en tests no encriptamos
        return u;
    }

    // ==== Casos =============================================================

    @Test
    void save_and_findById_ok() {
        User saved = userDao.save(buildUser("alice@test.com", "Alice"));
        assertNotNull(saved.getId());

        Optional<User> found = userDao.findById(saved.getId());
        assertTrue(found.isPresent());
        assertEquals("alice@test.com", found.get().getEmail());
        assertEquals("Alice", found.get().getFirstName());
    }

    @Test
    void update_persists_changes() {
        User saved = userDao.save(buildUser("bob@test.com", "Bob"));

        saved.setFirstName("Bobby");
        saved.setLastName("Updated");
        User updated = userDao.save(saved);

        assertEquals(saved.getId(), updated.getId());
        assertEquals("Bobby", updated.getFirstName());
        assertEquals("Updated", updated.getLastName());
    }

    @Test
    void delete_removes_user() {
        User saved = userDao.save(buildUser("to.delete@test.com", "ToDelete"));
        Long id = saved.getId();

        userDao.deleteById(id);

        assertTrue(userDao.findById(id).isEmpty());
    }
}
