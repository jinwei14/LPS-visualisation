(function (window) {

    var tableManager = {};
    /*
    * createTable function will change create the table corresponding to its destination.
    * */
    tableManager.createTable = function (vehicle, des) {

        var table = document.getElementById("DESTable");
        var row = table.getElementsByTagName("tbody")[0].insertRow();
        var col0 = row.insertCell(0);
        var col1 = row.insertCell(1);
        var col2 = row.insertCell(2);
        col0.innerHTML = vehicle[vehicle.length - 1];
        col1.innerHTML = "<span>" + vehicle + "</span>";
        col2.innerHTML = "<span contenteditable>" + des + " </span>";
    };


    /*
    * clearTable function will clear out the tbody in table.
    * */
    tableManager.clearTable = function () {
        var tbody = document.getElementById("DESTable").getElementsByTagName("tbody")[0];

        while (tbody.rows.length > 0) {
            tbody.deleteRow(0);
        }
    };

    /*
    * when adding car to the canvas need to modify the table as well.
    * */
    tableManager.addTableContent = function(vehicle,x,y){
        var table = document.getElementById("DESTable");
        var row = table.getElementsByTagName("tbody")[0].insertRow();
        var col0 = row.insertCell(0);
        var col1 = row.insertCell(1);
        var col2 = row.insertCell(2);
        col0.innerHTML = vehicle[vehicle.length - 1];
        col1.innerHTML = "<span>" + vehicle + "</span>";
        col2.innerHTML = "<span contenteditable>" + "(" + x.toString() +", "+y.toString()+")" + " </span>";
    };


    /*
    * clearTable function will clear out the tbody in table.
    * */
    tableManager.deleteTableContent = function (vehicle) {
        var tbody = document.getElementById("DESTable").getElementsByTagName("tbody")[0];
        // console.log(tbody);
        // console.log('removeing' + vehicle);
        // var rows = tbody.rows;
        for (var i = tbody.rows.length-1; i>=0; i--){
            strHTML = tbody.rows[i].cells[1].innerHTML;
            // console.log("content"+ tbody.rows[i].cells[1].innerHTML);
            existeIndex = strHTML.indexOf(vehicle);
            if (existeIndex!==-1){
                tbody.deleteRow(i);
            }
        }

    };


    // /*
    // * modifying the table content of the goal
    // * */
    // tableManager.modifyTableContent = function(vehicle,x,y){
    //     var tbody = document.getElementById("DESTable").getElementsByTagName("tbody")[0];
    //     // console.log(tbody);
    //     // console.log('removeing' + vehicle);
    //     // var rows = tbody.rows;
    //     for (var i = tbody.rows.length-1; i>=0; i--){
    //         strHTML = tbody.rows[i].cells[1].innerHTML;
    //         // console.log("content"+ tbody.rows[i].cells[1].innerHTML);
    //         existeIndex = strHTML.indexOf(vehicle);
    //         if (existeIndex!==-1){
    //             appManager.
    //         }
    //     }
    // };

    /*
    * Detect the content changing.
    * */
    document.addEventListener("DOMContentLoaded", function () {

        function destinationChange(evt) {
            console.log("destinationChange is called",evt.toString());
            var tbody = document.getElementById("DESTable").getElementsByTagName("tbody")[0];
            // console.log(tbody);
            // console.log('removeing' + vehicle);
            // var rows = tbody.rows;
            for (var i = tbody.rows.length-1; i>=0; i--){
                goalHTML = tbody.rows[i].cells[2].innerHTML;
                carHTML = tbody.rows[i].cells[1].innerHTML;

                carName = carHTML.match(/(\w+)/g)[1];
                goalX = goalHTML.match(/(\w+)/g)[2];
                goalY = goalHTML.match(/(\w+)/g)[3];
                // console.log("content"+ tbody.rows[i].cells[1].innerHTML);
                // console.log(carName,goalX,goalY);
                appManager.changeGoal(carName,parseInt(goalX),parseInt(goalY));
            }
        }

        document.querySelector('#changeTableContent').addEventListener("click", destinationChange);
    });

    window.tableManager = tableManager;

})(window);
