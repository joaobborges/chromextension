// Create a context menu item
chrome.contextMenus.create({
  title: "Save as PNG",
  contexts: ["image"],
  onclick: function(info) {
    convertToImage(info.srcUrl, "png");
  }
});

chrome.contextMenus.create({
  title: "Save as JPEG",
  contexts: ["image"],
  onclick: function(info) {
    convertToImage(info.srcUrl, "jpeg");
  }
});

// Function to convert image to PNG or JPEG
function convertToImage(srcUrl, format) {
  // Create a new image element
  var img = new Image();
  img.src = srcUrl;

  // Wait for the image to load
  img.onload = function() {
    // Create a canvas element
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    // Set canvas size to image size
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw the image onto the canvas
    ctx.drawImage(img, 0, 0);

    // Convert canvas to Blob
    canvas.toBlob(function(blob) {
      // Create a temporary anchor element to download the Blob
      var downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'image.' + format;
      downloadLink.click();

      // Clean up the temporary anchor element
      URL.revokeObjectURL(downloadLink.href);
    }, "image/" + format);
  };
}
