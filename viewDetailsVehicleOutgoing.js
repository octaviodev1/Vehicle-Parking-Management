import { transformData } from "./adminLogin.js";

const viewDetailsVehicleOutgoing = () => {
  fetch(
    "https://vehicleparkingmanagement-default-rtdb.europe-west1.firebasedatabase.app/vehiclesOut.json",
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => transformData(data))
    .then((data) => {
      let vehicles = data;
      console.log(vehicles);
      let vehiclesIdentifier = vehicles.map((vehicle) => vehicle.id);

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

      const makeTableViewDetailsVehicleOutgoing = () => {
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
        temp += "<th class='fw-bold p-3' scope='row'>Out Time</th>";
        temp += "<td>" + actualOutTime + "</td>";
        temp += "</tr>";

        temp += "<tr>";
        temp += "<th class='fw-bold p-3' scope='row'>Remark</th>";
        temp += "<td>" + actualRemark + "</td>";
        temp += "</tr>";

        temp += "<tr>";
        temp += "<th class='fw-bold p-3' scope='row'>Status</th>";
        temp += "<td>" + actualStatus + "</td>";
        temp += "</tr>";

        temp += "<tr>";
        temp += "<th class='fw-bold p-3' scope='row'>Parking Fee</th>";
        temp += "<td>" + actualParkingCharge + "</td>";
        temp += "</tr>";

        document.getElementById(
          "viewVehicleOutgoingDetailsDataTable"
        ).innerHTML = temp;
      };

      for (let i = 0; i < vehicles.length; i++) {
        let buttonToViewVehicleDetails = document.getElementById(
          "outVehicleToViewDetails-" + i
        );

        if (buttonToViewVehicleDetails) {
          allButtonsViewDetails.push(buttonToViewVehicleDetails);
        } else {
          allButtonsViewDetails.push(i);
        }
      }

      for (let i = 0; i < allButtonsViewDetails.length; i++) {
        if (isNaN(allButtonsViewDetails[i])) {
          $("#outVehicleToViewDetails-" + i).data("vehicle", {
            id: vehiclesIdentifier[i],
            parkingNumber: vehicles[i].parkingNumber,
            vehicleCategory: vehicles[i].vehicleCategory,
            vehicleCompany: vehicles[i].vehicleCompany,
            vehicleRegistrationNumber: vehicles[i].vehicleRegistrationNumber,
            vehicleOwnerName: vehicles[i].vehicleOwnerName,
            vehicleOwnerContactNumber: vehicles[i].vehicleOwnerContactNumber,
            inTime: vehicles[i].inTime,
            outTime: vehicles[i].outTime,
            remark: vehicles[i].remark,
            status: vehicles[i].status,
            parkingCharge: vehicles[i].parkingCharge,
          });
        }
      }

      for (let i = 0; i < vehicles.length; i++) {
        let buttonToViewVehicleDetails = document.getElementById(
          "outVehicleToViewDetails-" + i
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

            makeTableViewDetailsVehicleOutgoing();

            document
              .getElementById("btn-goToViewOutgoingVehicleDetails")
              .click();
          });
        }
      }
    });
};

export { viewDetailsVehicleOutgoing };
// viewVehicleOutgoing
