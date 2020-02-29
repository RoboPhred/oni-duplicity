if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .catch(e => console.log("Failed to register ServiceWorker", e));
}
