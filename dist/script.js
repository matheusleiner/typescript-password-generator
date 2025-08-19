"use strict";
let passwordGenerated = false;
function generatePassword() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    let password = "";
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()-=_+<>,.[]{}/;:";
    const passwordLength = Number(document.querySelector("#passwordLength").value);
    const includeLowerCase = (_b = (_a = document.querySelector("#lowerCase")) === null || _a === void 0 ? void 0 : _a.checked) !== null && _b !== void 0 ? _b : false;
    const includeUpperCase = (_d = (_c = document.querySelector("#upperCase")) === null || _c === void 0 ? void 0 : _c.checked) !== null && _d !== void 0 ? _d : false;
    const includeNumbers = (_f = (_e = document.querySelector("#numbers")) === null || _e === void 0 ? void 0 : _e.checked) !== null && _f !== void 0 ? _f : false;
    const includeSymbols = (_h = (_g = document.querySelector("#symbols")) === null || _g === void 0 ? void 0 : _g.checked) !== null && _h !== void 0 ? _h : false;
    const chars = [];
    includeLowerCase && chars.push(lowerCase);
    includeUpperCase && chars.push(upperCase);
    includeNumbers && chars.push(numbers);
    includeSymbols && chars.push(symbols);
    if (chars.length === 0)
        return null;
    for (let i = 0; i < passwordLength; i++) {
        let randomIndex = Math.floor(Math.random() * chars.length);
        const charType = chars[randomIndex];
        randomIndex = Math.floor(Math.random() * charType.length);
        const char = charType[randomIndex];
        password += char;
    }
    return password;
}
function generatePreviewPassword() {
    let password = "";
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()-=_+<>,.[]{}/;:";
    const chars = [lowerCase, upperCase, numbers, symbols];
    const passwordLength = Math.floor(Math.random() * (30 - 12 + 1)) + 12;
    for (let i = 0; i < passwordLength; i++) {
        let randomIndex = Math.floor(Math.random() * chars.length);
        const charType = chars[randomIndex];
        randomIndex = Math.floor(Math.random() * charType.length);
        const char = charType[randomIndex];
        password += char;
    }
    return password;
}
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    passwordGenerated = true;
    handleSubmit();
});
const output = document.querySelector("output > span");
function handleSubmit() {
    const password = generatePassword();
    if (!password) {
        output.innerText = "Select at least one character type.";
        return;
    }
    output.innerText = password;
}
function previewPassword() {
    if (passwordGenerated)
        return;
    const password = generatePreviewPassword();
    output.innerText = password;
    setTimeout(previewPassword, 250);
}
document.addEventListener("DOMContentLoaded", previewPassword);
const passwordOutput = document.querySelector("output > span");
const copyPasswordButton = document.querySelector("output > button");
const passwordLengthDiv = document.querySelector("#passwordLengthDiv");
const passwordLengthSpan = document.querySelector("#passwordLengthSpan");
const passwordLengthInput = document.querySelector("#passwordLength");
passwordLengthInput.addEventListener("input", () => {
    passwordLengthSpan.innerText = passwordLengthInput.value;
});
copyPasswordButton.addEventListener("click", () => {
    const password = passwordOutput.textContent;
    if (password)
        navigator.clipboard.writeText(password);
});
const lowerCaseInput = document.querySelector("#lowerCase");
lowerCaseInput === null || lowerCaseInput === void 0 ? void 0 : lowerCaseInput.addEventListener("input", (event) => event.preventDefault());
const checkboxes = [
    document.querySelector("#lowerCase"),
    document.querySelector("#upperCase"),
    document.querySelector("#numbers"),
    document.querySelector("#symbols"),
];
function updateCheckboxStates() {
    const checkedBoxes = checkboxes.filter(cb => cb.checked);
    if (checkedBoxes.length === 1) {
        checkedBoxes[0].disabled = true;
    }
    else {
        checkboxes.forEach(checkbox => checkbox.disabled = false);
    }
}
checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", updateCheckboxStates);
});
