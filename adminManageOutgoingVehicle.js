import { transformData } from "./adminLogin.js";
import { viewDetailsVehicleOutgoing } from "./viewDetailsVehicleOutgoing.js";

const deleteOutgoingVehicle = () => {
  fetch(
    "https://vehicleparkingmanagement-default-rtdb.europe-west1.firebasedatabase.app/vehiclesOut.json",
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => transformData(data))
    .then((data) => {
      let vehiclesOutgoing = data;

      let vehiclesIdentifier = vehiclesOutgoing.map((category) => category.id);

      let allButtonsDeleteVehicle = [];

      for (let i = 0; i < vehiclesOutgoing.length; i++) {
        let buttonDeleteVehicle = document.getElementById(
          "outVehicleToDelete-" + i
        );

        if (buttonDeleteVehicle) {
          allButtonsDeleteVehicle.push(buttonDeleteVehicle);
          buttonDeleteVehicle.addEventListener("click", function (e) {
            let actualVehicleId = $(this).data("vehicleId");
            fetch(
              "https://vehicleparkingmanagement-default-rtdb.europe-west1.firebasedatabase.app/vehiclesOut/" +
                actualVehicleId +
                ".json",
              {
                method: "DELETE",
              }
            ).then((resp) => {
              updateManageOutgoingVehicleTable();
            });
          });
        } else {
          allButtonsDeleteVehicle.push(i);
        }
      }

      for (let i = 0; i < allButtonsDeleteVehicle.length; i++) {
        if (isNaN(allButtonsDeleteVehicle[i])) {
          $("#outVehicleToDelete-" + i).data(
            "vehicleId",
            vehiclesIdentifier[i]
          );
        }
      }
    });
};

const updateManageOutgoingVehicleTable = () => {
  fetch(
    "https://vehicleparkingmanagement-default-rtdb.europe-west1.firebasedatabase.app/vehiclesOut.json",
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => transformData(data))
    .then((data) => {
      let vehiclesOutgoing = data;

      let temp = "";

      const makeTableVehiclesOutgoing = () => {
        for (let i = 0; i < vehiclesOutgoing.length; i++) {
          temp += "<tr class='border-top border-2'>";
          temp += "<td class='pt-3 pb-4 ps-3'>" + (i + 1) + "</td>";
          temp +=
            "<td class='pt-3 pb-4 ps-3'>" +
            vehiclesOutgoing[i].parkingNumber +
            "</td>";
          temp +=
            "<td class='pt-3 pb-4 ps-3'>" +
            vehiclesOutgoing[i].vehicleOwnerName +
            "</td>";
          temp +=
            "<td class='pt-3 pb-4 ps-3'>" +
            vehiclesOutgoing[i].vehicleRegistrationNumber +
            "</td>";

          temp +=
            "<td class='pt-3 pb-4 ps-3'> <button class='text-white bg-primary rounded-1 border-0 py-2 px-3 me-1' id='outVehicleToViewDetails-" +
            i +
            "'> View </button>";
          temp +=
            "<button class='bg-warning rounded-1 border-0 py-2 px-3 me-1'> Print </button>";
          temp +=
            "<button class='text-white bg-danger rounded-1 border-0 py-2 px-3'id='outVehicleToDelete-" +
            i +
            "'>Delete</button> </td>";
          temp += "</tr>";
        }
        document.getElementById("manageOutgoingVehicleDataTable").innerHTML =
          temp;

        $("#manageOutgoingVehiclesTable").DataTable({
          paging: true,
          ordering: false,
          info: false,
          searching: false,
          lengthChange: false,
          pageLength: 5,
          pagingType: "numbers",
          autoWidth: false,
        });
        deleteOutgoingVehicle();
        viewDetailsVehicleOutgoing();
        let tableIncomingVehiclePagination = document.getElementById(
          "manageOutgoingVehiclesTable_paginate"
        );
        tableIncomingVehiclePagination.addEventListener("click", () => {
          deleteOutgoingVehicle();
          viewDetailsVehicleOutgoing();
        });
      };

      if (DataTable.isDataTable($("#manageOutgoingVehiclesTable"))) {
        $("#manageOutgoingVehiclesTable").DataTable().destroy();
        makeTableVehiclesOutgoing();
      } else {
        makeTableVehiclesOutgoing();
      }
    });
};

export { updateManageOutgoingVehicleTable };
