function scrollToServices() {
    document.getElementById("services").scrollIntoView({
        behavior: "smooth"
    });
}

const requestList = document.getElementById("requestList");

function submitMealRequest() {
    const customerName = document.getElementById("customerName").value;
    const email = document.getElementById("email").value;
    const mealPlan = document.getElementById("mealPlan").value;
    const allergies = document.getElementById("allergies").value;
    const address = document.getElementById("address").value;
    const contactNumber = document.getElementById("contactNumber").value;

    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <strong>Name:</strong> ${customerName}<br>
        <strong>Email:</strong> ${email}<br>
        <strong>Meal Plan:</strong> ${mealPlan}<br>
        <strong>Preferences:</strong> ${allergies}<br>
        <strong>Address:</strong> ${address}<br>
        <strong>Contact:</strong> ${contactNumber}
    `;

    requestList.appendChild(listItem);
    document.getElementById("mealPlanForm").reset();
}