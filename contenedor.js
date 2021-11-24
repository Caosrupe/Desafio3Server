const fs = require('fs')

class Contenedor {
    constructor (nombreArchivo){
        this.ruta = nombreArchivo
    }

    save = async objeto => {

        const arrContenedor = await this.getAll()
        /* const objeto = {title: "Parlante Pionner Triaxial", price: 65000, pictureurl: "https://pioneer-latin.com/wp-content/uploads/2019/07/ts-f1634r_top-600x600.jpg""} */
        
        let id = 0;
        if (arrContenedor.length === 0 ) {
            id = 1;
            objeto["id"] = id;
        }else{
            objeto["id"] = arrContenedor [arrContenedor.length -1].id + 1;
        }

        arrContenedor.push(objeto)

        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(arrContenedor, null, 2))
            return objeto.id 
        } catch (error) {
            throw new Error('No se pudo guardar')
        }
    }

    getAll = async () => {
        try {
            const contenido = await fs.promises.readFile(this.ruta, 'utf-8')           

            return JSON.parse(contenido)

        } catch (error) {
            await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2))
            const contenido = await fs.promises.readFile(this.ruta, 'utf-8')
            return JSON.parse(contenido)
        }
    }


    getById = async id => {
        try {
            const arrContenedor = await this.getAll()
    
            const idBuscado = arrContenedor.find( p => p.id === id)
    
            if (idBuscado){
                return idBuscado
            } else {
                return null
            }
        } catch (err) {
            console.log("Error al obtener por id: " + err);
        }
    }

    deleteById = async id => {
        const arrContenedor = await this.getAll() 
        const nuevoArreglo = arrContenedor.filter(p => p.id !== id)

        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(nuevoArreglo, null, 2))
        } catch (error) {
            throw new Error('No se pudo actualizar', error)
        }
    }

    deleteAll = async () => {
        return await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2))
    }
}

module.exports = Contenedor

