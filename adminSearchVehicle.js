import { transformData } from "./adminLogin.js";

const buttonToSearchByParkingNumber = document.getElementById(
  "searchVehicleButton"
);
buttonToSearchByParkingNumber.addEventListener("click", function () {
  let inputParkingNumber = document.getElementById("searchParkingNumber");
  let searchResultsContainer = document.getElementById("resultsVehicleSearch");
  let parkingNumberOfTheSearch = document.getElementById(
    "parkingNumberOfTheSearch"
  );

  let errorSearchVehicleByParkingNumber = document.getElementById(
    "errorSearchVehicleByParkingNumber"
  );

  const makeTableVehicleOutResultOfTheSearch = (vehicle, id) => {
    errorSearchVehicleByParkingNumber.classList.add("hide");
    let temp = "";

    temp += "<tr class='border-top border-2'>";
    temp += "<td class='pt-3 pb-4 ps-3'>" + "1" + "</td>";
    temp += "<td class='pt-3 pb-4 ps-3'>" + vehicle.parkingNumber + "</td>";
    temp += "<td class='pt-3 pb-4 ps-3'>" + vehicle.vehicleOwnerName + "</td>";
    temp +=
      "<td class='pt-3 pb-4 ps-3'>" +
      vehicle.vehicleRegistrationNumber +
      "</td>";

    temp +=
      "<td class='pt-3 pb-4 ps-3'> <button class='text-white bg-primary rounded-1 border-0 py-2 px-3 me-1' id='viewDetailsOfResultVehicle'> View </button>";
    temp += "</tr>";

    document.getElementById("searchVehicleByParkingNumberDataTable").innerHTML =
      temp;
    let buttonToViewDetailsOfResultVehicle = document.getElementById(
      "viewDetailsOfResultVehicle"
    );
    buttonToViewDetailsOfResultVehicle.addEventListener("click", function () {
      document.getElementById("outVehicleToViewDetails-" + id).click();
      inputParkingNumber.value = "";
      searchResultsContainer.classList.add("hide");
      errorSearchVehicleByParkingNumber.innerHTML = "";
    });
  };

  const makeTableVehicleInResultOfTheSearch = (vehicle, id) => {
    errorSearchVehicleByParkingNumber.classList.add("hide");
    let temp = "";

    temp += "<tr class='border-top border-2'>";
    temp += "<td class='pt-3 pb-4 ps-3'>" + "1" + "</td>";
    temp += "<td class='pt-3 pb-4 ps-3'>" + vehicle.parkingNumber + "</td>";
    temp += "<td class='pt-3 pb-4 ps-3'>" + vehicle.vehicleOwnerName + "</td>";
    temp +=
      "<td class='pt-3 pb-4 ps-3'>" +
      vehicle.vehicleRegistrationNumber +
      "</td>";

    temp +=
      "<td class='pt-3 pb-4 ps-3'> <button class='text-white bg-primary rounded-1 border-0 py-2 px-3 me-1' id='viewDetailsOfResultVehicle'> View </button>";
    temp += "</tr>";

    document.getElementById("searchVehicleByParkingNumberDataTable").innerHTML =
      temp;
    let buttonToViewDetailsOfResultVehicle = document.getElementById(
      "viewDetailsOfResultVehicle"
    );
    buttonToViewDetailsOfResultVehicle.addEventListener("click", function () {
      document.getElementById("inVehicleToViewDetails-" + id).click();
      inputParkingNumber.value = "";
      searchResultsContainer.classList.add("hide");
      errorSearchVehicleByParkingNumber.innerHTML = "";
    });
  };

  fetch(
    "https://vehicleparkingmanagement-default-rtdb.europe-west1.firebasedatabase.app/vehiclesOut.json",
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => transformData(data))
    .then((data) => {
      let vehiclesOut = data;

      if (inputParkingNumber.value == null || inputParkingNumber.value == "") {
        errorSearchVehicleByParkingNumber.classList.remove("hide");
        errorSearchVehicleByParkingNumber.innerHTML =
          "Please enter a parking number.";
      } else {
        for (let i = 0; i < vehiclesOut.length; i++) {
          if (inputParkingNumber.value == vehiclesOut[i].parkingNumber) {
            parkingNumberOfTheSearch.innerHTML = inputParkingNumber.value;
            searchResultsContainer.classList.remove("hide");
            makeTableVehicleOutResultOfTheSearch(vehiclesOut[i], i);
          } else {
            errorSearchVehicleByParkingNumber.innerHTML =
              "There is no match in the search.";
          }
        }
      }
    });

  fetch(
    "https://vehicleparkingmanagement-default-rtdb.europe-west1.firebasedatabase.app/vehiclesIn.json",
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => transformData(data))
    .then((data) => {
      let vehiclesIn = data;

      if (inputParkingNumber.value == null || inputParkingNumber.value == "") {
        errorSearchVehicleByParkingNumber.classList.remove("hide");
        errorSearchVehicleByParkingNumber.innerHTML =
          "Please enter a parking number.";
      } else {
        for (let i = 0; i < vehiclesIn.length; i++) {
          if (inputParkingNumber.value == vehiclesIn[i].parkingNumber) {
            parkingNumberOfTheSearch.innerHTML = inputParkingNumber.value;
            searchResultsContainer.classList.remove("hide");
            makeTableVehicleInResultOfTheSearch(vehiclesIn[i], i);
          } else {
            errorSearchVehicleByParkingNumber.innerHTML =
              "There is no match in the search.";
          }
        }
      }
    });
});
