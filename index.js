$.router.init();

var currentRoute = "";

const notLogged = () => {
  localStorage.setItem("logged", false);
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
$(".btn-link").on("click", function (e) {
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
  $(".section").css("color:black");
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
