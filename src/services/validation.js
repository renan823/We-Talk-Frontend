export const user = {
    required: "Preencha esse campo",
    minLength: {
            message: "Use no mínimo 5 caracteres",
            value: 5
        },
    maxLength: {
            message: "Use no máximo 30 caracteres",
            value: 30
        },
        pattern: {
            //instagram user pattern
            value: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm,
            message: "Preencha corretamente o campo"
        }
}

export const password = {
    required: "Preencha esse campo",
    minLength: {
        message: "Use no mínimo 6 caracteres",
        value: 6
    },
    maxLength: {
        message: "Use no máximo 20 caracteres",
        value: 20
    },
    pattern: {
        value: /([A-Za-z0-9])\w+/,
        message: "Preencha corretamente o campo"
    }
}

export const biography = {
    required: "Preencha esse campo",
    minLength: {
        message: "Use no mínimo 10 caracteres",
        value: 10
    },
    maxLength: {
        message: "Use no máximo 100 caracteres",
        value: 100
    },
    pattern: {
        value: /^[^ ][\w\W ]*[^ ]$/,
        message: "Preencha corretamente o campo"
    }
}
