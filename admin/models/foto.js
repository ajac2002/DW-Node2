'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class foto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.foto.belongsToMany(models.etiqueta, {
        through: 'fotoetiquetas',  // nombre de la tabla intermedia
        foreignKey: 'foto_id',          // alias para incluir etiquetas en consultas
      });
    }
  }
  foto.init({
    titulo: DataTypes.STRING,
    description: DataTypes.STRING,
    calification: DataTypes.FLOAT,
    ruta: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'foto',
  });
  return foto;
};