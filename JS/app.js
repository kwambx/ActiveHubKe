// Initial gyms
let gyms = JSON.parse(localStorage.getItem("gyms")) || [];
function renderGyms(list = gyms) 
{ const gymList = document.getElementById("gymList"); gymList.innerHTML = "";
   list.forEach((gym) => { const div = document.createElement("div");
     div.className = "gym-card"; 
     div.innerHTML = ` <div
      class="gym-header">
      <h3>${gym.name}</h3>
       </div>
       <p><strong>Location:</strong> ${gym.location}</p> 
      <p><strong>Address:</strong> ${gym.address}, ${gym.zip}</p>
       <p><strong>Amenities:</strong> ${gym.amenities}</p> 
       ${gym.profilePic ? `<img class="profile-pic" src="images/${gym.profilePic}" alt="Profile">` : ""} 
       <div class="gallery"> ${gym.images ? gym.images.map(img => `<img src="images/${img}" alt="Gym">`).join("") : ""} 
       </div> `;
        gymList.appendChild(div); }); 
        if (gymList.innerHTML === "") { gymList.innerHTML = `<p class="no-gyms">No gyms available. 
          Please create a profile.</p>`; } } 
          
          renderGyms();

// Admin dashboard rendering (shows all gyms + delete)
function renderAdminGyms() { const adminGymList = document.getElementById("adminGymList");
   adminGymList.innerHTML = "";
    gyms.forEach((gym, index) => { const div = document.createElement("div"); 
      div.className = "gym-card";
       div.innerHTML = ` <h3>${gym.name}</h3>
        <p>${gym.location}, ${gym.address}, ${gym.zip}</p>
         <p>Amenities: ${gym.amenities}</p> 
         ${gym.profilePic ? `<img src="images/${gym.profilePic}" alt="Profile">` : ""} 
         ${gym.images ? gym.images.map(img => `<img src="images/${img}" alt="Gym">`).join("") : ""} 
         <button onclick="deleteGym(${index})">Delete Profile</button> `;
         
         adminGymList.appendChild(div); });
        
        }

// Delete gym profile (admin only)
function deleteGym(index) { if (confirm("Are you sure you want to delete this gym profile?")) 
  { gyms.splice(index, 1);
     localStorage.setItem("gyms", JSON.stringify(gyms)); 
     renderAdminGyms(); renderGyms();
      alert("Gym profile deleted!"); } 
    }


// Show register page
function showRegister() {
  document.getElementById("frontPage").style.display = "none";
  document.getElementById("registerPage").style.display = "block";
}

// Register gym owner
function register() { const u = document.getElementById("username").value; const p = document.getElementById("password").value; 
  if (!u || !p) { alert("Fill all fields"); return; } 
  localStorage.setItem("gymOwner", JSON.stringify({ username: u, password: p }));
   alert("Registration successful! Please log in."); 
document.getElementById("frontPage").style.display = "none"; 
document.getElementById("registerPage").style.display = "block";
 }

// Login gym owner
function login() { const u = document.getElementById("username").value; const p = document.getElementById("password").value; const owner = JSON.parse(localStorage.getItem("gymOwner")); if (owner && owner.username === u && owner.password === p) { localStorage.setItem("activeUser", u); // ✅ track active user const
 existingProfile = JSON.parse(localStorage.getItem("gymProfile_" + u)); 
 if (existingProfile) { alert("Login successful! Loading your profile..."); 
  document.getElementById("frontPage").style.display = "none";
   document.getElementById("registerPage").style.display = "none";
    document.getElementById("profilePage").style.display = "block"; 
    document.getElementById("gymName").value = existingProfile.name; 
    document.getElementById("gymLocation").value = existingProfile.location; 
    document.getElementById("gymAddress").value = existingProfile.address; 
    document.getElementById("gymZip").value = existingProfile.zip;
     document.getElementById("gymAmenities").value = existingProfile.amenities; } 

        else { alert("Login successful! Please create your gym profile."); 
      document.getElementById("frontPage").style.display = "none"; 
      document.getElementById("registerPage").style.display = "none";
       document.getElementById("profilePage").style.display = "block"; } } 
       else { alert("Invalid credentials");

        } 
      }


// Logout gym owner
function logout() { alert("Logged out successfully!"); 
  localStorage.removeItem("activeUser");
 document.getElementById("profilePage").style.display = "none"; 
 document.getElementById("frontPage").style.display = "block"; }
// Save gym profilefunction 
function saveProfile() { const gymName = document.getElementById("gymName").value;
   const gymLocation = document.getElementById("gymLocation").value; const gymAddress = document.getElementById("gymAddress").value;
   const gymZip = document.getElementById("gymZip").value;
   const gymAmenities = document.getElementById("gymAmenities").value;
   const activeUser = localStorage.getItem("activeUser");
   if (!activeUser) { alert("You must be logged in to save a profile!");
     return; 
    }
const profilePicInput = document.getElementById("profilePic");
let profilePicName = profilePicInput.files[0] ? profilePicInput.files[0].name : "";
const gymImagesInput = document.getElementById("gymImages"); let imageNames = [];
if (gymImagesInput.files.length > 0) { imageNames = Array.from(gymImagesInput.files).slice(0, 5).map(file => file.name); }
const profile = { name: gymName, location: gymLocation, address: gymAddress, zip: gymZip, amenities: gymAmenities, profilePic: profilePicName, images: imageNames };
// Save profile tied to active user
 localStorage.setItem("gymProfile_" + activeUser, JSON.stringify(profile)); 
// // Update gyms list
 gyms = JSON.parse(localStorage.getItem("gyms")) || [];
 gyms = gyms.filter(g => !(g.name === profile.name && g.location === profile.location));
 gyms.push(profile); localStorage.setItem("gyms", JSON.stringify(gyms)); 
 alert("Profile saved successfully!");
  renderGyms();
   renderAdminGyms(); 
 
 document.getElementById("frontPage").style.display = "none"; 
 document.getElementById("profilePage").style.display = "block"; }


// Filter gyms by name and location
function filterGyms() {
  const name = document.getElementById("searchName")?.value.trim().toLowerCase() || "";
  const location = document.getElementById("searchLocation").value.trim().toLowerCase();

  const filtered = gyms.filter(gym => {
    const matchesName = !name || gym.name.toLowerCase().includes(name);
    const matchesLocation = !location || gym.location.toLowerCase().includes(location);
    return matchesName && matchesLocation;
  });

  renderGyms(filtered);
}

function goHome() {
  // Hide all other sections
  document.getElementById("profilePage").style.display = "none";
  document.getElementById("registerPage").style.display = "none";
  document.getElementById("adminLoginPage").style.display = "none";
  document.getElementById("adminPage").style.display = "none";

  // Show the front page
  document.getElementById("frontPage").style.display = "block";
}







// Admin login
function showAdminLogin() {
  // Hide front page and register/login page
  document.getElementById("frontPage").style.display = "none";
  document.getElementById("registerPage").style.display = "none";

  // Show admin login page
  document.getElementById("adminLoginPage").style.display = "block";
}

function adminLogin() {
  const u = document.getElementById("adminUsername").value;
  const p = document.getElementById("adminPassword").value;

  if (u === "admin" && p === "admin123") {
    alert("Admin login successful!");

    // Hide login/register and front page
    document.getElementById("frontPage").style.display = "none";
    document.getElementById("registerPage").style.display = "none";
    document.getElementById("adminLoginPage").style.display = "none";

    // Show admin dashboard
    document.getElementById("adminPage").style.display = "block";
    renderAdminGyms();
  } else {
    alert("Invalid admin credentials");
  }
}
