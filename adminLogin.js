import { updateManageVehicleCategoryTable } from "./adminVehicleManageCategory.js";
import { updateSelectCategoryAddVehicle } from "./adminAddVehicle.js";
import { updateManageIncomingVehicleTable } from "./adminManageIncomingVehicle.js";
import { updateManageOutgoingVehicleTable } from "./adminManageOutgoingVehicle.js";
import { updateDashboardEntries } from "./adminDashboard.js";

const sigInAdminBtn = document.getElementById("signIn-adminLogin");

const transformData = (data) => {
  const transformedData = [];

  for (const key in data) {
    const dataObj = {
      id: key,
      ...data[key],
    };

    transformedData.push(dataObj);
  }
  return transformedData;
};

const sigInAdmin = () => {
  fetch(
    "https://vehicleparkingmanagement-default-rtdb.europe-west1.firebasedatabase.app/admin-users.json",
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => transformData(data))
    .then((data) => {
      let adminUser = document.getElementById("userName-adminLogin");
      let adminPassword = document.getElementById("password-adminLogin");

      let errorAdminUser = document.getElementById("errorUserName-adminLogin");
      let errorAdminPassword = document.getElementById(
        "errorPassword-adminLogin"
      );

      let valid = [];

      let usersData = data;

      const userCheck = (user) => {
        return (
          user.user == adminUser.value && user.password == adminPassword.value
        );
      };

      if (adminUser.value == null || adminUser.value == "") {
        errorAdminUser.innerHTML = "Please enter a Admin User";
        valid.push("false");
      } else {
        errorAdminUser.innerHTML = "";
        valid.push("true");
      }

      if (adminPassword.value == null || adminPassword.value == "") {
        errorAdminPassword.innerHTML = "Please enter a password";
        valid.push("false");
      } else {
        errorAdminPassword.innerHTML = "";
        valid.push("true");
      }

      const checkData = (element) => {
        return element === "true";
      };

      if (valid.every(checkData)) {
        let userLogged = usersData.filter(userCheck);
        if (userLogged.length == 0) {
          errorAdminUser.innerHTML = "User don't match";
          errorAdminPassword.innerHTML = "Password don't match";
          adminUser.value = "";
          adminPassword.value = "";
        } else {
          localStorage.setItem("loggedInUserAdmin", JSON.stringify(userLogged));
          localStorage.setItem("loggedAdmin", true);
          localStorage.setItem("loggedUser", false);
          //   localStorage.setItem("isEditing", false);
          adminUser.value = "";
          adminPassword.value = "";
          document.getElementById("btnToDashboardAdmin").click();
          updateDashboardEntries();
          updateManageVehicleCategoryTable();
          updateSelectCategoryAddVehicle();
          updateManageIncomingVehicleTable();
          updateManageOutgoingVehicleTable();
        }
      }

      // END
    });
};

const checkLoggedAdmin = () => {
  if (JSON.parse(localStorage.getItem("loggedAdmin")) == true) {
    document.getElementById("btnToDashboardAdmin").click();
  }
};

const btn_goToAdminLogin = document.getElementById("btn-goToAdminLogin");
btn_goToAdminLogin.addEventListener("click", checkLoggedAdmin);

sigInAdminBtn.addEventListener("click", sigInAdmin);

export { transformData };
