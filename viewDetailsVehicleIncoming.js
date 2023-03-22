import { transformData } from "./adminLogin.js";
import { updateManageIncomingVehicleTable } from "./adminManageIncomingVehicle.js";
import { updateManageOutgoingVehicleTable } from "./adminManageOutgoingVehicle.js";

let actualVehicleId = "";
let actualParkingNumber = "";
let actualVehicleCategory = "";
let actualVehicleCompanyName = "";
let actualRegistrationNumber = "";
let actualOwnerName = "";
let actualOwnerContactNumber = "";
let actualInTime = "";
let actualStatus = "";

const viewDetailsVehicleIncoming = () => {
  fetch(
    "https://vehicleparkingmanagement-default-rtdb.europe-west1.firebasedatabase.app/vehiclesIn.json",
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => transformData(data))
    .then((data) => {
      let vehicles = data;
      let vehiclesIdentifier = vehicles.map((vehicle) => vehicle.id);

      let allButtonsViewDetails = [];

      // let input_categoryToUpdate = document.getElementById(
      //   "updateCategoryNameInput"
      // );

      const makeTableViewDetailsVehicleIncoming = () => {
        let temp = "";

        temp += "<tr>";
        temp += "<th class='fw-bold p-3' scope='row'>Parking Number</th>";
        temp += "<td>" + actualParkingNumber + "</td>";
        temp += "</tr>";

        temp += "<tr>";
        temp += "<th class='fw-bold p-3' scope='row'>Vehicle Category</th>";
        temp += "<td>" + actualVehicleCategory + "</td>";
        temp += "</tr>";

        temp += "<tr>";
        temp += "<th class='fw-bold p-3' scope='row'>Vehicle Company name</th>";
        temp += "<td>" + actualVehicleCompanyName + "</td>";
        temp += "</tr>";

        temp += "<tr>";
        temp += "<th class='fw-bold p-3' scope='row'>Registration Number</th>";
        temp += "<td>" + actualRegistrationNumber + "</td>";
        temp += "</tr>";

        temp += "<tr>";
        temp += "<th class='fw-bold p-3' scope='row'>Owner name</th>";
        temp += "<td>" + actualOwnerName + "</td>";
        temp += "</tr>";

        temp += "<tr>";
        temp += "<th class='fw-bold p-3' scope='row'>Owner Contact Number</th>";
        temp += "<td>" + actualOwnerContactNumber + "</td>";
        temp += "</tr>";

        temp += "<tr>";
        temp += "<th class='fw-bold p-3' scope='row'>In Time</th>";
        temp += "<td>" + actualInTime + "</td>";
        temp += "</tr>";

        temp += "<tr>";
        temp += "<th class='fw-bold p-3' scope='row'>Status</th>";
        temp += "<td>" + actualStatus + "</td>";
        temp += "</tr>";

        document.getElementById("viewVehicleIncomingDetailsDataTable").innerHTML = temp;
      };

      for (let i = 0; i < vehicles.length; i++) {
        let buttonToViewVehicleDetails = document.getElementById(
          "inVehicleToViewDetails-" + i
        );

        if (buttonToViewVehicleDetails) {
          allButtonsViewDetails.push(buttonToViewVehicleDetails);
        } else {
          allButtonsViewDetails.push(i);
        }
      }

      for (let i = 0; i < allButtonsViewDetails.length; i++) {
        if (isNaN(allButtonsViewDetails[i])) {
          $("#inVehicleToViewDetails-" + i).data("vehicle", {
            id: vehiclesIdentifier[i],
            parkingNumber: vehicles[i].parkingNumber,
            vehicleCategory: vehicles[i].vehicleCategory,
            vehicleCompany: vehicles[i].vehicleCompany,
            vehicleRegistrationNumber: vehicles[i].vehicleRegistrationNumber,
            vehicleOwnerName: vehicles[i].vehicleOwnerName,
            vehicleOwnerContactNumber: vehicles[i].vehicleOwnerContactNumber,
            inTime: vehicles[i].inTime,
            status: vehicles[i].status,
          });
        }
      }

      for (let i = 0; i < vehicles.length; i++) {
        let buttonToViewVehicleDetails = document.getElementById(
          "inVehicleToViewDetails-" + i
        );
        if (buttonToViewVehicleDetails) {
          buttonToViewVehicleDetails.addEventListener("click", function (e) {
            actualVehicleId = $(this).data("vehicle").id;
            actualParkingNumber = $(this).data("vehicle").parkingNumber;
            actualVehicleCategory = $(this).data("vehicle").vehicleCategory;
            actualVehicleCompanyName = $(this).data("vehicle").vehicleCompany;
            actualRegistrationNumber =
              $(this).data("vehicle").vehicleRegistrationNumber;
            actualOwnerName = $(this).data("vehicle").vehicleOwnerName;
            actualOwnerContactNumber =
              $(this).data("vehicle").vehicleOwnerContactNumber;
            actualInTime = $(this).data("vehicle").inTime;
            actualStatus = $(this).data("vehicle").status;

            makeTableViewDetailsVehicleIncoming();

            document.getElementById("btn-goToViewIncomingVehicleDetails").click();
          });
        }
      }
    });
};

const updateVehicleStatus = () => {
  let vehicleIncomingRemark = document.getElementById("vehicleIncomingRemark");
  let errorVehicleIncomingRemark = document.getElementById(
    "errorVehicleIncomingRemark"
  );

  let vehicleIncomingParkingCharge = document.getElementById(
    "vehicleIncomingParkingCharge"
  );
  let errorVehicleIncomingParkingCharge = document.getElementById(
    "errorVehicleIncomingParkingCharge"
  );

  let vehicleIncomingStatus = document.getElementById("vehicleIncomingStatus");

  let valid = [];

  if (
    vehicleIncomingRemark.value == null ||
    vehicleIncomingRemark.value == ""
  ) {
    errorVehicleIncomingRemark.innerHTML = "Please write a remark.";
    valid.push("false");
  } else {
    errorVehicleIncomingRemark.innerHTML = "";
    valid.push("true");
  }

  if (
    vehicleIncomingParkingCharge.value == null ||
    vehicleIncomingParkingCharge.value == ""
  ) {
    errorVehicleIncomingParkingCharge.innerHTML =
      "Please enter a parking charge.";
    valid.push("false");
  } else {
    errorVehicleIncomingParkingCharge.innerHTML = "";
    valid.push("true");
  }

  const checkData = (element) => {
    return element === "true";
  };

  if (valid.every(checkData)) {
    let date = new Date();
    let currentDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    let currentTime =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    let outTime = currentDate + " " + currentTime;

    let vehicleOutToAdd = {};
    vehicleOutToAdd.parkingNumber = actualParkingNumber;
    vehicleOutToAdd.vehicleCategory = actualVehicleCategory;
    vehicleOutToAdd.vehicleCompany = actualVehicleCompanyName;
    vehicleOutToAdd.vehicleRegistrationNumber = actualRegistrationNumber;
    vehicleOutToAdd.vehicleOwnerName = actualOwnerName;
    vehicleOutToAdd.vehicleOwnerContactNumber = actualOwnerContactNumber;
    vehicleOutToAdd.inTime = actualInTime;
    vehicleOutToAdd.outTime = outTime;
    vehicleOutToAdd.remark = vehicleIncomingRemark.value;
    vehicleOutToAdd.status = vehicleIncomingStatus.value;
    vehicleOutToAdd.parkingCharge = vehicleIncomingParkingCharge.value;

    vehicleIncomingRemark.value = "";
    vehicleIncomingParkingCharge.value = "";

    fetch(
      "https://vehicleparkingmanagement-default-rtdb.europe-west1.firebasedatabase.app/vehiclesIn/" +
        actualVehicleId +
        ".json",
      {
        method: "DELETE",
      }
    ).then((resp) => {
      fetch(
        "https://vehicleparkingmanagement-default-rtdb.europe-west1.firebasedatabase.app/vehiclesOut.json",
        {
          method: "POST",
          body: JSON.stringify(vehicleOutToAdd),
        }
      ).then((resp) => {
        updateManageIncomingVehicleTable();
        updateManageOutgoingVehicleTable();
        document.getElementById("btn-goToManageOutVehicle").click();
      });
    });
  }
};

const vehicleIncomingUpdateButton = document.getElementById(
  "vehicleIncomingUpdateButton"
);
vehicleIncomingUpdateButton.addEventListener("click", updateVehicleStatus);

export { viewDetailsVehicleIncoming };
