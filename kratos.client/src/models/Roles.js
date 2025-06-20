class Roles {
    constructor({ id, nombre, descripcion, empresaId }) {
        this.id = id || null;

        this.nombre = nombre || '';
        this.descripcion = descripcion || '';
        this.empresaId = empresaId || null;
    }

    validate() {
        const errors = [];
        if (!this.empresaId) errors.push('El ID de la empresa es requerido');
        if (!this.nombre) errors.push('El nombre es requerido');
        if (!this.descripcion) errors.push('La descripción es requerida');
   

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
            empresaId: Number(this.empresaId),
        };
    }
}

export default Roles;