// Error handling variables.
const DEFAULT_ERROR = {
    "status": false,
    "message": "An error has occurred."
}

const EMPTY_INPUT_ERROR = {
    "status": false,
    "message": "Input parameters cannot be empty."
}

const EMAIL_DOES_NOT_EXIST_ERROR = {
    "status": false,
    "message": "An account with the email provided does not exist."
}

const INCORRECT_PASSWORD_ERROR = {
    "status": false,
    "message": "The password provided was incorrect."
}

const ID_DOES_NOT_EXIST_ERROR = {
    "status": false,
    "message": "The ID provided does not exist."
}

module.exports = {DEFAULT_ERROR, EMPTY_INPUT_ERROR, EMAIL_DOES_NOT_EXIST_ERROR, INCORRECT_PASSWORD_ERROR, ID_DOES_NOT_EXIST_ERROR};