package MyCRUDApp.jm_springboot_task.controllers;

import MyCRUDApp.jm_springboot_task.model.Role;
import MyCRUDApp.jm_springboot_task.model.User;
import MyCRUDApp.jm_springboot_task.service.RoleService;
import MyCRUDApp.jm_springboot_task.service.UserService;
import com.sun.org.apache.xpath.internal.operations.String;
import jdk.nashorn.internal.runtime.JSONFunctions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping()
public class AdminRestController {

    private UserService userService;
    private RoleService roleService;

    @Autowired
    public AdminRestController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
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
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);

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