package com.cristian.rodier.elevator.controller;

import com.cristian.rodier.elevator.entity.Elevator;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//This api allows me to get and update elevator location from the back end.
// In case, we want to log it in a database later
@RestController
@RequestMapping("/elevator")
public class ElevatorController {

    Elevator elevator;

    public ElevatorController() {
        this.elevator = new Elevator();
    }

    //return where the elevator currently is
    @GetMapping("/getCurrentFloor")
    public int getCurrentFloor(){
        return this.elevator.getCurrentFloor();
    }

    //update the elevator's position
    @PostMapping("/setCurrentFloor")
    public void setCurrentFloor(@RequestParam int number){
        this.elevator.setCurrentFloor(number);
    }



}
