import React from 'react';

import logo from '../../assets/logo.svg';

import { Title, Form } from './styled';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logo} alt="logo" />
      <Title>Explore repositórios no Github</Title>

      <Form placeholder="">
        <input placeholder="Digite um repositório" />
        <button type="button">Pesquisar</button>
      </Form>
    </>
  );
};

export default Dashboard;
