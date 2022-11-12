function setNavigationEvent(selector, location) {
  document.querySelector(selector).onclick = function () {
    window.location.href = location;
  };
}

setNavigationEvent(".navigate-home", "./index.html");
