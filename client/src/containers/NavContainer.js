import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import LeftMenu from '../components/Nav/LeftMenu/LeftMenu';
import Logo from '../components/Nav/Logo';
import styled from 'styled-components';
import RightMenu from '../components/Nav/RightMenu/RightMenu';
import { on_setting_button } from '../redux/modules/nav';
import { modal, modalProps } from '../redux/modules/portal';
import { useSelector } from 'react-redux';
import Portal from '../Portal';
import { logout } from '../redux/modules/auth';
import { is_clear } from '../redux/modules/canvas';

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

  /* > div svg:hover {
    fill: #ff7b57;
  } */

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
  @media only screen and (max-width: 430px) {
    & div:nth-of-type(2) {
      display: none;
    }
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
  const onModalProps = useCallback((obj) => dispatch(modalProps(obj)), [
    dispatch,
  ]);
  const onLogout = useCallback(() => dispatch(logout()), [dispatch]);
  const onClear = useCallback((boolean) => dispatch(is_clear(boolean)), [
    dispatch,
  ]);

  return (
    <>
      <NavigationContainer>
        <LeftMenu
          onSettingButton={onSettingButton}
          isLogged={isLogged}
          onModal={onModal}
          onModalProps={onModalProps}
          location={location}
          onClear={onClear}
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
