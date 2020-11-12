import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import LeftMenu from '../components/Nav/LeftMenu/LeftMenu';
import Logo from '../components/Nav/Logo';
import styled from 'styled-components';
import RightMenu from '../components/Nav/RightMenu/RightMenu';
import { on_setting_button } from '../redux/modules/nav';
import { modal } from '../redux/modules/portal';
import { useSelector } from 'react-redux';
import Portal from '../Portal';
import { logout } from '../redux/modules/auth';

const NavigationContainer = styled.div`
  padding: 20px 20px;
  border-bottom: 10px solid rgba(87, 212, 191, 0.89);
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 13vh;
  box-sizing: border-box;
  > div {
    flex: 1;
    display: flex;
  }

  > div svg:hover {
    fill: #ff7b57;
  }

  > div:first-of-type {
    justify-content: flex-start;
  }

  > div:nth-of-type(2) {
    justify-content: center;
  }

  > div:last-of-type {
    justify-content: flex-end;
  }

  &::after {
    content: '';
    width: 100%;
    height: 10px;
    display: block;
    background: #fff235bf /*#ccff3bbf #ffeb3bbf*/;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;
/**
 *
 */
function NavContainer({ location }) {
  const { isActive, PortalCompo } = useSelector(({ portal }) => ({
    isActive: portal.isActive,
    PortalCompo: portal.portalCompo,
  }));
  const { isLogged, username } = useSelector(({ auth }) => ({
    isLogged: auth.isLogged,
    username: auth?.username,
  }));
  const dispatch = useDispatch();
  const onSettingButton = useCallback(
    (kinds, state, value) => dispatch(on_setting_button(kinds, state, value)),
    [dispatch],
  );
  const onModal = useCallback((state, compo) => dispatch(modal(state, compo)), [
    dispatch,
  ]);
  const onLogout = useCallback(() => dispatch(logout()), [dispatch]);

  // useEffect(() => {
  //   console.log(user);
  //   if (user?.username && user?.password) {
  //     const body = user;
  //     Axios.post(`http://localhost:4000/users/signin`, body).then((res) =>
  //       localStorage.setItem('dw-user', res.token),
  //     );
  //   }
  // }, [user]);

  return (
    <>
      <NavigationContainer>
        <LeftMenu
          onSettingButton={onSettingButton}
          isLogged={isLogged}
          onModal={onModal}
          location={location}
        />
        <Logo />
        <RightMenu
          onModal={onModal}
          isLogged={isLogged}
          username={username}
          onLogout={onLogout}
        />
      </NavigationContainer>
      {isActive && (
        <Portal>
          <PortalCompo />
        </Portal>
      )}
    </>
  );
}

export default NavContainer;
