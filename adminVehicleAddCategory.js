import { transformData } from "./adminLogin.js";
import { updateManageVehicleCategoryTable } from "./adminVehicleManageCategory.js";
import { updateSelectCategoryAddVehicle } from "./adminAddVehicle.js";
import { updateDashboardEntries } from "./adminDashboard.js";

const btn_addVehicleCategory = document.getElementById(
  "btn-addVehicleCategory"
);
const input_addVehicleCategory = document.getElementById(
  "input-addVehicleCategory"
);
const errorAddVehicleCategory = document.getElementById(
  "errorAddVehicleCategory"
);

const addVehicleCategory = () => {
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

      let categoryValidation = [];

      for (let i = 0; i < vehicleCategories.length; i++) {
        categoryValidation.push(vehicleCategories[i].categoryName);
      }

      const categoryValidationFilter = (category) => {
        return category === input_addVehicleCategory.value;
      };

      if (
        input_addVehicleCategory.value == null ||
        input_addVehicleCategory.value == ""
      ) {
        errorAddVehicleCategory.classList.remove("hide");
        errorAddVehicleCategory.innerHTML = "Please enter a category name";
      } else if (
        categoryValidation.filter(categoryValidationFilter).length > 0
      ) {
        errorAddVehicleCategory.classList.remove("hide");
        errorAddVehicleCategory.innerHTML = "Category already exists";
      } else {
        errorAddVehicleCategory.classList.add("hide");
        errorAddVehicleCategory.innerHTML = "";

        let categoryPost = {};
        categoryPost.categoryName = input_addVehicleCategory.value;
        input_addVehicleCategory.value = "";

        fetch(
          "https://vehicleparkingmanagement-default-rtdb.europe-west1.firebasedatabase.app/vehicle-categories.json",
          {
            method: "POST",
            body: JSON.stringify(categoryPost),
          }
        ).then((data) => {
          // $("#manageVehicleCategoriesTable").DataTable().destroy();
          updateManageVehicleCategoryTable();
          updateSelectCategoryAddVehicle();
          updateDashboardEntries();
          document.getElementById("btnToManageVehicleCategory").click();
          // Update things Here
        });
      }
    });
};
btn_addVehicleCategory.addEventListener("click", addVehicleCategory);
