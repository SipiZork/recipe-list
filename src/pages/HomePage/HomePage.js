import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import styled from 'styled-components';
import Recipes from '../../components/Recipes/Recipes';
import { orangeColorPalette } from '../../styles/colors';
import ToolTip from '../../components/ToolTip/ToolTip';

const HomePage = () => {
  const [searchfield, setSearhfield] = useState('');

  return (
    <StyledHomePage>
      <div className="search">
        <i class="fas fa-search"></i>
        <input type="text" name="search-field" value={searchfield} onChange={(e) => setSearhfield(e.target.value)} autoComplete="off" />
      </div>
      <Recipes searchfield={searchfield} />
    </StyledHomePage>
  )
}

const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  .search {
    width: 80vw;
    height: 2.5rem;
    position: relative;

    i {
      position: absolute;
      font-size: 1.5rem;
      line-height: 2.5rem;
      left: .5rem;
    }

    input {
      width: 100%;
      height: 100%;
      padding-left: 2.5rem;
      font-size: 1.5rem;
      outline: none;
      border: none;
      border: 1px solid ${orangeColorPalette.brightOramge};

      &:hover,
      &:focus {
        border: 2px solid ${orangeColorPalette.brightOramge};
      }
    }
  }

  a {
    text-decoration: none;
  }

`;

export default HomePage;