document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: "smooth"
        });
    });
});

const darkModeToggle = document.getElementById("darkModeToggle");

// Load saved theme from localStorage
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeToggle.checked = true;
}

fetch("content.json")
    .then(response => response.json())
    .then(data => {
        const messagesContainer = document.getElementById("messages");
        const galleryContainer = document.getElementById("gallery");

        // Display messages
        data.messages.forEach(message => {
            const messageElement = document.createElement("p");
            messageElement.textContent = message;
            messagesContainer.appendChild(messageElement);
        });

        // Display images
        data.images.forEach(image => {
            const imgElement = document.createElement("img");
            imgElement.src = image.src;
            imgElement.alt = image.alt;
            galleryContainer.appendChild(imgElement);
        });
    })
    .catch(error => console.error("Error loading content:", error));

    // Function to add a photo to the gallery
function addPhoto() {
    const url = document.getElementById('photoURL').value;
    if (url) {
        const gallery = document.querySelector('.gallery');
        const mediaItem = document.createElement('div');
        mediaItem.classList.add('media-item');
        mediaItem.innerHTML = `<img src="${url}" alt="New Photo" style="width:100%;"><p>New Photo</p>`;
        gallery.appendChild(mediaItem);
        document.getElementById('photoURL').value = ''; // Clear input
    } else {
        alert("Please enter a photo URL.");
    }
}

// Function to add a message to the messages section
function addMessage() {
    const message = document.getElementById('newMessage').value;
    if (message) {
        const messagesSection = document.querySelector('.messages');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message-item');
        messageDiv.innerHTML = `<p>${message}</p>`;
        messagesSection.appendChild(messageDiv);
        document.getElementById('newMessage').value = ''; // Clear input
    } else {
        alert("Please write a message.");
    }
}

