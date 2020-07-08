import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { Container, Content, Title, Nav, Profile } from './styles';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <Content>
        <Title>
          <div>
            <h1>iHeros</h1>
          </div>
        </Title>
        <Nav>
          <div>
            <Link to="/occurrences">Ocorrências</Link>
          </div>
          <div>
            <Link to="/heroes">Heróis</Link>
          </div>
        </Nav>
        <Profile>
          <Link to="/profile">
            <strong>Olá {user.name}</strong>
          </Link>
          <button type="button" onClick={signOut}>
            Logout
          </button>
        </Profile>
      </Content>
    </Container>
  );
};

export default Header;
