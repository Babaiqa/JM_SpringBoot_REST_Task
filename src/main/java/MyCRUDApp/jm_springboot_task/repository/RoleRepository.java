package MyCRUDApp.jm_springboot_task.repository;

import MyCRUDApp.jm_springboot_task.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {
}
