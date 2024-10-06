package com.cristian.rodier.elevator.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/floors")
public class FloorsController {

    //this provides the total floors in
    @GetMapping("/getAllFloors")
    public List<Integer> getAllFloors(){

        return List.of(1,2,3,4,5,6,7,8,9,10);
    }
}
