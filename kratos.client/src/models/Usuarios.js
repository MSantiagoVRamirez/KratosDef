class Usuarios {
    constructor({
        id = undefined,
        rolesId = null,
        contrasena = '',
        token = '',
        confirmarContrasena = '',
        nombre = '',
        apellidos = '',
        telefono = '',
        email = '',
        activo = true,
        creadoEn = new Date().toISOString(),
        actualizadoEn = new Date().toISOString()
    } = {}) {
        this.id = id;
        this.rolesId = rolesId;
        this.contrasena = contrasena;
        this.confirmarContrasena = confirmarContrasena;
        this.token = token;
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
        this.apellidos = apellidos;
        this.activo = activo;
        this.creadoEn = creadoEn;
        this.actualizadoEn = actualizadoEn;
    }

    validate() {
        const errors = [];

        // Validacion de contraseñas
        if (!this.contrasena || this.contrasena.trim() === '') {
            errors.push('El campo contraseña es obligatorio');
        }
        if (!this.confirmarContrasena || this.confirmarContrasena.trim() === '') {
            errors.push('El campo confirmar contraseña es obligatorio');
        }
        if (this.contrasena && this.confirmarContrasena && this.contrasena !== this.confirmarContrasena) {
            errors.push('La contraseña y la confirmacion no coinciden');
        }
        if (this.contrasena && this.contrasena.length > 100) {
            errors.push('La contraseña no puede exceder los 100 caracteres');
        }

    


        // Validacion de longitud maxima
        const maxLengthFields = {
            nombre: 100,
            apellidos: 100,
            email: 100,
            nit: 100,
            telefono: 100,
            token: 100,
            
        };

        Object.entries(maxLengthFields).forEach(([field, max]) => {
            if (this[field] && this[field].length > max) {
                errors.push(`El campo ${field} no puede exceder los ${max} caracteres`);
            }
        });

        if (errors.length > 0) {
            throw new Error(errors.join(', '));
        }
    }

    toJSON() {
        const jsonData = {
          

            id: this.id,
            rolesId: Number(this.rolesId), 
            contrasena: this.contrasena,
            confirmarContrasena: this.confirmarContrasena, 
            token: this.token, 
           
            nombre: this.nombre,
            telefono: this.telefono, 
            email: this.email, 
            apellidos: this.apellidos, 
            activo: this.activo, 
            creadoEn: this.creadoEn, 
            actualizadoEn: this.actualizadoEn 
        };

        // Solo incluir el ID si esta definido
        if (this.id !== undefined) {
            jsonData.id = this.id;
        }

        return jsonData;
    }

    static fromFormData(formData) {
        return new Usuarios({
            ...formData,
            activo: true,
            creadoEn: new Date().toISOString(),
            actualizadoEn: new Date().toISOString()
        });
    }
}

export default Usuarios;
