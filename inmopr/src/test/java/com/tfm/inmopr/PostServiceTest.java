package com.tfm.inmopr;

import com.tfm.inmopr.model.entities.*;
import com.tfm.inmopr.model.services.PostsService;
import com.tfm.inmopr.rest.dtos.PostDto;
import jakarta.mail.Session;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class PostServiceTest {

    @Autowired private PostsService postsService;

    @Autowired private PostDao postDao;
    @Autowired private AddressDao addressDao;

    // Si tu conversor/entidad necesita usuario real, descomenta estas 2 líneas y el helper createUser:
    // @Autowired private UserDao userDao;

    // ===== Helpers =====

    private Address addr(String city) {
        Address a = new Address();
        a.setProvince("Provincia");
        a.setCity(city);
        a.setStreet("Calle Mayor");
        a.setPostalCode("28001");
        a.setNumber("10");
        a.setHeight("3");
        a.setLetter("A");
        return a;
    }

    private PostDto dtoBase(Long userId, String city, String precio, String email) {
        PostDto dto = new PostDto();
        dto.setUserId(userId);
        dto.setName("Nombre inicial (lo sobrescribe el servicio)");
        // Para no depender de los nombres exactos de los enums, usamos el primer valor
        dto.setTipoAnuncio(TipoAnuncio.values()[0]);
        dto.setTipoVivienda(TipoVivienda.values()[0]);
        dto.setDescription("Reformado, 3 hab");
        dto.setUrls(List.of("https://img/1.jpg"));
        dto.setUrlsPanoramic(List.of());
        dto.setOwnerName("Propietario");
        dto.setTelephone("600000000");
        dto.setCreationDate(LocalDateTime.now());
        dto.setModificationDate(LocalDateTime.now());
        dto.setAddress(addr(city));
        dto.setAscensor(true);
        dto.setGaraje(false);
        dto.setMetrosConstruidos("95");
        dto.setMetrosUtiles("85");
        dto.setNumHabitaciones("3");
        dto.setNumBanos("2");
        dto.setExterior(true);
        dto.setOrientacion(Orientacion.values()[0]);
        dto.setAmueblado(false);
        dto.setTrastero(false);
        dto.setJardin(false);
        dto.setTerraza(true);
        dto.setCalefaccion(true);
        dto.setPiscina(false);
        dto.setEstado(Estado.values()[0]);
        dto.setPrecio(precio); // En tu entidad/DTO es String
        dto.setEmail(email);
        return dto;
    }

    /*
    // Úsalo si tu conversor obliga a tener un usuario persistido
    private User createUser(String email) {
        User u = new User();
        u.setEmail(email);
        u.setFirstName("Owner");
        u.setLastName("Test");
        u.setPassword("pwd");
        return userDao.save(u);
    }
    */

    // ===== Tests =====

    @Test
    void publishPost_persiste_y_autogenera_nombre_y_address() {
        Long userId = 1001L;
        String city = "Madrid";

        PostDto dto = dtoBase(userId, city, "950.0", "owner@test.com");

        postsService.publishPost(userId, dto);

        Page<Post> page = postDao.findByUserId(userId, Pageable.unpaged());
        assertEquals(1, page.getTotalElements());

        Post p = page.getContent().get(0);
        assertNotNull(p.getId());
        assertNotNull(p.getCreationDate());
        assertNotNull(p.getModificationDate());
        assertNotNull(p.getAddress());
        assertEquals(city, p.getAddress().getCity());
        assertEquals("950.0", p.getPrecio().toString());

        String esperado = p.getTipoVivienda() + " en " + p.getTipoAnuncio() + " en " + city;
        assertEquals(esperado, p.getName());

        assertTrue(addressDao.findById(p.getAddress().getId()).isPresent());
    }

    @Test
    void updatePost_modifica_campos_editables_y_urls() {
        Long userId = 2002L;
        PostDto dto = dtoBase(userId, "Valencia", "1200", "owner@ex.com");
        postsService.publishPost(userId, dto);

        Post original = postDao.findByUserId(userId, Pageable.unpaged()).getContent().get(0);

        PostDto cambios = dtoBase(userId, "Valencia", "1350", "nuevo@ex.com");
        cambios.setDescription("Reformado integral");
        cambios.setUrls(List.of("https://img/2.jpg", "https://img/3.jpg"));
        cambios.setUrlsPanoramic(List.of("https://pano/1.jpg"));
        cambios.setAscensor(false);
        cambios.setGaraje(true);
        cambios.setTerraza(false);
        cambios.setAmueblado(true);

        Post actualizado = postsService.updatePost(original.getId(), cambios);

        assertEquals("1350", actualizado.getPrecio().toString());
        assertEquals("Reformado integral", actualizado.getDescription());
        assertEquals(List.of("https://img/2.jpg", "https://img/3.jpg"), actualizado.getUrls());
        assertEquals(List.of("https://pano/1.jpg"), actualizado.getUrlsPanoramic());
        assertFalse(actualizado.getAscensor());
        assertTrue(actualizado.getGaraje());
        assertTrue(actualizado.getAmueblado());
        assertNotNull(actualizado.getModificationDate());
    }

    @Test
    void findByCityContainingIgnoreCase_filtra_por_ciudad() {
        Long userA = 3003L;
        Long userB = 3004L;

        postsService.publishPost(userA, dtoBase(userA, "Sevilla", "800", "a@ex.com"));
        postsService.publishPost(userB, dtoBase(userB, "Bilbao", "900", "b@ex.com"));

        Page<Post> sev = postsService.findByCityContainingIgnoreCase("sevi", Pageable.unpaged());
        assertEquals(1, sev.getTotalElements());
        assertEquals("Sevilla", sev.getContent().get(0).getAddress().getCity());
    }

    @Test
    void findByUserId_devuelve_solo_posts_del_usuario() {
        Long userA = 4001L;
        Long userB = 4002L;

        postsService.publishPost(userA, dtoBase(userA, "Madrid", "1000", "a@ex.com"));
        postsService.publishPost(userB, dtoBase(userB, "Madrid", "1100", "b@ex.com"));
        postsService.publishPost(userA, dtoBase(userA, "Madrid", "1200", "a2@ex.com"));

        Page<Post> deA = postsService.findByUserId(String.valueOf(userA), Pageable.unpaged());
        assertEquals(2, deA.getTotalElements());
        assertTrue(deA.getContent().stream().allMatch(p -> p.getUserId().equals(userA)));
    }

    @Test
    void deletePost_elimina_y_repite_lanza_404() {
        Long userId = 5005L;
        postsService.publishPost(userId, dtoBase(userId, "Valencia", "999", "x@ex.com"));
        Post p = postDao.findByUserId(userId, Pageable.unpaged()).getContent().get(0);

        assertTrue(postDao.existsById(p.getId()));
        postsService.deletePost(p.getId());
        assertFalse(postDao.existsById(p.getId()));

        assertThrows(ResponseStatusException.class, () -> postsService.deletePost(p.getId()));
    }

    // ===== Envío de email: se mockea el mailSender =====
    @MockBean private org.springframework.mail.javamail.JavaMailSender mailSender;

    @Test
    void sendEmail_envia_html_ok() {
        MimeMessage fake = new MimeMessage((Session) null);
        when(mailSender.createMimeMessage()).thenReturn(fake);

        postsService.sendEmail("to@ex.com", "from@ex.com", "Asunto", "<b>HTML</b>");

        verify(mailSender, times(1)).createMimeMessage();
        verify(mailSender, times(1)).send(any(MimeMessage.class));
    }
}
