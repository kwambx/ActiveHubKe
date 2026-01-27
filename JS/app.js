 let gyms = JSON.parse(localStorage.getItem("gyms")) || [
      { name:"Gold's Gym", location:"Nairobi", address:"CBD", zip:"00100", amenities:"Weights, Cardio", images:[] },
      { name:"Planet Fitness", location:"Westlands", address:"Ring Road", zip:"00200", amenities:"Yoga, Sauna", images:[] },
      { name:"Anytime Fitness", location:"Karen", address:"Ngong Road", zip:"00300", amenities:"Crossfit, Pool", images:[] }
    ];

    function renderGyms(list=gyms){
      const gymList=document.getElementById("gymList");
      gymList.innerHTML="";
      list.forEach(gym=>{
        const div=document.createElement("div");
        div.className="gym-card";
        div.innerHTML=`<h3>${gym.name}</h3>
          <p>${gym.location}, ${gym.address}, ${gym.zip}</p>
          <p>Amenities: ${gym.amenities}</p>`;
        if(gym.profilePic){ div.innerHTML+=`<img src="${gym.profilePic}" alt="Profile">`; }
        if(gym.images){ gym.images.forEach(img=>{ div.innerHTML+=`<img src="${img}" alt="Gym">`; }); }
        gymList.appendChild(div);
      });
    }
    renderGyms();

    // Filter gyms by name and location
    function filterGyms(){
      const name=document.getElementById("searchName").value.toLowerCase();
      const location=document.getElementById("searchLocation").value.toLowerCase();
      const filtered=gyms.filter(gym=>
        (!name || gym.name.toLowerCase().includes(name)) &&
        (!location || gym.location.toLowerCase().includes(location))
      );
      renderGyms(filtered);
    }

    // Navigation placeholder
    function showLogin(){ alert("Redirect to login/register page here."); }