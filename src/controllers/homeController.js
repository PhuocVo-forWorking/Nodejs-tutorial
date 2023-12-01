const connection = require("../config/database");
const { getAllUser } = require("../services/CRUDservice");

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
  res.send("Create user succeed!");
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
  let user = results && results.length > 0 ? results[0] : {};
  res.render("edit.ejs", { userEdit: user });
};
module.exports = {
  getHomePage,
  image,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
};
