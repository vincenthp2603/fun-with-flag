export const validateInput = (input) => {
    if (input.length >= 5) {
        return true;
    }
    return false;
}

export const validateForm = (formControl) => {
    for (let key in formControl) {
        let input = formControl[key];
        if (input.touched !== undefined) {
            if (!input.isValid && input.required) {
                return false;
            }

            if (!input.isValid && !input.required && input.value.trim() !== '') {
                return false;
            }
        }
    }
    return true;
}