import { transformData } from "./adminLogin.js";
import { updateCategory } from "./adminUpdateCategory.js";
import { loadRouterPage } from "./index.js";

const deleteCategory = () => {
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

      let categoriesIdentifier = vehicleCategories.map(
        (category) => category.id
      );

      let allButtonsDeleteCategory = [];

      for (let i = 0; i < vehicleCategories.length; i++) {
        let buttonDeleteCategory = document.getElementById(
          "categoryIdentifierToDelete-" + i
        );
        $("#categoryIdentifierToDelete-" + i).data("categoryId", i);
        if (buttonDeleteCategory) {
          allButtonsDeleteCategory.push(buttonDeleteCategory);
          buttonDeleteCategory.addEventListener("click", function (e) {
            let actualCategoryId = $(this).data("categoryId");
            fetch(
              "https://vehicleparkingmanagement-default-rtdb.europe-west1.firebasedatabase.app/vehicle-categories/" +
                actualCategoryId +
                ".json",
              {
                method: "DELETE",
              }
            ).then((resp) => {
              updateManageVehicleCategoryTable();
            });
          });
        } else {
          allButtonsDeleteCategory.push(i);
        }
      }

      // let filteredButtonsDeleteCategory = allButtonsDeleteCategory.filter(
      //   (element) => element
      // );

      // let idOfButtons = [];
      // for (let i = 0; i < filteredButtonsDeleteCategory.length; i++) {
      //   if (isNaN(filteredButtonsDeleteCategory[i])) {
      //     idOfButtons.push(
      //       Number(
      //         filteredButtonsDeleteCategory[i].id.split(
      //           "categoryIdentifierToDelete-"
      //         )[1]
      //       )
      //     );
      //   }
      // }

      for (let i = 0; i < allButtonsDeleteCategory.length; i++) {
        if (isNaN(allButtonsDeleteCategory[i])) {
          $("#categoryIdentifierToDelete-" + i).data(
            "categoryId",
            categoriesIdentifier[i]
          );
        }
      }
    });
};

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

      const makeTableVehicleManageCategory = () => {
        for (let i = 0; i < vehicleCategories.length; i++) {
          temp += "<tr class='border-top border-2'>";
          temp += "<td class='pt-3 pb-4 ps-3'>" + (i + 1) + "</td>";
          temp +=
            "<td class='pt-3 pb-4 ps-3'>" +
            vehicleCategories[i].categoryName +
            "</td>";
          temp +=
            "<td class='pt-3 pb-4 ps-3'> <button class='text-white bg-primary rounded-1 border-0 py-2 px-3 me-1' id='categoryIdentifierToUpdate-" +
            i +
            "'> Edit </button>";
          temp +=
            "<button class='text-white bg-danger rounded-1 border-0 py-2 px-3'id='categoryIdentifierToDelete-" +
            i +
            "'>Delete</button> </td>";
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
          autoWidth: false,
        });
        loadRouterPage();
        deleteCategory();
        updateCategory();
        let tableManageVehicleCategoriesPagination = document.getElementById(
          "manageVehicleCategoriesTable_paginate"
        );
        tableManageVehicleCategoriesPagination.addEventListener("click", () => {
          loadRouterPage();
          deleteCategory();
          updateCategory();
        });
      };

      if (DataTable.isDataTable($("#manageVehicleCategoriesTable"))) {
        $("#manageVehicleCategoriesTable").DataTable().destroy();
        makeTableVehicleManageCategory();
      } else {
        makeTableVehicleManageCategory();
      }
    });
};

export { updateManageVehicleCategoryTable };
