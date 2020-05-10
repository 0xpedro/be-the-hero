import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';
import logo_img from '../../assets/logo.svg';

export default function NewIncident(){
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');

    async function handleNovoCaso(e){
        e.preventDefault();

        const data = {
            titulo,
            descricao,
            valor
        };

        try {
            await api.post('/casos', data, {
                headers: {
                    Authorization: ongId
                }
            });
            
            alert('Caso cadastrado com sucesso.');

            history.push('/profile');
        } catch (e) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logo_img} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói que possa resolver isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/> Voltar
                    </Link>
                </section>

                <form onSubmit={handleNovoCaso}>
                    <input
                        placeholder="Titulo do caso"
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    />
                    <input
                        placeholder="Valor em reais"
                        value={valor}
                        onChange={e => setValor(e.target.value)}
                    />

                    <button className="button" type="submit">Cancelar</button>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}