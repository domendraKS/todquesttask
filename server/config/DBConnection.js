import mongoose from "mongoose";

const DB_CONN = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((res) => console.log("MongoDB is connected."))
    .catch((error) => console.log(error));
};

export default DB_CONN;
