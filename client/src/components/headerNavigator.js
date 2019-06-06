import React from 'react';
import 'bootstrap';
import {Button, Navbar, NavbarBrand} from 'reactstrap';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {Link, withRouter} from 'react-router-dom';
import {slide as Menu} from 'react-burger-menu';
import menuIcon from '../images/burg.png';
import menuClose from '../images/close.png';
import iconLogin from '../images/menu/signin.png';
import iconLogout from '../images/menu/signout.png';
import iconHome from '../images/menu/location.png';
import iconGroup from '../images/menu/group.png';
import iconTest from '../images/menu/test.png';
import iconAdd from '../images/menu/add.png';
import iconArrow from '../images/menu/send.png';
import './header.css';

@withRouter
@observer
export default class HeaderNavigation extends React.Component {
  static contextTypes = {
    router: () => null
  };

  @observable menuOpen = false;

  constructor(props) {
    super(props);
  }

  closeMenu(menuID) {
    if (menuID === 99) {
      localStorage.removeItem('accessMode');
      localStorage.removeItem('userId');
    }
    this.menuOpen = false;
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  buildMenuItem(menuID, menuLink, menuIcon, menuCaption) {
    return (
      <Link onClick={() => this.closeMenu(menuID)}
            className={menuID === 99 ? "menu-item border-top" : "menu-item"} to={menuLink}>
        <img src={menuIcon} className="menu-icon"/>
        <span className="m-3">{menuCaption}</span>
      </Link>
    )
  }

  buildDefaultMenu() {
    return (
      <div className="burger">
        <Menu overlayClassName={"overlay"} customBurgerIcon={<img src={menuIcon}/>}
              customCrossIcon={<img src={menuClose}/>} right
              width='20%' height="100%" isOpen={this.menuOpen}>
          {this.buildMenuItem(99, "/login", iconLogin, "Вход")}
        </Menu>
      </div>
    )

  }

  buildUserMenu(username) {
    return (
      <div className="burger">
        <Menu overlayClassName={"overlay"} customBurgerIcon={<img src={menuIcon}/>}
              customCrossIcon={<img src={menuClose}/>}
              right
              width='20%' height="100%" isOpen={this.menuOpen}>
          {this.buildMenuItem(99, "/login", iconLogout, "Выход")}
        </Menu>
      </div>
    );
  }

  buildAdminMenu(username) {
    return (
      <div className="burger">
        <Menu overlayClassName={"overlay"} customBurgerIcon={<img src={menuIcon}/>}
              customCrossIcon={<img src={menuClose}/>}
              right
              width='20%' height="100%" isOpen={this.menuOpen}>
          {this.buildMenuItem(1, "/admin/groups", iconGroup, "Список групп")}
          {this.buildMenuItem(2, "/admin/creation", iconTest, "Добавить тесты")}
          {this.buildMenuItem(3, "/newQuestion", iconAdd, "Добавить вопросы")}
          {this.buildMenuItem(99, "/login", iconLogout, "Выход")}
        </Menu>
      </div>
    );
  }

  createBackButton(path) {
    const pagesForBackButton = [
      /messages[\/]\w/,
      /manager[\/]\w/,
      /client[\/]\w/,
      /tariffs[\/]\w/
    ];
    let pos = pagesForBackButton.some((element) => {
      return element.test(path) ? true : false;
    });
    if (pos) {
      return <div>
        <Button color="primary" className="header-icon"
                onClick={this.context.router.history.goBack}>
          <img src={iconArrow} className="rotate-90"/>
        </Button>
      </div>
    } else {
      return null;
    }
  }

  render() {
    //return button if needed
    const currentRoute = this.props.location.pathname;
    if (currentRoute === '/login') return (<div></div>);
    let backButton = this.createBackButton(currentRoute);
    let fullName = localStorage.getItem("fullName");
    let username = null;
    let menu = null;
    let accessMode = localStorage.getItem('accessMode');
    if (accessMode !== null) {
      menu = (accessMode === '1' ? this.buildAdminMenu(username) : this.buildUserMenu(username));
    } else (
      menu = this.buildDefaultMenu()
    );

    return (
      <Navbar className="bg-primary header-shadow header-core" expand="sm" fixed="top">
        <div className="labelFullName">
          {fullName}
        </div>
        <NavbarBrand className="text-white header-navigator font-weight-bold">
          {backButton}
        </NavbarBrand>
        <div>
          {menu}
        </div>
      </Navbar>
    )
  }
}
