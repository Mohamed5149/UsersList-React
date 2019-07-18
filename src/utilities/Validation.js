import validator from 'validator';

const validate = (id, value) => {
    switch (id) {
        case 'name':
            return (!validator.isEmpty(value) && value.length <= 10)
        case 'email':
            return (validator.isEmail(value))
        case 'phone':
            return (validator.isMobilePhone(value))
        case 'status':
            return (isNaN(value))
        case 'role':
            return (isNaN(value))
    }
}

export default validate;