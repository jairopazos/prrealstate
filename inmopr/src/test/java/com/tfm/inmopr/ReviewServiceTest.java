package com.tfm.inmopr;

import com.tfm.inmopr.model.entities.Review;
import com.tfm.inmopr.model.entities.ReviewDao;
import com.tfm.inmopr.model.entities.User;
import com.tfm.inmopr.model.entities.UserDao;
import com.tfm.inmopr.model.exceptions.DuplicateInstanceException;
import com.tfm.inmopr.model.exceptions.InstanceNotFoundException;
import com.tfm.inmopr.model.services.ReviewService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests de ReviewService con el mismo estilo que el ejemplo aportado.
 * - SpringBootTest + ActiveProfiles("test") + @Transactional
 * - Se crean entidades con los DAO y se invoca a la capa de servicio.
 */
@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class ReviewServiceTest {

    private static final Long NON_EXISTENT_ID = -1L;

    @Autowired
    private UserDao userDao;

    @Autowired
    private ReviewDao reviewDao;

    @Autowired
    private ReviewService reviewService;

    // ==== Helpers ===========================================================

    private User createUser(String email, String firstName) {
        User u = new User();
        u.setEmail(email);
        u.setFirstName(firstName);
        u.setLastName("Test");
        u.setPassword("pwd"); // no se valida aquí; no se usa login
        return userDao.save(u);
    }

    // ==== Casos de prueba ===================================================

    @Test
    public void testCreateReviewAndFindByAdvertiser() throws Exception {
        // Arrange: anunciante y dos autores distintos
        User advertiser = createUser("ana.adv@test.com", "Ana");
        User author1 = createUser("beto.aut@test.com", "Beto");
        User author2 = createUser("carla.aut@test.com", "Carla");

        // Act: se crean dos reseñas para el mismo anunciante (orden: primero author1, luego author2)
        Review r1 = reviewService.createReview(advertiser.getId(), author1.getId(), 4, "  Muy buen trato  ");
        Review r2 = reviewService.createReview(advertiser.getId(), author2.getId(), 5, "Piso según lo descrito");

        // Assert: findByAdvertiser devuelve en orden DESC por fecha de creación
        List<Review> result = reviewService.findByAdvertiserId(advertiser.getId());
        assertEquals(2, result.size());
        assertEquals(r2.getId(), result.get(0).getId()); // la última creada va primero
        assertEquals(r1.getId(), result.get(1).getId());

        // Además: el comentario se recorta (trim) y el rating se mantiene en rango
        assertEquals("Muy buen trato", r1.getComment());
        assertTrue(r1.getRating() >= 1 && r1.getRating() <= 5);
    }

    @Test
    public void testDuplicateReviewSameAdvertiserAndAuthor() throws Exception {
        // Arrange
        User advertiser = createUser("ana.adv@test.com", "Ana");
        User author = createUser("beto.aut@test.com", "Beto");

        reviewService.createReview(advertiser.getId(), author.getId(), 5, "Todo perfecto");

        // Act + Assert: la segunda reseña de la misma pareja debe fallar
        assertThrows(DuplicateInstanceException.class, () ->
                reviewService.createReview(advertiser.getId(), author.getId(), 4, "Repetida"));
    }

    @Test
    public void testInstanceNotFoundWhenAdvertiserDoesNotExist() {
        // Arrange: solo autor existe
        User author = createUser("beto.aut@test.com", "Beto");

        // Act + Assert
        assertThrows(InstanceNotFoundException.class, () ->
                reviewService.createReview(NON_EXISTENT_ID, author.getId(), 3, "Comentario"));
    }

    @Test
    public void testInstanceNotFoundWhenAuthorDoesNotExist() {
        // Arrange: solo anunciante existe
        User advertiser = createUser("ana.adv@test.com", "Ana");

        // Act + Assert
        assertThrows(InstanceNotFoundException.class, () ->
                reviewService.createReview(advertiser.getId(), NON_EXISTENT_ID, 3, "Comentario"));
    }

    @Test
    public void testRatingIsClampedBetween1And5_AndCommentTrimmed() throws Exception {
        // Arrange
        User advertiser = createUser("ana.adv@test.com", "Ana");
        User author1 = createUser("beto.aut@test.com", "Beto");
        User author2 = createUser("carla.aut@test.com", "Carla");

        // Act: rating fuera de rango por abajo y por arriba
        Review low = reviewService.createReview(advertiser.getId(), author1.getId(), 0, "   ok   ");
        Review high = reviewService.createReview(advertiser.getId(), author2.getId(), 99, "   genial   ");

        // Assert: el servicio fuerza el rango [1,5] y hace trim del comentario
        assertEquals(1, low.getRating());
        assertEquals("ok", low.getComment());

        assertEquals(5, high.getRating());
        assertEquals("genial", high.getComment());
    }
}
