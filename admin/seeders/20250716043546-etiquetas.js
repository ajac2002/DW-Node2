'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let etiquetas = ['foto', 'payaso', 'rojo', 'azul', 'techo', 'cielo', 'foco', 'luz'];

    const data = etiquetas.map(etiqueta => ({
      texto: etiqueta,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('etiqueta', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('etiqueta', null, {});
  }
};
