// Get saved conversion format from storage and set it as the default value for the select input
chrome.storage.sync.get(["conversionFormat"], function (result) {
  const conversionFormat = result.conversionFormat ||
