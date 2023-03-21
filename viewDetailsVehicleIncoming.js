import { transformData } from "./adminLogin.js";
// import { updateManageIncomingVehicleTable } from "./adminManageIncomingVehicle.js";

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
      let actualVehicleId = "";
      let actualParkingNumber = "";
      let actualVehicleCategory = "";
      let actualVehicleCompanyName = "";
      let actualRegistrationNumber = "";
      let actualOwnerName = "";
      let actualOwnerContactNumber = "";
      let actualInTime = "";
      let actualStatus = "";

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

        document.getElementById("viewVehicleDetailsDataTable").innerHTML = temp;
      };

      for (let i = 0; i < vehicles.length; i++) {
        let buttonToViewVehicleDetails = document.getElementById(
          "vehicleToViewDetails-" + i
        );

        if (buttonToViewVehicleDetails) {
          allButtonsViewDetails.push(buttonToViewVehicleDetails);
        } else {
          allButtonsViewDetails.push(i);
        }
      }

      for (let i = 0; i < allButtonsViewDetails.length; i++) {
        if (isNaN(allButtonsViewDetails[i])) {
          $("#vehicleToViewDetails-" + i).data("vehicle", {
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
          "vehicleToViewDetails-" + i
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
            
            document.getElementById("btn-goToViewVehicleDetails").click();
          });
        }
      }
    });
};

export { viewDetailsVehicleIncoming };

// for (let i = 0; i < vehicles.length; i++) {
//   temp += "<tr>";
//   temp += "<th class='fw-bold p-3' scope='row'>Parking Number</th>";
//   temp += "<td>" + vehicles[i].parkingNumber + "</td>";
//   temp += "</tr>";
// }
// document.getElementById("viewVehicleDetailsDataTable").innerHTML =
//   temp;

//   let buttonToViewVehicleDetails =
//     document.getElementById("updateCategoryName");

//   buttonToViewVehicleDetails.addEventListener("click", function (e) {
//     const errorUpdateVehicleCategory = document.getElementById(
//       "errorUpdateVehicleCategory"
//     );
//     let categoryValidation = [];

//     for (let i = 0; i < vehicles.length; i++) {
//       categoryValidation.push(vehicles[i].categoryName);
//     }

//     const categoryValidationFilter = (category) => {
//       return category === input_categoryToUpdate.value;
//     };

//     if (
//       input_categoryToUpdate.value == null ||
//       input_categoryToUpdate.value == ""
//     ) {
//       errorUpdateVehicleCategory.classList.remove("hide");
//       errorUpdateVehicleCategory.innerHTML = "Please enter a category name";
//     } else if (
//       categoryValidation.filter(categoryValidationFilter).length > 0
//     ) {
//       errorUpdateVehicleCategory.classList.remove("hide");
//       errorUpdateVehicleCategory.innerHTML = "Category already exists";
//     } else {
//       errorUpdateVehicleCategory.classList.add("hide");
//       errorUpdateVehicleCategory.innerHTML = "";

//       const categoryToUpdate = {
//         categoryName: input_categoryToUpdate.value,
//       };
/*
            if (actualCategoryId == null || actualCategoryId == "") {
              return;
            } else {
              fetch(
                "https://vehicleparkingmanagement-default-rtdb.europe-west1.firebasedatabase.app/vehicle-categories/" +
                  actualCategoryId +
                  ".json",
                {
                  method: "PUT",
                  body: JSON.stringify(categoryToUpdate),
                }
              ).then((resp) => {
                updateManageIncomingVehicleTable();
                document.getElementById("btnToManageVehicleCategory").click();
                actualCategoryId = "";
              });
            }*/
// }
//   });

//           buttonToViewVehicleDetails.addEventListener("click", function (e) {
//             // document.getElementById("btn-goToViewVehicleDetails").click();
//
//                 <tr>
//                     <th class="fw-bold p-3" scope="row">Parking Number</th>
//                     <td>Example</td>
//                   </tr>
//                   <tr>
//                     <th class="fw-bold p-3" scope="row">Vehicle Category</th>
//                     <td>Example</td>
//                   </tr>
//                   <tr>
//                     <th class="fw-bold p-3" scope="row">
//                       Vehicle Company name
//                     </th>
//                     <td>Example</td>
//                   </tr>
//                   <tr>
//                     <th class="fw-bold p-3" scope="row">Registration Number</th>
//                     <td>Example</td>
//                   </tr>
//                   <tr>
//                     <th class="fw-bold p-3" scope="row">Owner name</th>
//                     <td>Example</td>
//                   </tr>
//                   <tr>
//                     <th class="fw-bold p-3" scope="row">
//                       Owner Contact Number
//                     </th>
//                     <td>Example</td>
//                   </tr>
//                   <tr>
//                     <th class="fw-bold p-3" scope="row">In Time</th>
//                     <td>Example</td>
//                   </tr>
//                   <tr>
//                     <th class="fw-bold p-3" scope="row">Status</th>
//                     <td>Example</td>
//
//             //   actualCategoryId = $(this).data("category").id;
//             //   actualCategoryName = $(this).data("category").name;
//             //   input_categoryToUpdate.value = actualCategoryName;
//           });

//   for (let i = 0; i < allButtonsViewDetails.length; i++) {
//     if (isNaN(allButtonsViewDetails[i])) {
//       $("#vehicleToViewDetails-" + i).data("category", {
//         id: vehiclesIdentifier[i],
//         name: vehicles[i].categoryName,
//       });
//     }
//   }
