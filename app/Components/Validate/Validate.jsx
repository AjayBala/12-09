export const validate = values => {
    const error = {};
    /* eslint max-len: ["error", { "ignoreRegExpLiterals": true }] */
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailPasswordPattern = /^[a-zA-Z0-9]{8,16}$/g;
    const validEmail = emailPattern.test(values.email);
    // eslint-disable-next-line
    const validPwd = emailPasswordPattern.test(values.password);
    if (!values.email) {
        error.email = 'Required';
    } else if (!validEmail) {
        error.email = 'Please Enter a Valid Email';
    }

    const capital = document.getElementById('capital');
    const special = document.getElementById('special');
    const length = document.getElementById('length');
    const upperCaseLetters = /[A-Z]/g;
    const SpecialSmallLetters = /[!@#$%^&*)(+=._-]/g;

    if (!values.password) {
        error.password = 'Required';
    } else if (values.password.length < 8) {
        error.password = 'Password should be greater than 8';
    } else if (values.password.length > 15) {
        error.password = 'Password should be lesser than 16';
    } else if (!values.password.length >= 8) {
        error.password = 'Password should be greater than 8';
        length.classList.add('errorClass');
        capital.classList.remove('errorClass');
        special.classList.remove('errorClass');
    } else if (!values.password.match(upperCaseLetters)) {
        error.password = 'Need upper case';
        length.classList.remove('errorClass');
        capital.classList.add('errorClass');
        special.classList.remove('errorClass');
    } else if (!values.password.match(SpecialSmallLetters)) {
        error.password = 'Need Atleast one special Character';
        length.classList.remove('errorClass');
        capital.classList.remove('errorClass');
        special.classList.add('errorClass');
    } else if (values.password.match(SpecialSmallLetters)) {
        special.classList.remove('errorClass');
    }

return error;
};
