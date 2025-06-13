class TiposSociedades {
    constructor({ id, codigo, nombre, descripcion }) {
        this.id = id ?? null;
        this.codigo = codigo ?? '';
        this.nombre = nombre ?? '';
        this.descripcion = descripcion ?? '';
    }

    validate() {
        const errors = [];
        if (!this.codigo) errors.push('El campo código es obligatorio');
        if (this.codigo.length > 100) errors.push('El campo código debe tener máximo 100 caracteres');
        if (!this.nombre) errors.push('El campo nombre es obligatorio');
        if (this.nombre.length > 100) errors.push('El campo nombre debe tener máximo 100 caracteres');
        if (!this.descripcion) errors.push('El campo descripción es obligatorio');
        if (this.descripcion.length > 500) errors.push('El campo descripción debe tener máximo 500 caracteres');
        if (errors.length > 0) {
            throw new Error(errors.join(', '));
        }
        return true;
    }

    toJSON() {
        return {
            id: this.id,
            codigo: this.codigo,
            nombre: this.nombre,
            descripcion: this.descripcion
        };
    }
}

export default TiposSociedades;