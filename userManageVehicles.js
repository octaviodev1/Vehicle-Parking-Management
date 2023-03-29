import { transformData } from "./adminLogin.js";
import { viewDetailsUserVehicle } from "./viewDetailsUserVehicle.js";

var userVehicles = [];

const updateUserVehicleTable = () => {
  let actualUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const checkUserTable = () => {
    if (DataTable.isDataTable($("#userVehicleTable"))) {
      $("#userVehicleTable").DataTable().destroy();
      makeTableUserVehicle();
    } else {
      makeTableUserVehicle();
    }
  };

  const makeTableUserVehicle = () => {
    let temp = "";
    for (let i = 0; i < userVehicles.length; i++) {
      temp += "<tr class='border-top border-2'>";
      temp += "<td class='pt-3 pb-4 ps-3'>" + (i + 1) + "</td>";
      temp +=
        "<td class='pt-3 pb-4 ps-3'>" + userVehicles[i].parkingNumber + "</td>";
      temp +=
        "<td class='pt-3 pb-4 ps-3'>" +
        userVehicles[i].vehicleOwnerName +
        "</td>";
      temp +=
        "<td class='pt-3 pb-4 ps-3'>" +
        userVehicles[i].vehicleRegistrationNumber +
        "</td>";
      temp +=
        "<td class='pt-3 pb-4 ps-3'> <button class='text-white bg-primary rounded-1 border-0 py-2 px-3 me-1' id='userVehicleToViewDetails-" +
        i +
        "'> View </button>";
      temp +=
        "<button class='bg-warning rounded-1 border-0 py-2 px-3 me-1'> Print </button>";
      temp += "</tr>";
    }
    document.getElementById("userVehicleDataTable").innerHTML = temp;

    $("#userVehicleTable").DataTable({
      paging: true,
      ordering: false,
      info: false,
      searching: false,
      lengthChange: false,
      pageLength: 5,
      pagingType: "numbers",
      autoWidth: false,
    });

    viewDetailsUserVehicle();
    let tableUserVehiclePagination = document.getElementById(
      "userVehicleTable_paginate"
    );
    tableUserVehiclePagination.addEventListener("click", () => {
      viewDetailsUserVehicle();
    });
  };

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

      let userVehiclesIncomingMatch = vehiclesIncoming.filter(
        (vehiclesIncoming) =>
          vehiclesIncoming.vehicleOwnerContactNumber == actualUser.contactNumber
      );

      // console.log(userVehiclesMatch)

      // for (let i = 0; i < vehiclesIncoming.length; i++) {
      //   if (
      //     actualUser.contactNumber ==
      //     vehiclesIncoming[i].vehicleOwnerContactNumber
      //   ) {
      //     userVehicles.push(vehiclesIncoming[i]);
      //   }
      // }

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

          let userVehiclesOutgoingMatch = vehiclesOutgoing.filter(
            (vehiclesOutgoing) =>
              vehiclesOutgoing.vehicleOwnerContactNumber ==
              actualUser.contactNumber
          );

          userVehicles = userVehiclesIncomingMatch.concat(
            userVehiclesOutgoingMatch
          );
          checkUserTable();

          // console.log(userVehicles);
          // for (let i = 0; i < vehiclesOutgoing.length; i++) {
          //   if (
          //     actualUser.contactNumber ==
          //     vehiclesOutgoing[i].vehicleOwnerContactNumber
          //   ) {
          //     userVehicles.push(vehiclesOutgoing[i]);
          //     checkUserTable();
          //   }
          // }
        });
    });
};

export { userVehicles, updateUserVehicleTable };
