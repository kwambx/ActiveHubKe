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


function saveProfile() {
  const gymName = document.getElementById("gymName").value;
  const gymLocation = document.getElementById("gymLocation").value;
  const gymAddress = document.getElementById("gymAddress").value;
  const gymZip = document.getElementById("gymZip").value;
  const gymAmenities = document.getElementById("gymAmenities").value;

  const owner = JSON.parse(localStorage.getItem("gymOwner"));

  // Convert profile picture to Base64
  const profilePicInput = document.getElementById("profilePic");
  let profilePic = "";
  if (profilePicInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      profilePic = e.target.result; // Base64 string
      finalizeSave(profilePic);
    };
    reader.readAsDataURL(profilePicInput.files[0]);
  } else {
    finalizeSave(profilePic);
  }

  function finalizeSave(profilePic) {
    const gymImagesInput = document.getElementById("gymImages");
    let images = [];
    let files = Array.from(gymImagesInput.files).slice(0,5);
    let loaded = 0;

    if (files.length > 0) {
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
          images.push(e.target.result); 
          loaded++;
          if (loaded === files.length) {
            saveToStorage(profilePic, images);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      saveToStorage(profilePic, images);
    }
  }

  function saveToStorage(profilePic, images) {
    const profile = {
      name: gymName,
      location: gymLocation,
      address: gymAddress,
      zip: gymZip,
      amenities: gymAmenities,
      profilePic,
      images,
    };

    localStorage.setItem("gymProfile_" + owner.username, JSON.stringify(profile));
    gyms.push(profile);
    localStorage.setItem("gyms", JSON.stringify(gyms));

    alert("Profile saved!");
    document.getElementById("profilePage").style.display = "none";
    document.getElementById("frontPage").style.display = "block";
    renderGyms();
  }
}









function filterGyms() {
  const name = document.getElementById("searchName").value.trim().toLowerCase();
  const location = document.getElementById("searchLocation").value.trim().toLowerCase();

  const filtered = gyms.filter(gym => {
    const matchesName = !name || gym.name.toLowerCase().includes(name);
    const matchesLocation = !location || gym.location.toLowerCase().includes(location);
    return matchesName && matchesLocation;
  });

  renderGyms(filtered);
}

