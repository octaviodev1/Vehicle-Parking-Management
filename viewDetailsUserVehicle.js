import { transformData } from "./adminLogin.js";
import { userVehicles } from "./userManageVehicles.js";

const viewDetailsUserVehicle = () => {
  let vehiclesIdentifier = userVehicles.map((vehicle) => vehicle.id);

  let allButtonsViewDetails = [];

  let actualVehicleId = "";
  let actualParkingNumber = "";
  let actualVehicleCategory = "";
  let actualVehicleCompanyName = "";
  let actualRegistrationNumber = "";
  let actualOwnerName = "";
  let actualOwnerContactNumber = "";
  let actualInTime = "";
  let actualOutTime = "";
  let actualRemark = "";
  let actualStatus = "";
  let actualParkingCharge = "";

  const makeTableViewDetailsUserVehicle = () => {
    let temp = "";

    if (!actualRemark) {
      actualRemark = "";
    }

    if (!actualParkingCharge) {
      actualParkingCharge = "";
    }

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

    temp += "<tr>";
    temp += "<th class='fw-bold p-3' scope='row'>Remark</th>";
    temp += "<td>" + actualRemark + "</td>";
    temp += "</tr>";

    temp += "<tr>";
    temp += "<th class='fw-bold p-3' scope='row'>Parking Fee</th>";
    temp += "<td>" + actualParkingCharge + "</td>";
    temp += "</tr>";

    document.getElementById("viewUserVehicleDetailsDataTable").innerHTML = temp;
  };

  for (let i = 0; i < userVehicles.length; i++) {
    let buttonToViewVehicleDetails = document.getElementById(
      "userVehicleToViewDetails-" + i
    );

    if (buttonToViewVehicleDetails) {
      allButtonsViewDetails.push(buttonToViewVehicleDetails);
    } else {
      allButtonsViewDetails.push(i);
    }
  }

  for (let i = 0; i < allButtonsViewDetails.length; i++) {
    if (isNaN(allButtonsViewDetails[i])) {
      $("#userVehicleToViewDetails-" + i).data("vehicle", {
        id: vehiclesIdentifier[i],
        parkingNumber: userVehicles[i].parkingNumber,
        vehicleCategory: userVehicles[i].vehicleCategory,
        vehicleCompany: userVehicles[i].vehicleCompany,
        vehicleRegistrationNumber: userVehicles[i].vehicleRegistrationNumber,
        vehicleOwnerName: userVehicles[i].vehicleOwnerName,
        vehicleOwnerContactNumber: userVehicles[i].vehicleOwnerContactNumber,
        inTime: userVehicles[i].inTime,
        outTime: userVehicles[i].outTime,
        remark: userVehicles[i].remark,
        status: userVehicles[i].status,
        parkingCharge: userVehicles[i].parkingCharge,
      });
    }
  }

  for (let i = 0; i < userVehicles.length; i++) {
    let buttonToViewVehicleDetails = document.getElementById(
      "userVehicleToViewDetails-" + i
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
        actualOutTime = $(this).data("vehicle").outTime;
        actualRemark = $(this).data("vehicle").remark;
        actualStatus = $(this).data("vehicle").status;
        actualParkingCharge = $(this).data("vehicle").parkingCharge;

        makeTableViewDetailsUserVehicle();

        document.getElementById("btn-goToViewDetailsUserVehicle").click();
      });
    }
  }
};

export { viewDetailsUserVehicle };
