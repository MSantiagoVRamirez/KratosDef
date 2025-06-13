class IniciarSesionRequest {
    constructor({ email, contrasena }) {
        this.email = email ?? '';
        this.contrasena = contrasena ?? '';
    }

    validate() {
        const errors = [];
        if (!this.email) errors.push('El campo correo electrónico es obligatorio');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.email && !emailRegex.test(this.email)) {
            errors.push('El correo electrónico no es válido');
        }

        if (!this.contrasena) errors.push('El campo contraseña es obligatorio');

        if (errors.length > 0) {
            throw new Error(errors.join(', '));
        }
    }

    toJSON() {
        return {
            email: this.email,
            contrasena: this.contrasena
        };
    }
}

export default IniciarSesionRequest;