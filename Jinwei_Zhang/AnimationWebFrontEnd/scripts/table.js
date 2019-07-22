(function (window) {

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
        col1.innerHTML = "<span contenteditable>" + vehicle + "</span>";
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

    window.tableManager = tableManager;

})(window);
