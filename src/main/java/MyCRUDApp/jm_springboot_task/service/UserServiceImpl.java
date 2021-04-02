package MyCRUDApp.jm_springboot_task.service;


import MyCRUDApp.jm_springboot_task.model.Role;
import MyCRUDApp.jm_springboot_task.model.User;
import MyCRUDApp.jm_springboot_task.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private RoleService roleService;

    @Autowired
    public UserServiceImpl(PasswordEncoder passwordEncoder, UserRepository userRepository, RoleService roleService) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.roleService = roleService;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(long id) {
        return userRepository.findById(id).get();
    }

    public void deleteUser(long id) {
        userRepository.deleteById(id);
    }

    public User saveUser(User user) {
        if(user.getRoles().isEmpty()) {
            Set<Role> defaultRole = new HashSet<>();
            defaultRole.add(roleService.getRoleById(2));
            user.setRoles(defaultRole);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    public User updateUser(User user) {
        if (user.getPassword().isEmpty()) {
            user.setPassword(this.getUserById(user.getId()).getPassword());
        }else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        if(user.getRoles().isEmpty()) {
            user.setRoles(this.getUserById(user.getId()).getRoles());
        }
        return userRepository.save(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
