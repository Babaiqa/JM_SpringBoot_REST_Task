package MyCRUDApp.jm_springboot_task.dao;

import MyCRUDApp.jm_springboot_task.model.User;

import java.util.List;

public interface UserDAO {

    List<User> getAllUsers();
    User getUserById(Long id);
    void deleteUser(Long id);
    User saveUser(User user);
    User updateUser(User user);
    User getUserByUsername(String username);

}
