export const validateEmail = values => {
    let error = '';

    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailPasswordPattern = /^[a-zA-Z0-9]{8,16}$/g;
    const validEmail = emailPattern.test(values.email);
    // eslint-disable-next-line
    const validPwd = emailPasswordPattern.test(values.password);
    if (!values.email) {
        error = 'Required';
    } else if (!validEmail) {
        error = 'Please Enter a Valid Email';
    }

return error;
};


export const validatePassword = (values, length, capital, special) => {
    let error = '';

    const upperCaseLetters = /[A-Z]/g;
    const SpecialSmallLetters = /[!@#$%^&*)(+=._-]/g;

    if (!values.password) {
        error = 'Required';
    } else {
        if (values.password.length < 8) {
            error = 'Password should be greater than 8';
            length.classList.add('errorClass');
            capital.classList.add('errorClass');
            special.classList.add('errorClass');
        } else if (values.password.length > 15) {
            error = 'Password should be lesser than 16';
        } else {
            length.classList.remove('errorClass');
            length.classList.add('valid');
        }

        if (!values.password.match(upperCaseLetters)) {
            error = 'Need upper case';
            capital.classList.add('errorClass');
        } else {
            capital.classList.add('valid');
            capital.classList.remove('errorClass');
        }

        if (!values.password.match(SpecialSmallLetters)) {
            error = 'Need Atleast one special Character';
            special.classList.add('errorClass');
        } else {
            special.classList.add('valid');
            special.classList.remove('errorClass');
        }
    }

return { error, length, capital, special };
};

export const normalizeZip = value => {
    if (!value) {
        return value;
    }
    const onlyNums = value.replace(/[^\d]/g, '');

return onlyNums;
};

export const required = value => (value ? undefined : 'Required');

export const phoneChange = (length, event) => {
    const elemtName = event.target.name;
    const value = event.target.value.toString();
    const valueLength = value.length;
    if (valueLength >= length) {
        if (elemtName === 'comPhoneText1') {
            document.getElementsByName('comPhoneText2')[0].focus();
        } else if (elemtName === 'comPhoneText2') {
            document.getElementsByName('comPhoneText3')[0].focus();
        }
    }

    if (valueLength === 0) {
        if (elemtName === 'comPhoneText3') {
            document.getElementsByName('comPhoneText2')[0].focus();
        } else if (elemtName === 'comPhoneText2') {
            document.getElementsByName('comPhoneText1')[0].focus();
        }
    }
};
