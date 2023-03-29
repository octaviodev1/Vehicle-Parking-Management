// Put counters
import { transformData } from "./adminLogin.js";
const updateDashboardEntries = () => {
  fetch(
    "https://vehicleparkingmanagement-default-rtdb.europe-west1.firebasedatabase.app/vehiclesIn.json",
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => transformData(data))
    .then((data) => {
      let todayVehicleEntries = document.getElementById("todayVehicleEntries");
      let yesterdayVehicleEntries = document.getElementById(
        "yesterdayVehicleEntries"
      );
      let last7DaysVehicleEntries = document.getElementById(
        "last7DaysVehicleEntries"
      );
      let totalVehicleEntries = document.getElementById("totalVehicleEntries");
      let totalRegisteredUsers = document.getElementById(
        "totalRegisteredUsers"
      );
      let totalListedCategories = document.getElementById(
        "totalListedCategories"
      );

      let totalVehiclesIncoming = data;
      let counterOfVehiclesEntriesToday = 0;
      let counterOfVehiclesEntriesYesterday = 0;
      let counterOfVehiclesEntriesInTheLast7Days = 0;
      let vehiclesIncomingTotalEntries = totalVehiclesIncoming.length;

      for (let i = 0; i < totalVehiclesIncoming.length; i++) {
        let dateOfTheEntryOfTheVehicleInMiliseconds = Date.parse(
          totalVehiclesIncoming[i].inTime
        );
        let dateNowInMiliseconds = Date.now();
        if (
          dateNowInMiliseconds - dateOfTheEntryOfTheVehicleInMiliseconds <
          86400000
        ) {
          counterOfVehiclesEntriesToday++;
        } else if (
          dateNowInMiliseconds - dateOfTheEntryOfTheVehicleInMiliseconds > 86400000 && dateNowInMiliseconds - dateOfTheEntryOfTheVehicleInMiliseconds < 86400000 * 2
        ) {
          counterOfVehiclesEntriesYesterday++;
        } else if (
          dateNowInMiliseconds - dateOfTheEntryOfTheVehicleInMiliseconds <
          86400000 * 7
        ) {
          counterOfVehiclesEntriesInTheLast7Days++;
        }
      }

      fetch(
        "https://vehicleparkingmanagement-default-rtdb.europe-west1.firebasedatabase.app/vehiclesOut.json",
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => transformData(data))
        .then((data) => {
          let totalVehiclesOutgoing = data;
          let vehiclesOutgoingTotalEntries = totalVehiclesOutgoing.length;
          let totalEntries =
            vehiclesOutgoingTotalEntries + vehiclesIncomingTotalEntries;
          fetch(
            "https://vehicleparkingmanagement-default-rtdb.europe-west1.firebasedatabase.app/ownersContactNumber.json",
            {
              method: "GET",
            }
          )
            .then((response) => response.json())
            .then((data) => transformData(data))
            .then((data) => {
              let ownerContactNumber = data;
              let totalAmountOfOwners = ownerContactNumber.length;

              fetch(
                "https://vehicleparkingmanagement-default-rtdb.europe-west1.firebasedatabase.app/vehicle-categories.json",
                {
                  method: "GET",
                }
              )
                .then((response) => response.json())
                .then((data) => transformData(data))
                .then((data) => {
                  let vehicleCategories = data;
                  let totalAmountOfCategories = vehicleCategories.length;

                  todayVehicleEntries.innerHTML = counterOfVehiclesEntriesToday;
                  yesterdayVehicleEntries.innerHTML =
                    counterOfVehiclesEntriesYesterday;
                  last7DaysVehicleEntries.innerHTML =
                    counterOfVehiclesEntriesInTheLast7Days;
                  totalVehicleEntries.innerHTML = totalEntries;
                  totalRegisteredUsers.innerHTML = totalAmountOfOwners;
                  totalListedCategories.innerHTML = totalAmountOfCategories;
                });
            });
        });
    });
};
export { updateDashboardEntries };
