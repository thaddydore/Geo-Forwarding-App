//variable declaration
const id = document.querySelector(".storeid");
const address = document.querySelector(".storeAddress");
const myForm = document.querySelector(".form");

//add location points and address
async function add(e) {
  e.preventDefault()

  //validate input fiels
  if (id.value === "") {
    alert("Please add Location ID")
    return false
  }

  if (address.value === "") {
    alert("Please add Location Address")
    return false
  }

  //create location data
  const locationData = {
    storeId: id.value,
    address: address.value
  }

  //store location data in database
  try {
    const response = await fetch("/api/jude/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(locationData)
    })

    //check for errors
    if (response.status == 400) {
      throw Error("store already exist")
    }
    id.value = ""
    address.value = ""
    alert("store added")
    
    //return to homepage
    window.location.href = "./index.html"
  } catch (error) {
    alert(error.message)
    return
  }
}

myForm.addEventListener("submit", add)

