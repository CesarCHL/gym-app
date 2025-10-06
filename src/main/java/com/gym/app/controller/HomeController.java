package com.gym.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("title", "Gym App");
        model.addAttribute("description", "Welcome to the Gym Application");
        return "index";
    }
}
