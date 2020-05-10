import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import logo_img from '../../assets/logo.svg';
import heroes_img from '../../assets/heroes.png';

export default function Logon(){
    const [id, setId] = useState('');

    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('/sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.nome);

            history.push('/profile');
        } catch (e) {
            alert('Falha no login, tente novamente.');
        }
    }

    return(
        <div className="logon-container">
            <section className="form" onSubmit={handleLogin}>
                <img src={logo_img} alt="Be The Hero"/>

                <form>
                    <h1>Faça seu logon</h1>

                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/> Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroes_img} alt="Heroes" />
        </div>
    );
}