let passwordGenerated: boolean = false;

function generatePassword(): string | null {
    let password: string = "";

    const lowerCase: string = "abcdefghijklmnopqrstuvwxyz";
    const upperCase: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers: string = "0123456789";
    const symbols: string = "!@#$%^&*()-=_+<>,.[]{}/;:";

    const passwordLength: number = Number((document.querySelector("#passwordLength") as HTMLInputElement).value);

    const includeLowerCase = (document.querySelector("#lowerCase") as HTMLInputElement | null)?.checked ?? false;
    const includeUpperCase = (document.querySelector("#upperCase") as HTMLInputElement | null)?.checked ?? false;
    const includeNumbers = (document.querySelector("#numbers") as HTMLInputElement | null)?.checked ?? false;
    const includeSymbols = (document.querySelector("#symbols") as HTMLInputElement | null)?.checked ?? false;

    const chars: string[] = [];
    includeLowerCase && chars.push(lowerCase);
    includeUpperCase && chars.push(upperCase);
    includeNumbers && chars.push(numbers);
    includeSymbols && chars.push(symbols);

    if (chars.length === 0) return null;

    for (let i=0; i<passwordLength; i++) {
        let randomIndex = Math.floor(Math.random() * chars.length);
        const charType: string = chars[randomIndex];

        randomIndex = Math.floor(Math.random() * charType.length);
        const char: string = charType[randomIndex];
        password += char;
    }

    return password;
}

function generatePreviewPassword(): string {
    let password: string = "";

    const lowerCase: string = "abcdefghijklmnopqrstuvwxyz";
    const upperCase: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers: string = "0123456789";
    const symbols: string = "!@#$%^&*()-=_+<>,.[]{}/;:";

    const chars: string[] = [lowerCase, upperCase, numbers, symbols];

    const passwordLength: number = Math.floor(Math.random() * (30 - 12 + 1)) + 12;

    for (let i=0; i<passwordLength; i++) {
        let randomIndex = Math.floor(Math.random() * chars.length);
        const charType: string = chars[randomIndex];

        randomIndex = Math.floor(Math.random() * charType.length);
        const char: string = charType[randomIndex];
        password += char;
    }

    return password;
}

document.querySelector("form")!.addEventListener("submit", (event) => {
    event.preventDefault();
    passwordGenerated = true;
    handleSubmit();
});

const output = document.querySelector("output > span") as HTMLSpanElement;

function handleSubmit(): void {
    const password: string | null = generatePassword();
    if (!password) { output.innerText = "Select at least one character type."; return; }
    output.innerText = password;
}

function previewPassword(): void {
    if (passwordGenerated) return;

    const password: string = generatePreviewPassword();
    output.innerText = password;

    setTimeout(previewPassword, 250);
}

document.addEventListener("DOMContentLoaded", previewPassword);

const passwordOutput = document.querySelector("output > span") as HTMLSpanElement;

const copyPasswordButton = document.querySelector("output > button") as HTMLButtonElement;

const passwordLengthDiv = document.querySelector("#passwordLengthDiv") as HTMLDivElement;

const passwordLengthSpan = document.querySelector("#passwordLengthSpan") as HTMLSpanElement;

const passwordLengthInput = document.querySelector("#passwordLength") as HTMLInputElement;

passwordLengthInput.addEventListener("input", () => {
    passwordLengthSpan.innerText = passwordLengthInput.value;
});

copyPasswordButton.addEventListener("click", () => {
    const password = passwordOutput.textContent;
    if (password) navigator.clipboard.writeText(password);
});

const lowerCaseInput = document.querySelector("#lowerCase") as HTMLInputElement | null;

lowerCaseInput?.addEventListener("input", (event) => event.preventDefault());

const checkboxes = [
    document.querySelector("#lowerCase") as HTMLInputElement,
    document.querySelector("#upperCase") as HTMLInputElement,
    document.querySelector("#numbers") as HTMLInputElement,
    document.querySelector("#symbols") as HTMLInputElement,
];

function updateCheckboxStates() {
    const checkedBoxes = checkboxes.filter(cb => cb.checked);

    if (checkedBoxes.length === 1) {
        checkedBoxes[0].disabled = true;
    } else {
        checkboxes.forEach(checkbox => checkbox.disabled = false);
    }
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", updateCheckboxStates);
});