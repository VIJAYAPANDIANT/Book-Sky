// Select DOM elements
var popupOverlay = document.getElementById("popup-overlay");
var popupBox = document.getElementById("popup-box");
var addPopupButton = document.getElementById("add-popup-button");
var cancelButton = document.getElementById("cancel-popup");
var container = document.getElementById("container");
var addBookForm = document.getElementById("add-book-form");

// Default books if storage is empty
const defaultBooks = [
    { title: "Rich Dad Poor Dad", author: "Robert", desc: "Finance book" }
];

// Load books from LocalStorage on startup
let books = JSON.parse(localStorage.getItem("books")) || defaultBooks;

// Function to render books
function renderBooks() {
    container.innerHTML = ""; // Clear current list
    books.forEach((book, index) => {
        var div = document.createElement("div");
        div.setAttribute("class", "book-container");
        div.innerHTML = `
            <h2>${book.title}</h2>
            <h5>${book.author}</h5>
            <p>${book.desc}</p>
            <button onclick="deleteBook(${index})">Delete</button>
        `;
        container.append(div);
    });
}

// Initial render
renderBooks();

// Show popup
addPopupButton.addEventListener("click", function () {
    popupOverlay.style.display = "block";
    popupBox.style.display = "block";
    // Focus on the first input
    document.getElementById("book-title-input").focus();
});

// Hide popup function
function hidePopup() {
    popupOverlay.style.display = "none";
    popupBox.style.display = "none";
    addBookForm.reset(); // Clear inputs
}

// Cancel popup
cancelButton.addEventListener("click", function (event) {
    event.preventDefault();
    hidePopup();
});

// Add Book
addBookForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var titleInput = document.getElementById("book-title-input");
    var authorInput = document.getElementById("book-author-input");
    var descInput = document.getElementById("book-desc-input");

    var title = titleInput.value.trim();
    var author = authorInput.value.trim();
    var desc = descInput.value.trim();

    if (title && author) {
        // Add new book to array
        books.push({ title, author, desc });
        
        // Save to LocalStorage
        localStorage.setItem("books", JSON.stringify(books));
        
        // Re-render
        renderBooks();
        hidePopup();
    }
});

// Delete book
function deleteBook(index) {
    books.splice(index, 1); // Remove from array
    localStorage.setItem("books", JSON.stringify(books)); // Update storage
    renderBooks(); // Re-render
}

