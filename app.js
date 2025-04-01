// DOM elements
const quoteForm = document.getElementById('quoteForm');
const quoteInput = document.getElementById('quoteInput');
const quoteList = document.getElementById('quoteList');
const cartList = document.getElementById('cartList');

// Fetch quotes from the API
function fetchQuotes() {
  fetch('https://type.fit/api/quotes')
    .then(response => response.json())
    .then(data => {
      data.forEach(quote => {
        renderQuote(quote.text);
      });
    })
    .catch(error => console.error('Error fetching quotes:', error));
}

// Render a quote to the DOM
function renderQuote(quoteText) {
  const li = document.createElement('li');
  li.textContent = quoteText;

  // Create like and dislike buttons
  const likeBtn = document.createElement('button');
  likeBtn.classList.add('like-btn');
  likeBtn.textContent = 'Like';
  likeBtn.onclick = () => handleLike(quoteText);

  const dislikeBtn = document.createElement('button');
  dislikeBtn.classList.add('dislike-btn');
  dislikeBtn.textContent = 'Dislike';
  dislikeBtn.onclick = () => handleDislike(quoteText);

  // Create cart button
  const cartBtn = document.createElement('button');
  cartBtn.classList.add('add-to-cart-btn');
  cartBtn.textContent = 'Add to Cart';
  cartBtn.onclick = () => addToCart(quoteText);

  // Append buttons to the quote item
  li.appendChild(likeBtn);
  li.appendChild(dislikeBtn);
  li.appendChild(cartBtn);
  quoteList.appendChild(li);
}

// Handle the "Like" action
function handleLike(quoteText) {
  console.log('Liked:', quoteText);
}

// Handle the "Dislike" action
function handleDislike(quoteText) {
  console.log('Disliked:', quoteText);
}

// Add quote to cart
function addToCart(quoteText) {
  const cartItem = document.createElement('li');
  cartItem.textContent = quoteText;

  // Create delete button for cart
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = () => deleteQuoteFromCart(cartItem);

  // Append delete button to cart item
  cartItem.appendChild(deleteBtn);
  cartList.appendChild(cartItem);
}

// Delete quote from cart
function deleteQuoteFromCart(cartItem) {
  cartList.removeChild(cartItem);
}

// Event listener for form submission (to add new quote)
quoteForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const quoteText = quoteInput.value.trim();
  if (quoteText) {
    renderQuote(quoteText);
    quoteInput.value = '';  // Clear input field
  }
});

// Fetch quotes when the page loads
window.onload = fetchQuotes;
