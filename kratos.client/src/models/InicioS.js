class IniciarSesionRequest {
    constructor({ email, contrasena }) {
        this.email = email ?? '';
        this.contrasena = contrasena ?? '';
    }

    validate() {
        const errors = [];
        if (!this.email) errors.push('El campo correo electr�nico es obligatorio');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.email && !emailRegex.test(this.email)) {
            errors.push('El correo electr�nico no es v�lido');
        }

        if (!this.contrasena) errors.push('El campo contrase�a es obligatorio');

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