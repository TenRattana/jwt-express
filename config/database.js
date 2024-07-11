const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModofy: false,
    })
    .then(() => {
      console.log("Successfuly Connect Database");
    })
    .catch((error) => {
      console.log("Error Connect Database");
      console.error(error);
      process.exit(1);
    });
};
