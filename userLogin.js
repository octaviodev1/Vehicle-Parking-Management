import { transformData } from "./adminLogin.js";
import { updateUserVehicleTable } from "./userManageVehicles.js";

const sigInUser = () => {
  fetch(
    "https://vehicleparkingmanagement-default-rtdb.europe-west1.firebasedatabase.app/ownersContactNumber.json",
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => transformData(data))
    .then((data) => {
      let ownersData = data;
      let ownerContactNumber = document.getElementById("userContactNumber");
      let errorOwnerContactNumber = document.getElementById(
        "erroruserContactNumber"
      );
      let userNameDashboard = document.getElementById("dashboardUserName");

      let userMatch = ownersData.filter(
        (ownersData) =>
          ownersData.vehicleOwnerContactNumber == ownerContactNumber.value
      );
      if (ownerContactNumber.value == null || ownerContactNumber.value == "") {
        errorOwnerContactNumber.classList.remove("hide");
        errorOwnerContactNumber.innerHTML = "Please enter a contact number.";
      } else if (userMatch.length === 1) {
        let actualUser = {};
        actualUser.name = userMatch[0].vehicleOwnerName;
        actualUser.contactNumber = userMatch[0].vehicleOwnerContactNumber;
        localStorage.setItem("loggedInUser", JSON.stringify(actualUser));
        localStorage.setItem("loggedUser", true);
        localStorage.setItem("loggedAdmin", false);
        ownerContactNumber.value = "";
        let actualUserData = JSON.parse(localStorage.getItem("loggedInUser"));

        userNameDashboard.innerHTML = actualUserData.name;
        
        errorOwnerContactNumber.classList.add("hide");
        document.getElementById("goToUserDashboard").click();

        updateUserVehicleTable();
      } else {
        errorOwnerContactNumber.classList.remove("hide");
        errorOwnerContactNumber.innerHTML =
          "There is no vehicle linked to this number.";
      }
    });
};
const signInUser = document.getElementById("signIn-userLogin");
signInUser.addEventListener("click", sigInUser);

const checkLoggedUser = () => {
  if (JSON.parse(localStorage.getItem("loggedUser")) == true) {
    document.getElementById("goToUserDashboard").click();
  }
};

const btn_goToUserLogin = document.getElementById("btn-goToUserLogin");
btn_goToUserLogin.addEventListener("click", checkLoggedUser);
