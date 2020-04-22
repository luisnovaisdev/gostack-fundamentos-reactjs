import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
  page?: 'home' | 'import';
}

const Header: React.FC<HeaderProps> = ({
  size = 'large',
  page = 'home',
}: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        <Link className={page === 'home' ? 'current' : ''} to="/">
          Listagem
        </Link>
        <Link className={page === 'import' ? 'current' : ''} to="/import">
          Importar
        </Link>
      </nav>
    </header>
  </Container>
);

export default Header;
