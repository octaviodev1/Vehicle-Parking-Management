import { transformData } from "./adminLogin.js";
import { viewDetailsVehicleIncoming } from "./viewDetailsVehicleIncoming.js";

const deleteVehicle = () => {
  fetch(
    "https://vehicleparkingmanagement-default-rtdb.europe-west1.firebasedatabase.app/vehiclesIn.json",
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => transformData(data))
    .then((data) => {
      let vehiclesIncoming = data;

      let vehiclesIdentifier = vehiclesIncoming.map((category) => category.id);

      let allButtonsDeleteVehicle = [];

      for (let i = 0; i < vehiclesIncoming.length; i++) {
        let buttonDeleteVehicle = document.getElementById(
          "vehicleToDelete-" + i
        );
        $("#vehicleToDelete-" + i).data("vehicleId", i);
        if (buttonDeleteVehicle) {
          allButtonsDeleteVehicle.push(buttonDeleteVehicle);
          buttonDeleteVehicle.addEventListener("click", function (e) {
            let actualVehicleId = $(this).data("vehicleId");
            fetch(
              "https://vehicleparkingmanagement-default-rtdb.europe-west1.firebasedatabase.app/vehiclesIn/" +
                actualVehicleId +
                ".json",
              {
                method: "DELETE",
              }
            ).then((resp) => {
              updateManageIncomingVehicleTable();
            });
          });
        } else {
          allButtonsDeleteVehicle.push(i);
        }
      }

      for (let i = 0; i < allButtonsDeleteVehicle.length; i++) {
        if (isNaN(allButtonsDeleteVehicle[i])) {
          $("#vehicleToDelete-" + i).data("vehicleId", vehiclesIdentifier[i]);
        }
      }
    });
};

const updateManageIncomingVehicleTable = () => {
  fetch(
    "https://vehicleparkingmanagement-default-rtdb.europe-west1.firebasedatabase.app/vehiclesIn.json",
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => transformData(data))
    .then((data) => {
      let vehiclesIncoming = data;

      let temp = "";

      const makeTableVehiclesIncoming = () => {
        for (let i = 0; i < vehiclesIncoming.length; i++) {
          temp += "<tr class='border-top border-2'>";
          temp += "<td class='pt-3 pb-4 ps-3'>" + (i + 1) + "</td>";
          temp +=
            "<td class='pt-3 pb-4 ps-3'>" +
            vehiclesIncoming[i].parkingNumber +
            "</td>";
          temp +=
            "<td class='pt-3 pb-4 ps-3'>" +
            vehiclesIncoming[i].vehicleOwnerName +
            "</td>";
          temp +=
            "<td class='pt-3 pb-4 ps-3'>" +
            vehiclesIncoming[i].vehicleRegistrationNumber +
            "</td>";

          temp +=
            "<td class='pt-3 pb-4 ps-3'> <button class='text-white bg-primary rounded-1 border-0 py-2 px-3 me-1' id='vehicleToViewDetails-" +
            i +
            "'> View </button>";
          temp +=
            "<button class='bg-warning rounded-1 border-0 py-2 px-3 me-1'> Print </button>";
          temp +=
            "<button class='text-white bg-danger rounded-1 border-0 py-2 px-3'id='vehicleToDelete-" +
            i +
            "'>Delete</button> </td>";
          temp += "</tr>";
        }
        document.getElementById("manageIncomingVehicleDataTable").innerHTML =
          temp;

        $("#manageIncomingVehiclesTable").DataTable({
          paging: true,
          ordering: false,
          info: false,
          searching: false,
          lengthChange: false,
          pageLength: 5,
          pagingType: "numbers",
          autoWidth: false,
        });
        deleteVehicle();
        viewDetailsVehicleIncoming();
        let tableIncomingVehiclePagination = document.getElementById(
          "manageIncomingVehiclesTable_paginate"
        );
        tableIncomingVehiclePagination.addEventListener("click", () => {
          deleteVehicle();
          viewDetailsVehicleIncoming();
        });
      };

      if (DataTable.isDataTable($("#manageIncomingVehiclesTable"))) {
        $("#manageIncomingVehiclesTable").DataTable().destroy();
        makeTableVehiclesIncoming();
      } else {
        makeTableVehiclesIncoming();
      }
    });
};

export { updateManageIncomingVehicleTable };
