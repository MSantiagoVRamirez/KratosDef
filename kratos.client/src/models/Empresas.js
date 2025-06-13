class Empresas {
    constructor({
        id,
        contrasena,
        confirmarContrasena,
        tiposociedadId,
        actividadId,
        regimenId,
        token,
        razonSocial,
        nombreComercial,
        nit,
        dv,
        telefono,
        email,
        representanteLegal,
        activo,
        creadoEn,
        actualizadoEn
    }) {
        this.id = id ?? null;
        this.contrasena = contrasena ?? '';
        this.confirmarContrasena = confirmarContrasena ?? '';
        this.tiposociedadId = tiposociedadId ?? null;
        this.actividadId = actividadId ?? null;
        this.regimenId = regimenId ?? null;
        this.token = token ?? '';
        this.razonSocial = razonSocial ?? '';
        this.nombreComercial = nombreComercial ?? '';
        this.nit = nit ?? '';
        this.dv = dv ?? '';
        this.telefono = telefono ?? '';
        this.email = email ?? '';
        this.representanteLegal = representanteLegal ?? '';
        this.activo = activo ?? true;
        this.creadoEn = creadoEn ?? new Date();
        this.actualizadoEn = actualizadoEn ?? new Date();
    }

    validate() {
        const errors = [];
        if (!this.contrasena) errors.push('El campo contraseña es obligatorio');
        if (this.contrasena.length > 100) errors.push('El campo contraseña debe tener máximo 100 caracteres');
        if (this.contrasena !== this.confirmarContrasena) errors.push('La contraseña y la confirmación no coinciden');
        if (!this.tiposociedadId) errors.push('El campo tipo de sociedad es obligatorio');
        if (!this.actividadId) errors.push('El campo actividad económica es obligatorio');
        if (!this.regimenId) errors.push('El campo régimen tributario es obligatorio');
        if (!this.token) errors.push('El campo token es obligatorio');
        if (this.token.length > 100) errors.push('El campo token debe tener máximo 100 caracteres');
        if (!this.razonSocial) errors.push('El campo razón social es obligatorio');
        if (this.razonSocial.length > 100) errors.push('El campo razón social debe tener máximo 100 caracteres');
        if (!this.nombreComercial) errors.push('El campo nombre comercial es obligatorio');
        if (this.nombreComercial.length > 100) errors.push('El campo nombre comercial debe tener máximo 100 caracteres');
        if (!this.nit) errors.push('El campo NIT es obligatorio');
        if (this.nit.length > 100) errors.push('El campo NIT debe tener máximo 100 caracteres');
        if (this.dv && this.dv.length > 100) errors.push('El campo DV debe tener máximo 100 caracteres');
        if (!this.telefono) errors.push('El campo teléfono es obligatorio');
        if (this.telefono.length > 100) errors.push('El campo teléfono debe tener máximo 100 caracteres');
        if (!this.email) errors.push('El campo email es obligatorio');
        if (this.email.length > 100) errors.push('El campo email debe tener máximo 100 caracteres');
        if (!this.representanteLegal) errors.push('El campo representante legal es obligatorio');
        if (this.representanteLegal.length > 100) errors.push('El campo representante legal debe tener máximo 100 caracteres');

        if (errors.length > 0) {
            throw new Error(errors.join(', '));
        }
        return true;
    }

    toJSON() {
        return {
            id: this.id,
            contrasena: this.contrasena,
            confirmarContrasena: this.confirmarContrasena,
            tiposociedadId: this.tiposociedadId,
            actividadId: this.actividadId,
            regimenId: this.regimenId,
            token: this.token,
            razonSocial: this.razonSocial,
            nombreComercial: this.nombreComercial,
            nit: this.nit,
            dv: this.dv,
            telefono: this.telefono,
            email: this.email,
            representanteLegal: this.representanteLegal,
            activo: this.activo,
            creadoEn: this.creadoEn,
            actualizadoEn: this.actualizadoEn
        };
    }
}

export default Empresas;
