package MyCRUDApp.jm_springboot_task.service;

import MyCRUDApp.jm_springboot_task.model.Role;
import MyCRUDApp.jm_springboot_task.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Role getRoleById(int id) {
        return roleRepository.findById(id).get();
    }

    public void deleteRole(int id) {
        roleRepository.deleteById(id);
    }

    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    public Role updateRole(int id) {
        return roleRepository.save(roleRepository.getOne(id));
    }
}


