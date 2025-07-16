'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtener IDs de fotos y etiquetas
    const [fotos] = await queryInterface.sequelize.query('SELECT id FROM fotos');
    const [etiquetas] = await queryInterface.sequelize.query('SELECT id FROM etiqueta');

    const relaciones = [];

    for (let i = 0; i < fotos.length; i++) {
      const foto = fotos[i];

      // Seleccionar 2 etiquetas distintas al azar
      const indices = [...Array(etiquetas.length).keys()];
      const random1 = indices.splice(Math.floor(Math.random() * indices.length), 1)[0];
      const random2 = indices.splice(Math.floor(Math.random() * indices.length), 1)[0];

      relaciones.push({
        foto_id: foto.id,
        etiqueta_id: etiquetas[random1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      relaciones.push({
        foto_id: foto.id,
        etiqueta_id: etiquetas[random2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Insertar todas las relaciones
    await queryInterface.bulkInsert('fotoetiquetas', relaciones, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fotoetiquetas', null, {});
  }
};
