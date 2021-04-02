package MyCRUDApp.jm_springboot_task.service;

import MyCRUDApp.jm_springboot_task.model.Role;

import java.util.List;

public interface RoleService {

    List<Role> getAllRoles();

    Role getRoleById(int id);

    void deleteRole(int id);

    Role saveRole(Role role);

    Role updateRole(int id);
}
