function nameValidation(name = "") {
    name = name.replace(/\s+/g, " ").trim();
    if (name.length === 0) return "* Name is required!";
    if (name.length > 100) return "* Name cannot be more than 100 characters!";
    // Allow only alphabets, hyphens, and single spaces between words
    const nameRegex = /^[A-Za-z]+(?:[\s-][A-Za-z]+)*$/;
    return nameRegex.test(name)
        ? "" // valid
        : "* Name should only contain letters, spaces, or hyphens!";
}

function usernameValidation(username = "") {
    username = username.trim();
    if (username.length === 0) return "* Username is required!";

    if (username.length < 4) return "* Username must be at least 4 characters!";
    if (username.length > 20) return "* Username cannot exceed 20 characters!";

    const validCharsRegex = /^[a-zA-Z0-9._]+$/;
    if (!validCharsRegex.test(username))
        return "* Username can only contain letters, numbers, dots, and underscores!";

    if (/^[._]/.test(username) || /[._]$/.test(username))
        return "* Username cannot start or end with '.' or '_'!";

    if (/([._])\1/.test(username))
        return "* Username cannot contain consecutive '.' or '_'!";

    return "";
}

function emailValidation(email = "") {
    email = email.trim();

    if (email.length === 0) return "* Email is required!";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "* Please enter a valid email address!";

    return "";
}

function passwordValidation(password = "") {
    if (password.length === 0) return "* Password is required!";
    if (password.length < 8) return "* Password must be at least 8 characters long!";

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password))
        return "* Password must include uppercase, lowercase, number, and special character!";

    return "";
}

function confirmPasswordValidation(password = "", confirmPassword = "") {
    if (confirmPassword.length === 0) return "* Confirm Password is required!";
    if (password !== confirmPassword) return "* Passwords do not match!";

    return "";
}

export {
    nameValidation, usernameValidation, emailValidation, passwordValidation, confirmPasswordValidation
}


