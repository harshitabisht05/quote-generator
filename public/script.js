// Your Firebase config object
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
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const db = firebase.firestore();

  // Load categories on page load
  window.onload = async function () {
    const criteriaSelect = document.getElementById("criteria");
    try {
      const querySnapshot = await db.collection("criteria").get();
      console.log("Criteria fetched:", querySnapshot.docs.map(doc => doc.id)); // Debug log

      querySnapshot.forEach((doc) => {
        const option = document.createElement("option");
        option.value = doc.id; // Document ID
        option.textContent = doc.id.charAt(0).toUpperCase() + doc.id.slice(1); // Capitalize first letter
        criteriaSelect.appendChild(option);
      });
    } catch (error) {
      console.error("Error loading categories:", error);
    }

    document.getElementById("generateBtn").addEventListener("click", generateQuote);
  };

  // Generate a random quote
  async function generateQuote() {
    const criteria = document.getElementById("criteria").value;
    const quoteEl = document.getElementById("quote");

    if (!criteria) {
      quoteEl.textContent = "Please select a criteria first.";
      return;
    }

    try {
      const querySnapshot = await db.collection("quote").where("criteria_id", "==", criteria).get();
      console.log("Quotes fetched:", querySnapshot.docs.map(doc => doc.data())); // Debug log

      const quotes = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        quotes.push(`"${data.quote}" — ${data.author}`);
      });

      if (quotes.length > 0) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteEl.textContent = randomQuote;
      } else {
        quoteEl.textContent = "No quotes found for this criteria.";
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
      quoteEl.textContent = "Failed to load quotes.";
    }
  }
