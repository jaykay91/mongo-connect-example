const mongoose = require("mongoose");

module.exports = () => {
  const connect = () => {
    if (process.env.NODE_ENV !== "production") {
      mongoose.set("debug", true);
    }

    // mongodb://{USER}:{PWD}@{HOST}:{PORT}/{AUTHENTICATION_DB}
    mongoose.connect(
      `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@localhost:27017`,
      {
        dbName: process.env.DB_NAME
      },
      error => {
        if (error) {
          console.error("몽고디비 연결 에러", error);
        } else {
          console.log("몽고디비 연결 성공");
        }
      }
    );
  };

  connect();

  mongoose.connection.on("error", error => {
    console.error("몽고디비 연결 에러", error);
  });

  mongoose.connection.on("disconnected", () => {
    console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
    connect();
  });

  require("./User");
};
