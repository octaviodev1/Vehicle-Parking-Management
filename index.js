$.router.init();

localStorage.clear();

var currentRoute = "";

const notLogged = () => {
  localStorage.setItem("loggedAdmin", false);
};

$(window).on("load", notLogged);

const onPageWithHashLoaded = () => {
  switch (currentRoute) {
    // TODO: Cases
    case "#login": {
      // console.log("example");
      break;
    }
  }
};

// ROUTER

$(".btn-linkRouter").on("click", function (e) {
  setCurrentRouteFromDataBtn($(this));
  onChangeRoute($(this));
});

const onChangeRoute = (ref) => {
  if (window.location.hash !== currentRoute) {
    onApplyHashToCurrentRouteHandler(ref);
    onTriggerHashChangeHandler();
    setCurrentActivePage();
  }
};

const setCurrentRouteFromDataBtn = (ref) => {
  $.router.set($(ref).data("route"), false, true);
};

const setCurrentActivePage = () => {
  hideAllSections();

  const activePage =
    currentRoute.length > 0
      ? currentRoute.split("#")[1] + "-page"
      : window.location.hash.split("#")[1] + "-page";

  $("#" + activePage).addClass("active");
};

const hideAllSections = () => {
  $(".section").removeClass("active");
  $(".section").css("display: none");
};

const onApplyHashToCurrentRouteHandler = (ref) => {
  currentRoute = "#" + $(ref).data("route").split("#")[1];
};

const onTriggerHashChangeHandler = () => {
  $(window).trigger("hashchange");
};

$(window)
  .on("hashchange", function (e) {
    if (currentRoute.startsWith("#")) {
      onPageWithHashLoaded();
    }

    if (currentRoute === "") {
      $.router.set("/index.html#home");
      setCurrentActivePage();
    }
  })
  .trigger("hashchange");

const btn_endSession = document
  .querySelectorAll(".btn-endSession")
  .forEach((element) => {
    element.addEventListener("click", function (e) {
      if (JSON.parse(localStorage.getItem("loggedAdmin")) == true) {
        localStorage.setItem("loggedAdmin", false);
        localStorage.setItem("loggedInUserAdmin", "");
        document.getElementById("btn-goToHome").click();
      }

      if (JSON.parse(localStorage.getItem("loggedUser")) == true) {
        localStorage.setItem("loggedUser", false);
        localStorage.setItem("loggedInUser", "");
        document.getElementById("btn-goToHome").click();
      }

    });
  });
