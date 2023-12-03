const connection = require("../config/database");
const {
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../services/CRUDservice");

const getHomePage = async (req, res) => {
  let results = await getAllUser();
  return res.render("home.ejs", { listUsers: results });
};

const image = (req, res) => {
  res.render("sample.ejs");
};

const postCreateUser = async (req, res) => {
  let name = req.body.Name;
  let email = req.body.Email;
  let address = req.body.Address;
  let phone = req.body.Phone;

  //let {name, email, address, phone} = req.body;

  console.log(
    ">>> name: ",
    name,
    " email: ",
    email,
    " address: ",
    address,
    " phone: ",
    phone
  );
  //console.log(req.body)

  //     connection.query(
  //         `INSERT into
  //         Users (USER_NAME, EMAIL, ADDRESS, PHONE)
  //         values (?, ?, ?, ?)`,
  //         [name, email, address, phone],
  //         function(err, results) {

  //           console.log(results);
  //           res.send('Create user succeed!');
  //         }
  //   );

  let [results, fields] = await connection.query(
    `INSERT into 
    Users (USER_NAME, EMAIL, ADDRESS, PHONE)
    values (?, ?, ?, ?)`,
    [name, email, address, phone]
  );
  console.log(">>>results: ", results);
  // res.send("Create user succeed!");
  res.redirect("/");
};

const getCreatePage = (req, res) => {
  res.render("create.ejs");
};

const getUpdatePage = async (req, res) => {
  const userId = req.params.id;

  let [results, fields] = await connection.query(
    "Select * from Users where USER_ID =?",
    [userId]
  );
  let user = await getUserById(userId);

  res.render("edit.ejs", { userEdit: user });
};

const postUpdateUser = async (req, res) => {
  let name = req.body.Name;
  let email = req.body.Email;
  let address = req.body.Address;
  let phone = req.body.Phone;
  let userId = req.body.userId;

  //let {name, email, address, phone} = req.body;

  await updateUserById(name, email, address, phone, userId);
  //res.send("Update user succeed!");
  res.redirect("/");
};

const postDeleteUser = async (req, res) => {
  const userId = req.params.id;
  let user = await getUserById(userId);
  res.render("delete.ejs", { userEdit: user });
};

const postHandleRemoveUser = async (req, res) => {
  const id = req.params.userId;
  await deleteUserById(id);
  res.redirect("/");
};
module.exports = {
  getHomePage,
  image,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  getUserById,
  postUpdateUser,
  postDeleteUser,
  postHandleRemoveUser,
};
