import React from 'react';
import { FiChevronsRight } from 'react-icons/fi';

import api from '../../services/api';
import logo from '../../assets/logo.svg';
import { Title, Form, Repositories } from './styled';

interface Repository {
  full_name: string;
  html_url: string;
  description: string;
  owner: {
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = React.useState<Repository[]>([]);
  const [newRepo, setNewRepo] = React.useState('');

  async function handleAddRepository(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setNewRepo('');

    const response = await api.get<Repository>(`repos/${newRepo}`);
    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  return (
    <>
      <img src={logo} alt="logo" />
      <Title>Explore repositórios no Github</Title>

      <Form onSubmit={handleAddRepository}>
        <input
          placeholder="Digite um repositório"
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        {repositories.map(item => (
          <a
            key={item.full_name}
            href={item.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={item.owner.avatar_url} alt="avatar" />
            <div>
              <strong>{item.full_name}</strong>
              <p>{item.description}</p>
            </div>

            <FiChevronsRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
