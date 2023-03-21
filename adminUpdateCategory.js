import { transformData } from "./adminLogin.js";
import { updateManageVehicleCategoryTable } from "./adminVehicleManageCategory.js";

// const updateCategory = () => {
//   fetch(
//     "https://vehicleparkingmanagement-default-rtdb.europe-west1.firebasedatabase.app/vehicle-categories.json",
//     {
//       method: "GET",
//     }
//   )
//     .then((response) => response.json())
//     .then((data) => transformData(data))
//     .then((data) => {
//       let vehicleCategories = data;

//       let categoriesIdentifier = vehicleCategories.map(
//         (category) => category.id
//       );

//       let allButtonsUpdateCategory = [];

//       //   dataToUpdate["category"] = inputAddCategory.val();

//       const update = () => {
//         document.getElementById("btn-goToUpdateCategorySection").click();

//         let input_categoryToUpdate = document.getElementById(
//           "updateCategoryNameInput"
//         );

//         let buttonToUpdateCategory =
//           document.getElementById("updateCategoryName");

//         let actualCategoryId = $(this).data("categoryId");

//         buttonToUpdateCategory.addEventListener("click", function (e) {
//           const categoryToUpdate = {
//             categoryName: input_categoryToUpdate.value,
//           };
//           console.log(categoryToUpdate);
//           fetch(
//             "https://vehicleparkingmanagement-default-rtdb.europe-west1.firebasedatabase.app/vehicle-categories/" +
//               actualCategoryId +
//               ".json",
//             {
//               method: "PUT",
//               body: JSON.stringify(categoryToUpdate),
//             }
//           ).then((resp) => {
//             updateManageVehicleCategoryTable();
//           });
//         });
//       };

//       for (let i = 0; i < vehicleCategories.length; i++) {
//         let buttonUpdateCategory = document.getElementById(
//           "categoryIdentifierToUpdate-" + i
//         );
//         $("#categoryIdentifierToUpdate-" + i).data("categoryId", i);
//         if (buttonUpdateCategory) {
//           allButtonsUpdateCategory.push(buttonUpdateCategory);
//           buttonUpdateCategory.addEventListener("click", update);
//         } else {
//           allButtonsUpdateCategory.push(i);
//         }
//       }

//       let filteredButtonsUpdateCategory = allButtonsUpdateCategory.filter(
//         (element) => element
//       );

//       let idOfButtons = [];
//       for (let i = 0; i < filteredButtonsUpdateCategory.length; i++) {
//         if (isNaN(filteredButtonsUpdateCategory[i])) {
//           idOfButtons.push(
//             Number(
//               filteredButtonsUpdateCategory[i].id.split(
//                 "categoryIdentifierToUpdate-"
//               )[1]
//             )
//           );
//         }
//       }

//       for (let i = 0; i < allButtonsUpdateCategory.length; i++) {
//         if (isNaN(allButtonsUpdateCategory[i])) {
//           $("#categoryIdentifierToUpdate-" + i).data(
//             "categoryId",
//             categoriesIdentifier[i]
//           );
//         }
//       }
//     });
// };

// export { updateCategory };

const updateCategory = () => {
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

      let allButtonsUpdateCategory = [];
      let input_categoryToUpdate = document.getElementById(
        "updateCategoryNameInput"
      );
      let actualCategoryName = "";
      let actualCategoryId = "";

      for (let i = 0; i < vehicleCategories.length; i++) {
        let buttonToUpdateCategory = document.getElementById(
          "categoryIdentifierToUpdate-" + i
        );
        // $("#categoryIdentifierToUpdate-" + i).data("categoryId", i);
        if (buttonToUpdateCategory) {
          allButtonsUpdateCategory.push(buttonToUpdateCategory);

          buttonToUpdateCategory.addEventListener("click", function (e) {
            document.getElementById("btn-goToUpdateCategorySection").click();

            actualCategoryId = $(this).data("category").id;
            actualCategoryName = $(this).data("category").name;
            input_categoryToUpdate.value = actualCategoryName;
          });
        } else {
          allButtonsUpdateCategory.push(i);
        }
      }

      for (let i = 0; i < allButtonsUpdateCategory.length; i++) {
        if (isNaN(allButtonsUpdateCategory[i])) {
          $("#categoryIdentifierToUpdate-" + i).data("category", {
            id: categoriesIdentifier[i],
            name: vehicleCategories[i].categoryName,
          });
        }
      }

      let buttonToUpdateCategory =
        document.getElementById("updateCategoryName");

      buttonToUpdateCategory.addEventListener("click", function (e) {
        const errorUpdateVehicleCategory = document.getElementById(
          "errorUpdateVehicleCategory"
        );
        let categoryValidation = [];

        for (let i = 0; i < vehicleCategories.length; i++) {
          categoryValidation.push(vehicleCategories[i].categoryName);
        }

        const categoryValidationFilter = (category) => {
          return category === input_categoryToUpdate.value;
        };

        if (
          input_categoryToUpdate.value == null ||
          input_categoryToUpdate.value == ""
        ) {
          errorUpdateVehicleCategory.classList.remove("hide");
          errorUpdateVehicleCategory.innerHTML = "Please enter a category name";
        } else if (
          categoryValidation.filter(categoryValidationFilter).length > 0
        ) {
          errorUpdateVehicleCategory.classList.remove("hide");
          errorUpdateVehicleCategory.innerHTML = "Category already exists";
        } else {
          errorUpdateVehicleCategory.classList.add("hide");
          errorUpdateVehicleCategory.innerHTML = "";

          const categoryToUpdate = {
            categoryName: input_categoryToUpdate.value,
          };

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
              updateManageVehicleCategoryTable();
              document.getElementById("btnToManageVehicleCategory").click();
              actualCategoryId = "";
            });
          }
        }
      });
    });
};

export { updateCategory };
