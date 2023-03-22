import { transformData } from "./adminLogin.js";
import { updateManageIncomingVehicleTable } from "./adminManageIncomingVehicle.js";

const updateSelectCategoryAddVehicle = () => {
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
      let temp = "";

      for (let i = 0; i < vehicleCategories.length; i++) {
        temp += "<option>" + vehicleCategories[i].categoryName + "</option>";
      }
      document.getElementById("addVehicleCategorySelect").innerHTML = temp;
    });
};

const addVehicle = () => {
  let vehicleCategoryNameSelect = document.getElementById(
    "addVehicleCategorySelect"
  );
  let errorSelectedCategory = document.getElementById(
    "errorSelectedCategoryAddVehicle"
  );

  let vehicleCompany = document.getElementById("addVehicleCompany");
  let errorvehicleCompany = document.getElementById(
    "errorVehicleCompanyAddVehicle"
  );
  let vehicleRegistrationNumber = document.getElementById(
    "addVehicleRegistrarionNumber"
  );
  let errorRegistrarionNumberAddVehicle = document.getElementById(
    "errorRegistrarionNumberAddVehicle"
  );

  let vehicleOwnerName = document.getElementById("addVehicleOwnerName");
  let errorOwnerNameAddVehicle = document.getElementById(
    "errorOwnerNameAddVehicle"
  );

  let vehicleOwnerContactNumber = document.getElementById(
    "addVehicleOwnerContactNumber"
  );
  let errorOwnerContactNumberAddVehicle = document.getElementById(
    "errorOwnerContactNumberAddVehicle"
  );

  let categoryNameValueSelected = vehicleCategoryNameSelect.value;

  let valid = [];

  if (categoryNameValueSelected == null || categoryNameValueSelected == "") {
    errorSelectedCategory.innerHTML = "Please create a category.";
    vehicleCategoryNameSelect.classList.remove("mb-4");
    valid.push("false");
  } else {
    errorSelectedCategory.innerHTML = "";
    vehicleCompany.classList.add("mb-4");
    valid.push("true");
  }

  if (vehicleCompany.value == null || vehicleCompany.value == "") {
    errorvehicleCompany.innerHTML = "Please enter the company of the vehicle.";
    vehicleCompany.classList.remove("mb-4");
    valid.push("false");
  } else {
    errorvehicleCompany.innerHTML = "";
    vehicleCompany.classList.add("mb-4");
    valid.push("true");
  }

  if (
    vehicleRegistrationNumber.value == null ||
    vehicleRegistrationNumber.value == ""
  ) {
    errorRegistrarionNumberAddVehicle.innerHTML =
      "Please enter the vehicle registration number.";
    vehicleRegistrationNumber.classList.remove("mb-4");
    valid.push("false");
  } else if (vehicleRegistrationNumber.value.length < 4) {
    errorRegistrarionNumberAddVehicle.innerHTML =
      "Please enter a valid registration number.";
    vehicleRegistrationNumber.classList.remove("mb-4");
    valid.push("false");
  } else {
    errorRegistrarionNumberAddVehicle.innerHTML = "";
    vehicleRegistrationNumber.classList.add("mb-4");
    valid.push("true");
  }

  if (vehicleOwnerName.value == null || vehicleOwnerName.value == "") {
    errorOwnerNameAddVehicle.innerHTML =
      "Please enter the name of the owner of the vehicle.";
    vehicleOwnerName.classList.remove("mb-4");
    valid.push("false");
  } else {
    errorOwnerNameAddVehicle.innerHTML = "";
    vehicleOwnerName.classList.add("mb-4");
    valid.push("true");
  }

  if (
    vehicleOwnerContactNumber.value == null ||
    vehicleOwnerContactNumber.value == ""
  ) {
    errorOwnerContactNumberAddVehicle.innerHTML =
      "Please enter the contact number of the vehicle owner.";
    vehicleOwnerContactNumber.classList.remove("mb-4");
    valid.push("false");
  } else if (vehicleOwnerContactNumber.value.length < 9) {
    errorOwnerContactNumberAddVehicle.innerHTML =
      "Please enter a valid contact number for the vehicle owner.";
    vehicleOwnerContactNumber.classList.remove("mb-4");
    valid.push("false");
  } else {
    errorOwnerContactNumberAddVehicle.innerHTML = "";
    vehicleOwnerContactNumber.classList.add("mb-4");
    valid.push("true");
  }

  let date = new Date();
  let currentDate =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  let currentTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  let inTime = currentDate + " " + currentTime;

  const checkData = (element) => {
    return element === "true";
  };

  const getParkingNumber = (max) => {
    return Math.floor(Math.random() * max);
  };

  if (valid.every(checkData)) {
    let vehicleToAdd = {};
    vehicleToAdd.parkingNumber = getParkingNumber(1000000000);
    vehicleToAdd.vehicleCategory = categoryNameValueSelected;
    vehicleToAdd.vehicleCompany = vehicleCompany.value;
    vehicleToAdd.vehicleRegistrationNumber = vehicleRegistrationNumber.value;
    vehicleToAdd.vehicleOwnerName = vehicleOwnerName.value;
    vehicleToAdd.vehicleOwnerContactNumber = vehicleOwnerContactNumber.value;
    vehicleToAdd.status = "Vehicle In";
    vehicleToAdd.inTime = inTime;

    fetch(
      "https://vehicleparkingmanagement-default-rtdb.europe-west1.firebasedatabase.app/vehiclesIn.json",
      {
        method: "POST",
        body: JSON.stringify(vehicleToAdd),
      }
    ).then((data) => {
      vehicleCompany.value = "";
      vehicleRegistrationNumber.value = "";
      vehicleOwnerName.value = "";
      vehicleOwnerContactNumber.value = "";
      updateManageIncomingVehicleTable();
      document.getElementById("btn-goToManageInVehicle").click();
    });
  }
};

const addVehicleToManageIn = document.getElementById("addVehicleToManageIn");
addVehicleToManageIn.addEventListener("click", addVehicle);

export { updateSelectCategoryAddVehicle };
