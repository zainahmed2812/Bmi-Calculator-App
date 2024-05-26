function calculatebmi() {
    let weight = parseFloat(document.getElementById("weight").value);
    let height = parseFloat(document.getElementById("height").value);

    // Conversion of  height from centimeters to meters
    let heightInMeters = height / 100;

    // Calcusltion of bmi
    let bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    document.getElementById('heading').innerHTML = "Your BMI is";
    document.getElementById('bmi-output').innerHTML = bmi;
    let category = "";

    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = "Normal Weight";
    } else if (bmi >= 25 && bmi < 29.9) {
        category = "Overweight";
    } else {
        category = "None";
    }

    document.getElementById('message').innerHTML = "Category: " + category;
    document.getElementById('myForm').reset();
}

function reload(){
    window.location.reload()
}
