package MyCRUDApp.jm_springboot_task.controllers;

import MyCRUDApp.jm_springboot_task.model.User;
import MyCRUDApp.jm_springboot_task.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping()
public class AdminRestController {

    private final UserService userService;

    @Autowired
    public AdminRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public ResponseEntity<List<User>> showAllUsers() {
        try {
            List<User> userList = userService.getAllUsers();
            if (userList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                 return new ResponseEntity<>(userList, HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/save")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        userService.saveUser(user);
        return new ResponseEntity<>(user, HttpStatus.OK);


    }

    @GetMapping("/{id}")
    public User showUserById(@PathVariable("id") long userID) {
        return userService.getUserById(userID);
    }

    @PutMapping("/update")
    public User saveOrUpdateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteUser(@RequestBody long userID) {
        userService.deleteUser(userID);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}