const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/stayease";

main()
    .then(() => {
        console.log("Connected to StayEase DB");
    })
    .catch((e) => {
        console.log("Error:", e)
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.render("listings/home.ejs");
});


// app.get("/listings", async(req, res) => {
//     let allListings = await Listing.find({});
//     res.render("listings/index.ejs",{allListings})
// });

app.get("/listings", async (req, res) => {
  let { country, price } = req.query; 

  let filters = {}; 

  if (country && country !== "") {
    filters.country = country; 
  }

  if (price && !isNaN(price)) {
    filters.price = { $lte: Number(price) }; 
  }

  console.log("Filters Applied:", filters); 

  try {
    let allListings = await Listing.find(filters); 
    res.render("listings/index.ejs", { allListings });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching listings");
  }
});


app.get("/listings/new", (req, res) => {
  res.render("listings/form.ejs");
});

app.post("/listings", async (req, res) => {
    let newListing = new Listing(req.body.Listing);
    newListing.save();
    res.redirect("/listings");
});

app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.Listing});
    res.redirect(`/listings/${id}`);
});

app.delete("/listings/:id", async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})

app.listen(3000, () => {
    console.log("Server is listening to port 3000");
});