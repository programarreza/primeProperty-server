const mongoose = require("mongoose");

const uri = `mongodb+srv://admin:admin12345@cluster0.5ol9cd5.mongodb.net/?retryWrites=true&w=majority`;


mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connect to DB"))
  .catch((error) => console.log("Error", error));
