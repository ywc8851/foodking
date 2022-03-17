import { useState, useCallback, Fragment, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Modal from '@/components/Modal';
import logo from '@/assets/img/logo.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import {
  headerLink,
  headerStyle,
  liSpan,
  liSpanMain,
  searchDiv,
  searchDivNone,
  searchIcon,
} from './Header.styled';

const Header = () => {
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isMainPage, setIsMainPage] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const { pathname } = useLocation();
  console.log(pathname);

  useEffect(() => {
    setShowHeader(!(pathname === '/page-not-found'));
    pathname === '/' ? setIsMainPage(true) : setIsMainPage(false);
  }, [pathname]);

  return (
    <Fragment>
      {showHeader && (
        <header css={headerStyle}>
          <a href="/">
            <img src={logo} alt="먹대장 로고" />
          </a>
          <div css={isMainPage ? searchDivNone : searchDiv}>
            <FontAwesomeIcon icon={faMagnifyingGlass} css={searchIcon} />
            <input placeholder="지역, 식당 또는 음식"></input>
          </div>
          <ul>
            <li>
              <Link to="/matjib_list" css={headerLink}>
                <span css={isMainPage ? liSpanMain : liSpan}>맛집 리스트</span>
              </Link>
            </li>
            <li>
              <Link to="/" css={headerLink}>
                <span css={isMainPage ? liSpanMain : liSpan}>술집 리스트</span>
              </Link>
            </li>
          </ul>
          <div>
            <button>
              <FontAwesomeIcon
                icon={faUser}
                size="2x"
                onClick={onClickToggleModal}
              />
            </button>
          </div>
        </header>
      )}
      {isOpenModal && <Modal onClickToggleModal={onClickToggleModal}></Modal>}
    </Fragment>
  );
};

export default Header;
