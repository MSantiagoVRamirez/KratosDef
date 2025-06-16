class Empresas {
    constructor({
        id = undefined, // Cambiado de null a undefined para que no se incluya en el JSON
        contrasena = '',
        confirmarContrasena = '',
        tiposociedadId = null,
        actividadId = null,
        regimenId = null,
        token = '',
        razonSocial = '',
        nombreComercial = '',
        nit = '',
        dv = '',
        telefono = '',
        email = '',
        representanteLegal = '',
        activo = true,
        creadoEn = new Date().toISOString(),
        actualizadoEn = new Date().toISOString()
    } = {}) {
        this.id = id;
        this.contrasena = contrasena;
        this.confirmarContrasena = confirmarContrasena;
        this.tiposociedadId = tiposociedadId;
        this.actividadId = actividadId;
        this.regimenId = regimenId;
        this.token = token;
        this.razonSocial = razonSocial;
        this.nombreComercial = nombreComercial;
        this.nit = nit;
        this.dv = dv;
        this.telefono = telefono;
        this.email = email;
        this.representanteLegal = representanteLegal;
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

        // Validacion de campos obligatorios
        const requiredFields = {
            razonSocial: 'Razon Social',
            email: 'Correo Electronico',
            nit: 'NIT',
            telefono: 'Telefono',
            token: 'Token',
            nombreComercial: 'Nombre Comercial',
            representanteLegal: 'Representante Legal',
            tiposociedadId: 'Tipo de Sociedad',
            actividadId: 'Actividad Economica',
            regimenId: 'Regimen Tributario'
        };

        Object.entries(requiredFields).forEach(([field, name]) => {
            if (!this[field] && this[field] !== 0) {
                errors.push(`El campo ${name} es obligatorio`);
            }
        });

        // Validacion de longitud maxima
        const maxLengthFields = {
            razonSocial: 100,
            email: 100,
            nit: 100,
            telefono: 100,
            token: 100,
            nombreComercial: 100,
            representanteLegal: 100,
            dv: 100
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
            razonSocial: this.razonSocial,
            nombreComercial: this.nombreComercial,
            nit: this.nit,
            dv: this.dv,
            telefono: this.telefono,
            email: this.email,
            representanteLegal: this.representanteLegal,
            tiposociedadId: Number(this.tiposociedadId),
            actividadId: Number(this.actividadId),
            regimenId: Number(this.regimenId),
            token: this.token,
            contrasena: this.contrasena,
            confirmarContrasena: this.confirmarContrasena,
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
        return new Empresas({
            ...formData,
            activo: true,
            creadoEn: new Date().toISOString(),
            actualizadoEn: new Date().toISOString()
        });
    }
}

export default Empresas;
