const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('casos').count();
        console.log(count);

        const casos = await connection('casos')
            .join('ong', 'ong.id', '=', 'casos.ong_id')
            .limit(2)
            .offset((page - 1) * 2)
            .select(['casos.*', 'ong.nome', 'ong.email', 'ong.cidade', 'ong.uf', 'ong.whatsapp']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(casos);
    },

    async create(request, response) {
        const { titulo, descricao, valor } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('casos').insert({
            ong_id,
            titulo,
            descricao,
            valor
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const caso = await connection('casos').where('id', id).select('ong_id').first();

        if (caso.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operação não permitida' });
        }

        await connection('casos').where('id', id).delete();

        return response.status(204).send();
    }
};