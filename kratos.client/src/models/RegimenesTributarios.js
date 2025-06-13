class RegimenesTributarios {
    constructor({ id, nombre, descripcion, codigo, estado }) {
        this.id = id ?? null;
        this.nombre = nombre ?? '';
        this.descripcion = descripcion ?? '';
        this.codigo = codigo ?? '';
        this.estado = typeof estado === 'boolean' ? estado : true;
    }

    validate() {
        const errors = [];
        if (!this.nombre) errors.push('El campo nombre es obligatorio');
        if (this.nombre.length > 100) errors.push('El campo nombre debe tener m�ximo 100 caracteres');
        if (!this.descripcion) errors.push('El campo descripci�n es obligatorio');
        if (this.descripcion.length > 100) errors.push('El campo descripci�n debe tener m�ximo 100 caracteres');
        if (!this.codigo) errors.push('El campo c�digo es obligatorio');
        if (this.codigo.length > 100) errors.push('El campo c�digo debe tener m�ximo 100 caracteres');
        if (errors.length > 0) {
            throw new Error(errors.join(', '));
        }
        return true;
    }

    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            descripcion: this.descripcion,
            codigo: this.codigo,
            estado: this.estado
        };
    }
}

export default RegimenesTributarios;