/* Shruti Choudhary */
var server = require("diet");
var ws = require("./websockets-server");
var app = server();
var fs = require("fs");
// HTTP listen with a URL String to port 8000
app.listen("http://localhost:8000");

// Require the diet-static module and configure it
var diet_static_m = require("diet-static")({
  path: app.path + "/app/"
});

// Attach the static module as a footer middleware
app.footer(diet_static_m);
app.view("file", diet_static_m);

//to get index page through redirect function
app.get("/", function($) {
  $.redirect("index.html");
});

//missing function is to handle the case when tried page is not accessible
app.missing(function($) {
  $.header("content-type", "text/html");
  $.status("404", "File not found"); // -> 404 not found

  fs.readFile(__dirname + "/app/error.html", function(err, data) {
    if (err) throw err;
    $.end(data.toString());
  });
});

// Subscribe to all error events; callback which we want to run on callback
app.error(function($, middleware) {
  // Log the error
  console.trace("Something bad happened....!!", $.status, $.error.message);
});
