import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';
import logo from '../../assets/logo.svg';
import { Header, RepositoryInfo, Issues } from './styled';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const [repository, setRepository] = React.useState<Repository | null>(null);
  const [issues, setIssues] = React.useState<Issue[]>([]);
  const { params } = useRouteMatch<RepositoryParams>();

  React.useEffect(() => {
    async function loadData() {
      const [repositoryResponse, issuesResponse] = await Promise.all([
        api.get<Repository>(`/repos/${params.repository}`),
        api.get<Issue[]>(`/repos/${params.repository}/issues`),
      ]);
      setIssues(issuesResponse.data);
      setRepository(repositoryResponse.data);
    }
    loadData();
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logo} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          voltar
        </Link>
      </Header>

      <RepositoryInfo>
        <header>
          <img
            src={repository?.owner.avatar_url}
            alt={repository?.owner.login}
          />
          <div>
            <strong>{repository?.full_name}</strong>
            <p>{repository?.description}</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>{repository?.stargazers_count}</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>{repository?.forks_count}</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>{repository?.open_issues_count}</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </RepositoryInfo>

      <Issues>
        {issues.map(issue => (
          <Link
            key={issue.id}
            to={{ pathname: issue.html_url }}
            rel="noopener noreferrer"
            target="_blank"
          >
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
