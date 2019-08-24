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
            console.log("content"+ tbody.rows[i].cells[1].innerHTML);
            existeIndex = strHTML.indexOf(vehicle);
            if (existeIndex!==-1){
                tbody.deleteRow(i);
            }
        }

    };

    // /*
    // * Detect the content changing.
    // * */
    // document.addEventListener("DOMContentLoaded", function () {
    //
    //     function Destination(evt) {
    //         //Retrieve the first (and only!) File from the FileList object
    //         var f = evt.target.files[0];
    //
    //         if (f) {
    //             var r = new FileReader();
    //             r.onload = function (e) {
    //                 var contents = e.target.result;
    //                 // alert( "name: " + f.name
    //                 // +" size: " + f.size
    //                 // + "starts with: " + contents.substr(1, contents.indexOf("n")));
    //                 console.log(contents);
    //                 document.getElementById("exampleFormControlTextarea1").value = contents;
    //
    //                 var vis = document.getElementById("content");
    //                 if (vis.style.display === "none") {
    //                     vis.style.display = "block";
    //                 }
    //                 //clear the content before running the
    //                 // appManager.clearContent();
    //                 appManager.clearContent();
    //                 tableManager.clearTable();
    //                 appManager.createVisualizer();
    //
    //                 LPSInitializer(contents, null);
    //
    //
    //             };
    //
    //             r.readAsText(f);
    //
    //
    //         } else {
    //             alert("Failed to load file");
    //         }
    //     }
    //
    //     document.querySelector('#formControlFile1').addEventListener("change", loadTextFromFile);
    // });

    window.tableManager = tableManager;

})(window);
