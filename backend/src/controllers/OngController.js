const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ong').select('*');

        return response.json(ongs);
    },

    async create(request, response) {
        const { nome, email, cidade, uf, whatsapp } = request.body;
        const id = generateUniqueId();

        await connection('ong').insert({
            nome,
            id,
            uf,
            cidade,
            whatsapp,
            email,
        });

        return response.json({ id });
    }
};