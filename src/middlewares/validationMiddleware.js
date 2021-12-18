import validator from "email-validator"
import { checkSchema } from 'express-validator';

const schemaLoginRequest = checkSchema({
    email: {
        notEmpty: {
            errorMessage: 'Email est obligatoire',
        },
        isEmail: {
            errorMessage: 'Email est valide',
          bail: true,
        },
    },
    password: {
        notEmpty: {
            errorMessage: 'Password est obligatoire',
        }
    }
})

const schemaRegisterRequest = checkSchema({
    email: {
        notEmpty: {
            errorMessage: 'Email est obligatoire',
        },
        isEmail: {
            errorMessage: 'Email doit etre valide',
          bail: true,
        },
    },
    password: {
        notEmpty: {
            errorMessage: 'Password est obligatoire',
        },
        isLength: {
            errorMessage: 'Password doit etre au moins 5 caracteres',
            options: { min: 5 },
        }
    },
    firstname: {
        notEmpty: {
            errorMessage: 'firstname est obligatoire',
        },
        isLength: {
            errorMessage: 'firstname doit etre au moins 5 caracteres',
            options: { min: 5 },
        }
    },
    lastname: {
        notEmpty: {
            errorMessage: 'lastname est obligatoire',
        },
        isLength: {
            errorMessage: 'lastname doit etre au moins 5 caracteres',
            options: { min: 5 },
        }
    },
    sexe: {
        notEmpty: {
            errorMessage: 'sexe est obligatoire',
        }
    },
    date_naissance: {
        notEmpty: {
            errorMessage: 'date_naissance est obligatoire',
        }
    }
})

const schemaUserUpdateRequest = checkSchema({
    firstname: {
        notEmpty: {
            errorMessage: 'firstname est obligatoire',
        },
        isLength: {
            errorMessage: 'firstname doit etre au moins 5 caracteres',
            options: { min: 5 },
        }
    },
    lastname: {
        notEmpty: {
            errorMessage: 'lastname est obligatoire',
        },
        isLength: {
            errorMessage: 'lastname doit etre au moins 5 caracteres',
            options: { min: 5 },
        }
    },
    sexe: {
        notEmpty: {
            errorMessage: 'sexe est obligatoire',
        }
    },
    date_naissance: {
        notEmpty: {
            errorMessage: 'date_naissance est obligatoire',
        }
    }
})

const schemaCardRequest = checkSchema({
    cartNumber: {
        notEmpty: {
            errorMessage: 'cartNumber est obligatoire',
        },
        isLength: {
            errorMessage: 'cartNumber doit etre valide',
            options: { min: 15 },
        }
    },
    month: {
        notEmpty: {
            errorMessage: 'month est obligatoire',
        },
        isNumeric: {
            errorMessage: 'month est une annee valide',
        }
    },
    year: {
        notEmpty: {
            errorMessage: 'year est obligatoire',
        },
        isNumeric: {
            errorMessage: 'year est une annee valide',
        }
    },
    defaultParam: {
        notEmpty: {
            errorMessage: 'defaultParam est obligatoire',
        }
    }
})

function validateRegiterUserRequest (req, next, schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);

    if (error) {
        // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        res.status(401)
        throw new Error("L'une ou plusieurs des donnees obligatoire sont manquantes") 
        // L'un des donnees obligatoires ne sont pas conformes
    } else {
        req.body = value;
        next();
    }
    
}

function validateLoginUserRequest (req, next) {
    const {
        email, password
    } = req.body

    if (!email && !password) {
        res.status(401)
        throw new Error("L'une ou plusieurs des donnees obligatoire sont manquantes") 
        // L'un des donnees obligatoires ne sont pas conformes
    } else if (!validator.validate(email)) {
        res.status(401)
        throw new Error("L'email n'est pas conforme") 
    }else {
        req.body = value;
        next();
    }
    
}

export {
    schemaLoginRequest, 
    schemaRegisterRequest,
    schemaUserUpdateRequest,
    schemaCardRequest
}