import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';
import logo from '../../assets/logo.svg';
import { Title, Form, Repositories, Error } from './styled';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = React.useState<Repository[]>(() => {
    const repos = localStorage.getItem('@github-explorer:repositories');
    if (repos) {
      return JSON.parse(repos);
    }
    return [];
  });
  const [inputError, setInputError] = React.useState('');
  const [newRepo, setNewRepo] = React.useState('');

  React.useEffect(() => {
    localStorage.setItem(
      '@github-explorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(e: React.FormEvent): Promise<void> {
    e.preventDefault();

    if (!newRepo) {
      setInputError('Digite autor/nome_do_repositório');
    } else {
      setNewRepo('');
      setInputError('');
      try {
        const response = await api.get<Repository>(`repos/${newRepo}`);
        const repository = response.data;

        setRepositories([...repositories, repository]);
      } catch (error) {
        setInputError('Erro na busca do repositório');
      }
    }
  }

  return (
    <>
      <img src={logo} alt="logo" />
      <Title>Explore repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          placeholder="Digite um repositório"
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repositories.map(item => (
          <Link
            key={item.full_name}
            to={`repository/${item.full_name}`}
            rel="noopener noreferrer"
          >
            <img src={item.owner.avatar_url} alt="avatar" />
            <div>
              <strong>{item.full_name}</strong>
              <p>{item.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
