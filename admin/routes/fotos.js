var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');
const Foto = require('../models').foto;
const Etiqueta = require('../models').etiqueta;

// Validación sencilla para id entero positivo
function validarId(id) {
  return !isNaN(id) && Number.isInteger(id) && id > 0;
}

// Endpoint de debug para ver qué llega en la query
router.get('/debug', (req, res) => {
  const idRaw = req.query.id;
  console.log("DEBUG - idRaw:", idRaw);

  const idParsed = parseInt(idRaw, 10);
  console.log("DEBUG - idParsed:", idParsed);

  const esValido = validarId(idParsed);
  console.log("DEBUG - validarId(idParsed):", esValido);

  res.json({ idRaw, idParsed, esValido });
});

// === JSON ===
router.get('/findAll/json', async (req, res) => {
  try {
    const idRaw = req.query.id;
    console.log("ID recibido en JSON (raw):", idRaw);

    const id = parseInt(idRaw, 10);
    console.log("ID parseado en JSON:", id);

    if (validarId(id)) {
      const foto = await Foto.findByPk(id, {
        attributes: { exclude: ["updatedAt"] },
        include: [{
          model: Etiqueta,
          attributes: ['texto'],
          through: { attributes: [] }
        }],
      });

      console.log("Foto encontrada:", foto);

      if (!foto) {
        console.warn(`Foto con ID ${id} no encontrada`);
        return res.status(404).json({ error: 'Foto no encontrada' });
      }

      return res.json(foto);
    } else {
      const fotos = await Foto.findAll({
        attributes: { exclude: ["updatedAt"] },
        include: [{
          model: Etiqueta,
          attributes: ['texto'],
          through: { attributes: [] }
        }],
      });
      console.log("Todas las fotos encontradas:", fotos.length);
      return res.json(fotos);
    }
  } catch (error) {
    console.error("Error en /findAll/json:", error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
});

// === VIEW ===
router.get('/findAll/view', async (req, res) => {
  try {
    const idRaw = req.query.id;
    console.log("ID recibido en VIEW (raw):", idRaw);

    const id = parseInt(idRaw, 10);
    console.log("ID parseado en VIEW:", id);

    if (validarId(id)) {
      const foto = await Foto.findByPk(id, {
        attributes: { exclude: ["updatedAt"] },
        include: [{
          model: Etiqueta,
          attributes: ['texto'],
          through: { attributes: [] }
        }],
      });

      console.log("Foto encontrada para vista:", foto);

      const fotos = foto ? [foto] : [];
      if (fotos.length === 0) {
        console.warn(`Foto con ID ${id} no encontrada para vista`);
      }
      return res.render('fotos', { title: 'Fotos', arrFotos: fotos });
    } else {
      const fotos = await Foto.findAll({
        attributes: { exclude: ["updatedAt"] },
        include: [{
          model: Etiqueta,
          attributes: ['texto'],
          through: { attributes: [] }
        }],
      });
      console.log("Todas las fotos encontradas para vista:", fotos.length);
      return res.render('fotos', { title: 'Fotos', arrFotos: fotos });
    }
  } catch (error) {
    console.error("Error en /findAll/view:", error);
    return res.status(500).send('Error del servidor');
  }
});

module.exports = router;

