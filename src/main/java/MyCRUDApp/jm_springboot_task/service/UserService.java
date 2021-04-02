package MyCRUDApp.jm_springboot_task.service;

import MyCRUDApp.jm_springboot_task.model.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();

    User getUserById(long id);

    void deleteUser(long id);

    User saveUser(User user);

    User updateUser(User user);

    User findByEmail(String email);
}

