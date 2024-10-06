package com.cristian.rodier.elevator.entity;
//model which the elevator is based off of
public class Elevator {
    int currentFloor;

    public Elevator() {
        this.currentFloor = 1;

    }

    public int getCurrentFloor() {
        return currentFloor;
    }

    public void setCurrentFloor(int currentFloor) {
        this.currentFloor = currentFloor;
    }
}
