import { transformData } from "./adminLogin.js";
import { loadRouterPage } from "./index.js";

const deleteCategory = () => {
  
}

const updateManageVehicleCategoryTable = () => {
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
        temp += "<tr class='border-top border-2'>";
        temp += "<td class='pt-3 pb-4 ps-3'>" + (i + 1) + "</td>";
        temp +=
          "<td class='pt-3 pb-4 ps-3'>" +
          vehicleCategories[i].categoryName +
          "</td>";
        temp +=
          "<td class='pt-3 pb-4 ps-3'> <button class='btn-linkRouter text-white bg-primary rounded-1 border-0 py-2 px-3 me-1' data-route='/index.html#vehicleUpdateCategory'> Edit </button>";
        temp +=
          "<button class='text-white bg-danger rounded-1 border-0 py-2 px-3'>Delete</button> </td>";
        temp += "</tr>";
      }
      document.getElementById("manageVehicleCategoryTable").innerHTML = temp;

      $("#manageVehicleCategoriesTable").DataTable({
        paging: true,
        ordering: false,
        info: false,
        searching: false,
        lengthChange: false,
        pageLength: 5,
        pagingType: "numbers",
      });
      loadRouterPage();
      let tableManageVehicleCategoriesPagination = document.getElementById(
        "manageVehicleCategoriesTable_paginate"
      );
      tableManageVehicleCategoriesPagination.addEventListener(
        "click",
        loadRouterPage
      );
    });
};

export { updateManageVehicleCategoryTable };
