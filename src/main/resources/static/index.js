// I decided to go with a java Spring boot application because
//I thought it would be more visually pleasing

$(document).ready(function() {
    //global variable of the current floor
    var currentFloor = null;

    //get all buttons from the api on the back end
    $.ajax({
        url: '/floors/getAllFloors',
        method: 'GET',
        success: function(data) {
            updateButtons(data);
        },
        error: function(error) {
            console.error('Error fetching data:', error);
        }
    });

    //when the app starts, this will get the starting floor
    $.ajax({
            url: '/elevator/getCurrentFloor',
            method: 'GET',
            success: function(data) {
                jQuery("#currentFloor").val("Floor: " + data);
                currentFloor = data;
            },
            error: function(error) {
                console.error('Error fetching data:', error);
            }
        });

    //based on button pressed update the floor in the backend
    function updateCurrentFloor(newFloor){

        $.post("/elevator/setCurrentFloor", {
            number: newFloor
        }, function(data) {
            console.log("Response: ", data);
        });

    }

    //loop through the array from the backend to place the buttons
    function updateButtons(arr){
        for(var i = 1; i <= arr.length; i+=2){

            jQuery("#buttons").append(`<tr>
                <td class="text-center"><button value=${arr[i-1]} class="btn btn-primary btn-circle">${arr[i-1]}</button></td>
                <td class="text-center"><button value=${arr[i]} class="btn btn-primary btn-circle">${arr[i]}</button></td>
            </tr>`);

        }

        buttonClick();

    }
    //triggers elevator to move when button clicked
    function buttonClick(){
        jQuery(".btn").click(function(){

            moveElevator($(this).val());
        });
    }

    //alerts you when you are at your floor
    function showAlert() {

        $('.alert-success').removeClass('d-none');

          setTimeout(function() {
            $('.alert-success').addClass('d-none');
          }, 3000);
  }

    //if you are at the floor, it will display a message
    //other wise it will move the elevator towards your floor
    // i move the elevator gradually because that is how most move
    function moveElevator(number){

        var intNum = parseInt(number);

        if(intNum == currentFloor){
            showAlert();
            return;
        }

        if (intNum < currentFloor){
            moveElevatorDown(intNum);
            return;
        }

        for (let i = currentFloor; i <= intNum; i++) {
            setTimeout(() => {
                jQuery("#currentFloor").val("Floor: " + i);

                if (i === intNum) {
                    showAlert();
                }

            }, 500 * (i - currentFloor));
        }

        //update global variable of current floor
        currentFloor = intNum;
        //update date the current floor on the back end
        updateCurrentFloor(intNum);

    }

    //I created a distinct function to move the elevator down
    function moveElevatorDown(intNum){

        for (let i = currentFloor; i >= intNum; i--) {
            setTimeout(() => {
                if (i === intNum) {
                    showAlert();
                }
                jQuery("#currentFloor").val("Floor: " + i);
            }, 500 * (currentFloor - i));
        }

        currentFloor = intNum;
        updateCurrentFloor(intNum);

    }

});
