const titleInput = document.getElementById("titleInput");
const imageInput = document.getElementById("imageInput");
const descInput = document.getElementById("descInput");
const addBtn = document.getElementById("addBtn");
const successMsg = document.getElementById("successMsg");

const clearBtn = document.getElementById("clearBtn");

if (!localStorage.getItem("movieDatabase")) {
    localStorage.setItem("movieDatabase", JSON.stringify([]));
}

addBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const image = imageInput.value.trim();
    const desc = descInput.value.trim();

    if (!title || !image || !desc) {
        alert("Please fill in all fields.");
        return;
    }

    const newMovie = {
        id: Date.now(),
        title: title,
        image: image,
        description: desc
    };

    const movies = JSON.parse(localStorage.getItem("movieDatabase"));
    movies.push(newMovie);
    localStorage.setItem("movieDatabase", JSON.stringify(movies));

    successMsg.style.display = "block";
    titleInput.value = "";
    imageInput.value = "";
    descInput.value = "";

    // Hide message after 3 seconds
    setTimeout(() => {
        successMsg.style.display = "none";
    }, 3000);
});

// --- CLEAR ALL MOVIES LOGIC ---
clearBtn.addEventListener("click", () => {
    // Show a confirmation popup so the user doesn't delete by accident
    const confirmDelete = confirm("Are you sure you want to delete ALL movies? This cannot be undone.");
    
    if (confirmDelete) {
        // Reset the LocalStorage database to an empty array
        localStorage.setItem("movieDatabase", JSON.stringify([]));
        
        // Let the user know it was successful
        alert("All movies have been successfully cleared!");
    }
});