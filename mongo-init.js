db.createUser(
  {
      user: "root",
      pwd: "web",
      roles: [
          {
              role: "readWrite",
              db: "web"
          }
      ]
  }
);
