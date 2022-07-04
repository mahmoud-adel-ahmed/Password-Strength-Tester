let progressMeter = document.querySelector(".progress-meter");
let inputPassword = document.querySelector(".input-password");
let reasonsContainer = document.querySelector(".reasons");

inputPassword.addEventListener("input", updateProgressMeter);

updateProgressMeter();

function updateProgressMeter() {
  let feedbacks = calcPasswordStrength(inputPassword.value);
  let strength = 100;
  reasonsContainer.innerHTML = "";
  feedbacks.forEach((feedback) => {
    if (!feedback) return;
    let messageElement = document.createElement("div");
    strength -= feedback.deduction;
    messageElement.innerHTML = feedback.reason;
    reasonsContainer.appendChild(messageElement);
  });

  if (strength == 100) {
    let messageElement = document.createElement("div");
    messageElement.innerHTML = "Your Password is strong";
    reasonsContainer.appendChild(messageElement);
  }
  progressMeter.style.setProperty("--strength", strength);
}

function calcPasswordStrength(password) {
  console.log(inputPassword.value);
  let reasons = [];
  reasons.push(lengthCriteria(password));
  reasons.push(repeatCharsCriteria(password));
  reasons.push(whichCaseCriteria(password, /[a-z]/g, "Lowercase"));
  reasons.push(whichCaseCriteria(password, /[A-Z]/g, "Uppercase"));
  reasons.push(whichCaseCriteria(password, /[0-9]/g, "Numbers"));
  reasons.push(
    whichCaseCriteria(password, /[^a-zA-Z0-9]/g, "Special characters")
  );

  return reasons;
}

function lengthCriteria(password) {
  let length = password.length;
  if (length <= 5) {
    return {
      reason: "Your Password is very short",
      deduction: 40,
    };
  }

  if (length <= 10) {
    return {
      reason: "Your Password could be longer",
      deduction: 15,
    };
  }
}

function whichCaseCriteria(password, regex, Case) {
  let matches = password.match(regex) || [];

  if (!matches) {
    return {
      reason: `Your Password has no ${Case} letters`,
      deduction: 20,
    };
  }

  if (matches.length <= 2) {
    return {
      reason: `Your Password could have more ${Case} letters`,
      deduction: 5,
    };
  }
}

function repeatCharsCriteria(password) {
  let matches = password.match(/(.)\1/g) || [];
  console.log(matches);
  if (matches.length > 0) {
    return {
      reason: "Your password has repeated letters",
      deduction: matches.length * 5,
    };
  }
}
