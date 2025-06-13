class ActividadEconomica {
    constructor({ id, codigoCiiu, nombre, descripcion, categoria }) {
        this.id = id || null;
        this.codigoCiiu = codigoCiiu ? codigoCiiu.toString() : '';
        this.nombre = nombre || '';
        this.descripcion = descripcion || '';
        this.categoria = categoria || '';
    }

    validate() {
        const errors = [];
        if (!this.codigoCiiu) errors.push('El código CIIU es requerido');
        if (!this.nombre) errors.push('El nombre es requerido');
        if (!this.descripcion) errors.push('La descripción es requerida');
        if (!this.categoria) errors.push('La categoría es requerida');

        if (errors.length > 0) {
            throw new Error(errors.join(', '));
        }
        return true;
    }

    toJSON() {
        return {
            id: this.id,
            codigoCiiu: this.codigoCiiu,
            nombre: this.nombre,
            descripcion: this.descripcion,
            categoria: this.categoria
        };
    }
}

export default ActividadEconomica;