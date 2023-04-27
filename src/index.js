let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  }
  )

  //create new card in the DOM and update db.json from user input
  const form = document.querySelector('form');
  form.addEventListener("submit",function(e){
    e.preventDefault()
    const names = form.querySelector("input[name='name']").value;
    const images = form.querySelector("input[name='image']").value;
    
    //Use post fetch to post new card into db.jason
    fetch("http://localhost:3000/toys", {
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body:JSON.stringify({
        name: names,
        image: images,
        likes: 0,
      }
      ),
    }
    )
    .then((res) => res.json())
    //Update DOM to not refresh page
    .then((responseToy) => addChildCard(responseToy))
  }
  )

  //Get fetch original file to make cards to display in DOM
  fetch("http://localhost:3000/toys",{
    method: "GET",
    headers: {
      "Content-Type" : "application/json"
    }
  }
  )
  .then(res => res.json())
  .then(function(toyData){
    toyData.forEach((toy) => {
      addChildCard(toy)
    }
    )
  }
  );

  //Function child displays GET and POST cards
  function addChildCard(newToy){
    const classCard = document.createElement("div")
    const h2 = document.createElement("h2");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const button = document.createElement("button");
    
    classCard.setAttribute("class", "card");

    h2.textContent = newToy["name"];

    img.setAttribute("src", newToy["image"]);
    img.setAttribute("class", "toy-avatar")

    p.textContent = (newToy["likes"] + " like");

    button.setAttribute("class", "like-btn");
    button.setAttribute("id",newToy["id"]);
    button.textContent = ("like ❤️")

    //add new event to update likes on each card
    button.addEventListener("click",() => {

      p.textContent = `${newToy.likes +=1} Likes`;

      updateLikes(newToy.id, newToy.likes);

    }
    )

    const div = document.getElementById("toy-collection");
    classCard.appendChild(h2)
    classCard.appendChild(img)
    classCard.appendChild(p)
    classCard.appendChild(button)
    div.appendChild(classCard)
}

//function updates likes in the html using patch
function updateLikes(updateId, updateLikes){
  fetch(`http://localhost:3000/toys/${updateId}`,{
    method:"PATCH",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": updateLikes
    })
  }
  )
  .then((res) => res.json())
}
}
)