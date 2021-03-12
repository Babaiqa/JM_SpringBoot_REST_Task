package MyCRUDApp.jm_springboot_task.controllers;


import MyCRUDApp.jm_springboot_task.model.Role;
import MyCRUDApp.jm_springboot_task.model.User;
import MyCRUDApp.jm_springboot_task.service.RoleService;
import MyCRUDApp.jm_springboot_task.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private UserService userService;
    private RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("")
    public String showAllUsers(Model model) {
        model.addAttribute("users", userService.getAllUsers());

        return "users";
    }

    @GetMapping("/{id}")
    public String showUserById(@PathVariable("id") long id, Model model) {
        model.addAttribute("user", userService.getUserById(id));

        return "showUser";
    }

    @GetMapping("/new")
    public String newUserForm(Model model) {
        model.addAttribute("user", new User());
        return "newUser";
    }

    @PostMapping("/add")
    public String addUser(@ModelAttribute User user, @RequestParam(value = "selectRoles[]") String[] arr) {
        Set<Role> setOfRoles = new HashSet<>();

        for (String s : arr) {
            setOfRoles.add(roleService.getRoleById(Integer.valueOf(s)));
        }

        user.setRoles(setOfRoles);
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @GetMapping(value = "/{id}/edit", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<User> findUser(@PathVariable("id") long id) {
        try {
            return new ResponseEntity<User>(userService.getUserById(id), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{id}/update")
    public String updateUser(@ModelAttribute("user") User user, @PathVariable("id") long id,
                             @RequestParam(value = "selectRoles[]") String[] arr, @RequestParam(value = "password") String password) {

        Set<Role> setOfRoles = new HashSet<>();

        if (password != null) {
            user.setPassword(password);
        } else {
            user.setPassword(user.getPassword());
        }

        for (String s : arr) {
            setOfRoles.add(roleService.getRoleById(Integer.valueOf(s)));
        }

        user.setRoles(setOfRoles);
        userService.updateUser(user);
        return "redirect:/admin";
    }

    @PostMapping("/{id}/delete")
    public String deleteUser(@PathVariable("id") long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }


}
