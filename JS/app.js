// Initial gyms
let gyms = JSON.parse(localStorage.getItem("gyms")) || [
  {
    name: "Gold's Gym",
    location: "Nairobi",
    address: "CBD",
    zip: "00100",
    amenities: "Weights, Cardio",
    images: [],
  },
];

function renderGyms(list = gyms) {
  const gymList = document.getElementById("gymList");
  gymList.innerHTML = "";
  list.forEach((gym) => {
    const div = document.createElement("div");
    div.className = "gym-card";
    div.innerHTML = `<h3>${gym.name}</h3>
          <p>${gym.location}, ${gym.address}, ${gym.zip}</p>
          <p>Amenities: ${gym.amenities}</p>`;
    if (gym.profilePic) {
      div.innerHTML += `<img src="${gym.profilePic}" alt="Profile">`;
    }
    if (gym.images) {
      gym.images.forEach((img) => {
        div.innerHTML += `<img src="${img}" alt="Gym">`;
      });
    }
    gymList.appendChild(div);
  });
}
renderGyms();

// Show register page
function showRegister() {
  document.getElementById("frontPage").style.display = "none";
  document.getElementById("registerPage").style.display = "block";
}

// Register gym owner
function register() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  if (!u || !p) {
    alert("Fill all fields");
    return;
  }
  localStorage.setItem(
    "gymOwner",
    JSON.stringify({ username: u, password: p }),
  );
  alert("Registered! Please login.");
}

// Login gym owner
function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  const owner = JSON.parse(localStorage.getItem("gymOwner"));
  if (owner && owner.username === u && owner.password === p) {
    document.getElementById("registerPage").style.display = "none";
    document.getElementById("profilePage").style.display = "block";

    // Check if profile exists
    const existingProfile = JSON.parse(localStorage.getItem("gymProfile_" + u));
    if (existingProfile) {
      document.getElementById("gymName").value = existingProfile.name;
      document.getElementById("gymLocation").value = existingProfile.location;
      document.getElementById("gymAddress").value = existingProfile.address;
      document.getElementById("gymZip").value = existingProfile.zip;
      document.getElementById("gymAmenities").value = existingProfile.amenities;
      alert("Welcome back! You can edit your gym profile.");
    } else {
      alert("Login successful! Please create your gym profile.");
    }
  } else {
    alert("Invalid credentials");
  }
}

// Save gym profile
function saveProfile() {
  const gymName = document.getElementById("gymName").value;
  const gymLocation = document.getElementById("gymLocation").value;
  const gymAddress = document.getElementById("gymAddress").value;
  const gymZip = document.getElementById("gymZip").value;
  const gymAmenities = document.getElementById("gymAmenities").value;

  const profilePicInput = document.getElementById("profilePic");
  let profilePic = "";
  if (profilePicInput.files[0]) {
    profilePic = URL.createObjectURL(profilePicInput.files[0]);
  }

  const gymImagesInput = document.getElementById("gymImages");
  let images = [];
  for (let i = 0; i < Math.min(5, gymImagesInput.files.length); i++) {
    images.push(URL.createObjectURL(gymImagesInput.files[i]));
  }

  const owner = JSON.parse(localStorage.getItem("gymOwner"));
  const profile = {
    name: gymName,
    location: gymLocation,
    address: gymAddress,
    zip: gymZip,
    amenities: gymAmenities,
    profilePic,
    images,
  };

  // Save profile tied to owner
  localStorage.setItem("gymProfile_" + owner.username, JSON.stringify(profile));

  // Update gyms list
  gyms.push(profile);
  localStorage.setItem("gyms", JSON.stringify(gyms));

  alert("Profile saved!");
  document.getElementById("profilePage").style.display = "none";
  document.getElementById("frontPage").style.display = "block";
  renderGyms();
}

function filterGyms() {
  const name = document.getElementById("searchName").value.toLowerCase();
  const location = document
    .getElementById("searchLocation")
    .value.toLowerCase();
  const filtered = gyms.filter(
    (gym) =>
      (!name || gym.name.toLowerCase().includes(name)) &&
      (!location || gym.location.toLowerCase().includes(location)),
  );
  renderGyms(filtered);
}
