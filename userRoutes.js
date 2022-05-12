const bcrypt = require("bcrypt");
const express = require("express");
const User = require("./userModel");
const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');

// router.use(bodyParser.urlencoded());
router.use(bodyParser.urlencoded({
    extended: true
  }));

router.use(bodyParser.json());



/**POUR L'ENVOI DES REQUETES POST DANS POSTMAN , METTRE DANS LE BODY DANS LA SECTION RAW AVEC DES "" POUR 
 *  CHAQYUE RPORPUETES ET SA VALEUR ET BEIN SELECTIONNER JSON ET PAS TEXT */


  // signup route
  router.post("/signup", async (req, res) => {
    const body = req.body;

    if (!(body.email && body.password)) {
      return res.status(400).send({ error: "Data not formatted properly" });
    }

    // creating a new mongoose doc from user data
    const user = new User(body);
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);
    user.save().then((doc) => res.status(201).send(doc));
  });

  // login route
  router.post("/login", async (req, res) => {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    const accessToken = jwt.sign({ userId: user.id},"RANDOM_TOKEN_SECRET",{ expiresIn: '365d'});
    const refreshToken = jwt.sign({ userId: user.id},"RANDOM_TOKEN_SECRET",{ expiresIn: '2h'});

    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        res.status(200).json(
          { 
            message: "Valid password",
            Access_token : accessToken,
            token : refreshToken
          }
        );
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  });

  module.exports = router;