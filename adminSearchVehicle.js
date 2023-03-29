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

  const makeTableVehicleResultOfTheSearch = (vehicle, id) => {
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
      if (vehicle.status === "Vehicle In") {
        document.getElementById("inVehicleToViewDetails-" + id).click();
      } else {
        document.getElementById("outVehicleToViewDetails-" + id).click();
      }
      inputParkingNumber.value = "";
      searchResultsContainer.classList.add("hide");
      errorSearchVehicleByParkingNumber.classList.add("hide");
    });
  };

  let vehicleMatch = [];

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

      vehicleMatch = vehiclesIn.filter(
        (vehiclesIn) => vehiclesIn.parkingNumber == inputParkingNumber.value
      );

      if (inputParkingNumber.value == null || inputParkingNumber.value == "") {
        searchResultsContainer.classList.add("hide");
        errorSearchVehicleByParkingNumber.classList.remove("hide");
        errorSearchVehicleByParkingNumber.innerHTML =
          "Please enter a parking number.";
      } else if (vehicleMatch.length > 0) {
        for (let i = 0; i < vehiclesIn.length; i++) {
          if (vehicleMatch[0].parkingNumber == vehiclesIn[i].parkingNumber) {
            parkingNumberOfTheSearch.innerHTML = inputParkingNumber.value;
            searchResultsContainer.classList.remove("hide");
            makeTableVehicleResultOfTheSearch(vehicleMatch[0], i);
            break;
          }
        }
      } else if (vehicleMatch.length < 1) {
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

            vehicleMatch = vehiclesOut.filter(
              (vehiclesOut) =>
                vehiclesOut.parkingNumber == inputParkingNumber.value
            );
            if (vehicleMatch.length < 1) {
              searchResultsContainer.classList.add("hide");
              errorSearchVehicleByParkingNumber.classList.remove("hide");
              errorSearchVehicleByParkingNumber.innerHTML =
                "There is no match in the search.";
            } else {
              for (let i = 0; i < vehiclesOut.length; i++) {
                if (
                  vehicleMatch[0].parkingNumber == vehiclesOut[i].parkingNumber
                ) {
                  parkingNumberOfTheSearch.innerHTML = inputParkingNumber.value;
                  searchResultsContainer.classList.remove("hide");
                  makeTableVehicleResultOfTheSearch(vehicleMatch[0], i);
                  break;
                }
              }
            }
          });
      }
    });
});

/*
      for (let i = 0; i < vehiclesIn.length; i++) {
        if (inputParkingNumber.value == vehiclesIn[i].parkingNumber) {
          parkingNumberOfTheSearch.innerHTML = inputParkingNumber.value;
          searchResultsContainer.classList.remove("hide");
          makeTableVehicleInResultOfTheSearch(vehiclesIn[i], i);
          return;
        } else if (
          inputParkingNumber.value == null ||
          inputParkingNumber.value == ""
        ) {
          searchResultsContainer.classList.add("hide");
          errorSearchVehicleByParkingNumber.classList.remove("hide");
          errorSearchVehicleByParkingNumber.innerHTML =
            "Please enter a parking number.";
        } else {
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
            });
        }
      }
      */

/*
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
                    break;
                    return;
                  } else {
                    errorSearchVehicleByParkingNumber.innerHTML =
                      "There is no match in the search.";
                  }
                }
              }*/

/*

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
            errorSearchVehicleByParkingNumber.classList.remove("hide");
            errorSearchVehicleByParkingNumber.innerHTML =
              "There is no match in the search.";
          }
        }
      }

      */

/*
      for (let i = 0; i < vehiclesOut.length; i++) {
        if (inputParkingNumber.value == vehiclesOut[i].parkingNumber) {
          parkingNumberOfTheSearch.innerHTML = inputParkingNumber.value;
          searchResultsContainer.classList.remove("hide");
          makeTableVehicleOutResultOfTheSearch(vehiclesOut[i], i);
          break;
        } else if (
          inputParkingNumber.value == null ||
          inputParkingNumber.value == ""
        ) {
          searchResultsContainer.classList.add("hide");
          errorSearchVehicleByParkingNumber.classList.remove("hide");
          errorSearchVehicleByParkingNumber.innerHTML =
            "Please enter a parking number.";
        } else {
          searchResultsContainer.classList.add("hide");
          errorSearchVehicleByParkingNumber.classList.remove("hide");
          errorSearchVehicleByParkingNumber.innerHTML =
            "There is no match in the search.";
        }
      }*/
