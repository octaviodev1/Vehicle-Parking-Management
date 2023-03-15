import { transformData } from "./adminLogin.js";
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
          "categoryIdentifier-" + i
        );
        $("#categoryIdentifier-" + i).data("categoryId", i);
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

      let filteredButtonsDeleteCategory = allButtonsDeleteCategory.filter(
        (element) => element
      );

      let idOfButtons = [];
      for (let i = 0; i < filteredButtonsDeleteCategory.length; i++) {
        if (isNaN(filteredButtonsDeleteCategory[i])) {
          idOfButtons.push(
            Number(
              filteredButtonsDeleteCategory[i].id.split(
                "categoryIdentifier-"
              )[1]
            )
          );
        }
      }

      for (let i = 0; i < allButtonsDeleteCategory.length; i++) {
        if (isNaN(allButtonsDeleteCategory[i])) {
          $("#categoryIdentifier-" + i).data(
            "categoryId",
            categoriesIdentifier[i]
          );
        }
      }

      // let idOfCategories = idOfButtons.map(
      //   (item) => categoriesIdentifier[item]
      // );

      // let example = $("#categoryIdentifier-0").data("categoryId");
      // console.log(example);

      // miArray.forEach(function (valor, indice, array) {
      //   console.log("En el índice " + indice + " hay este valor: " + valor);
      // });

      // filteredButtonsDeleteCategory.forEach(function (value, index, array) {
      //   console.log(value.id);
      //   value.data("categoryId", idOfCategories[index]);
      //   console.log($("categoryIdentifier-1").data("categoryId"));
      // });

      // for (let i = 0; i < filteredButtonsDeleteCategory.length; i++) {
      //   console.log(filteredButtonsDeleteCategory[i]);
      //   // filteredButtonsDeleteCategory[i].data(idOfCategories[i])
      //   // for each?
      // }

      // fetch(
      //   "https://vehicleparkingmanagement-default-rtdb.europe-west1.firebasedatabase.app/vehicle-categories.json",
      //   {
      //     method: "DELETE",
      //   }
      // )
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
            "<td class='pt-3 pb-4 ps-3'> <button class='btn-linkRouter text-white bg-primary rounded-1 border-0 py-2 px-3 me-1' data-route='/index.html#vehicleUpdateCategory'> Edit </button>";
          temp +=
            "<button class='text-white bg-danger rounded-1 border-0 py-2 px-3'id='categoryIdentifier-" +
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
        });
        loadRouterPage();
        deleteCategory();
        let tableManageVehicleCategoriesPagination = document.getElementById(
          "manageVehicleCategoriesTable_paginate"
        );
        tableManageVehicleCategoriesPagination.addEventListener("click", () => {
          loadRouterPage();
          deleteCategory();
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
