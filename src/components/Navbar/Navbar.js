import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { orangeColorPalette } from '../../styles/colors';
import { getShoplist } from '../../actions/shoplistAction';
import Button from '../Button/Button';
import { db } from '../../firebase/firebase';
import { onSnapshot, doc } from '@firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';

const Navbar = () => {
  const dispatch = useDispatch();
  const [piecesNumber, setPiecesNumber] = useState(0);
  const [profileMenu, setProfileMenu] = useState(false);
  const { currentUser, username, isLoggedIn } = useSelector(state => state.user);
  const { shoplist } = useSelector(state => state.shoplist);

  const giveNumber = () => {
    setPiecesNumber(piecesNumber + 1);
  }
  
  useEffect(() => {
    if (currentUser !== null) {
      onSnapshot(doc(db, 'users', currentUser.uid), (snapshot) => {
        dispatch(getShoplist(currentUser.uid));
      });
    }
  }, [dispatch, currentUser]);
  
  const signOutUser = () => {
    setProfileMenu(false);
    const auth = getAuth();
    signOut(auth);
  }

  return (
    <StyledNavbar>
      <Link to="/" className="logo">
        <p>Logo</p>
      </Link>
      <div className="right-side">
        {currentUser !== null ?
          <div className="profile" onMouseEnter={() => setProfileMenu(true)} onMouseLeave={() => setProfileMenu(false)}>
            <div className="profile-name">{username}</div>
            <div className={`profile-menu ${profileMenu ? 'show' : 'hide'}`}>
              <Link className="profile-menu-item" to="/shoplist">Bevásárló lista</Link>
              <Link className="profile-menu-item" to="" onClick={() => signOutUser()}>Kijelentkezés</Link>
            </div>
          </div> :
          <div className="profile">
            <Link to="/signinsignup">Bejelentkezés</Link>
          </div>
        }
        {isLoggedIn &&
          <Button onClick={giveNumber}>
            <Link to='/shoplist' className='shoplist'>
              <i className="fas fa-shopping-basket"></i>
              <p>Hiányos receptek: {shoplist !== null ? shoplist.filter(recipe => recipe.pieces.some(piece => !piece.done)).length : 0}</p>
            </Link>
          </Button>
        }
      </div>
    </StyledNavbar>
  )
}

const StyledNavbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 5rem;
  z-index: 10;

  .logo {
    height: 100%;
    width: 10rem;
    font-size: 2.5rem;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${orangeColorPalette.lightBg};
    &:hover {
      color: ${orangeColorPalette.darkBg}
    }
  }

  .right-side {
    display:flex;
    align-items: center;
    height: 5rem;
    gap: .5rem;

    .profile {
      position: relative;
      padding: 0 2rem;
      height: 2.5rem;
      border-radius: .25rem;
      background-color: ${orangeColorPalette.lightBg};
      color: black;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all .25s;
      cursor: pointer;
      &:hover {
        background-color: ${orangeColorPalette.darkBg};
        a{
          color: white;
        }
      }
      a{
        color: black;
        text-decoration: none;
        transition: all .25s;
      }
      .profile-menu {
        transition: .25s all;
        width: 100%;
        display: flex;
        flex-direction: column;
        transform: scaleY(1);
        transform-origin: top;
        max-height: auto;
        position: absolute;
        top: 2.5rem;
        background-color: ${orangeColorPalette.lightBg};
        left: 0;
        overflow: hidden;
        &.hide {
          transform: scaleY(0);
        }
        .profile-menu-item {
          cursor: pointer;
          width: 100%;
          display: flex;
          justify-content: center;
          text-decoration: none;
          color: black;
          padding: .5rem;
          background-color: ${orangeColorPalette.velvet};
          transition: .25s all ease;
          &:hover {
            color: white;
            background-color: ${orangeColorPalette.darkBg};
          }
        }
      }
    }
  }

  .shoplist {
    i {
      font-size: 1.8rem;
    }
    text-decoration: none;
    color: black;
    height: 100%;
    font-size: 1.1rem;

  }
`;

export default Navbar;