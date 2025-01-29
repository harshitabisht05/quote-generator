// Firebase initialization (using CDN)
// Firebase configuration (same as before)
const firebaseConfig = {
    apiKey: "AIzaSyDITYAXuSgXd0HP0lIu21Dk3xOJeNPJm1Y",
    authDomain: "quote-generator-a0cd3.firebaseapp.com",
    projectId: "quote-generator-a0cd3",
    storageBucket: "quote-generator-a0cd3.firebasestorage.app",
    messagingSenderId: "1042939544692",
    appId: "1:1042939544692:web:254f2aef52b35328d6fd21",
    measurementId: "G-55R0DGK0L6"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  
  // Initialize Firestore
  const db = firebase.firestore();
  
  // Function to fetch quotes from Firestore
  async function fetchQuotes() {
    const quotesCollection = db.collection("quote");
    const quotesSnapshot = await quotesCollection.get();
    const quotes = quotesSnapshot.docs.map(doc => doc.data());
  
    return quotes;
  }
  
  // Function to display a random quote
  async function displayRandomQuote() {
    const quotes = await fetchQuotes();
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex];
  
      document.getElementById("quote").textContent = `"${randomQuote.quote}"`;
      document.getElementById("author").textContent = `- ${randomQuote.author}`;
    }
  }
  
  // Event listener for the button
  document.getElementById("new-quote").addEventListener("click", displayRandomQuote);
  
  // Load a random quote on page load
  displayRandomQuote();
  