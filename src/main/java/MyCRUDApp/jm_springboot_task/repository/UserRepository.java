package MyCRUDApp.jm_springboot_task.repository;

import MyCRUDApp.jm_springboot_task.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);


}
