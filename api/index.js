const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./Models/User.js");
const Place = require("./Models/Place.js");
const Booking = require("./Models/Booking.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require('image-downloader');
const multer = require("multer");
const fs = require("fs");
const  authenticate  = require("./Middilwares/authenticateUser.js");
const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fmdafsgjhhjgfhs";

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + "/uploads"));

app.use(cors({
  credentials: true,
  origin: "http://localhost:3000",
}));

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

mongoose.connect("mongodb://localhost:27017/User").then(() => {
  console.log("DataBase Connected")
}).catch(() => {
  console.log("Error in Connection");
})

app.get("/test", (req, res) => {
  res.json("test ok")
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Check if any of the required fields are missing
  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please fill all the inputs properly" });
  }

  try {
    const userDoc = await User.create({
      name, email, password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {

  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (!email || !password) {
    return res.status(422).json({ error: "Please fill all the inputs properly" });
  }

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      if (userDoc.isAdmin === undefined) {
        userDoc.isAdmin = false; // or true if you want to grant admin rights
        await userDoc.save(); // Save the updated userDoc
      }
      jwt.sign({
        email: userDoc.email,
        id: userDoc._id,
        name: userDoc.name,
        isAdmin: userDoc.isAdmin
      },
        jwtSecret, {}, (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        });
    } else {
      res.status(422).json("Password Not Matched");
    }
  } else {
    res.json("Not-Found");
  }
});

app.get("/profile", authenticate, async (req, res) => {
  const userId = req.userData.id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    const { name, email, _id, isAdmin } = user;
    res.json({ name, email, _id, isAdmin });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/logout", (req, res) => {
  res.cookie('token', '').json(true);
})

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName,
  });
  res.json(newName)
})

const photosMiddleware = multer({ dest: 'uploads/' });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace('uploads\\', ''));
  }
  res.json(uploadedFiles);
});

app.post('/places', authenticate, async (req, res) => {
  const user = await User.findById(req.userData.id);
  if (user && user.isAdmin) {
    const {
      title, address, addedPhotos, description, price,
      perks, extraInfo, checkIn, checkOut, maxGuests
    } = req.body;

    const placeDoc = await Place.create({
      owner: req.userData.id,
      price,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests
    });
    res.json(placeDoc);
  } else {
    res.status(403).json({ error: "Access denied. Only admins can create new places." });
  }
});

app.get('/user-places', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});


app.get('/places/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put('/places', authenticate, async (req, res) => {
  const {
    id, title, address, addedPhotos, description,
    perks, extraInfo, checkIn, checkOut, maxGuests, price
  } = req.body;

  try {
    const placeDoc = await Place.findById(id);
    if (!placeDoc) {
      return res.status(404).json({ error: "Place not found" });
    }

    if (req.userData.id !== placeDoc.owner.toString()) {
      return res.status(403).json({ error: "Access denied" });
    }

    placeDoc.set({
      title, address, photos: addedPhotos, description,
      perks, extraInfo, checkIn, checkOut, maxGuests, price
    });

    await placeDoc.save();
    res.json({ message: 'Place updated successfully' });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get('/places', async (req, res) => {
  res.json(await Place.find())
})

app.post('/bookings', authenticate, async (req, res) => {
  const {
    place, checkIn, checkOut, numberOfGuests, name, phone, price,
  } = req.body;

  try {
    const booking = await Booking.create({
      place, checkIn, checkOut, numberOfGuests, name, phone, price,
      user: req.userData.id,
    });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/bookings', authenticate, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userData.id }).populate('place');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/bookings/:id', async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate('place'));
});

app.listen(4000, () => {
  console.log("Listening on Port 4000");
})