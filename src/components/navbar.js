import styles from "../styles/navbarStyles.module.css";


function Navbar() {

    // action to show or hide navbar menu for smaller screens
    const showHideNavMenu = () => {

        // Fetch components
        const navMenu = document.getElementById('nav-menu');
        const navBtn = document.getElementById('nav-btn');

        // toggle classname to show or hide menu
        navMenu.classList.toggle(styles.show);
        navBtn.classList.toggle(styles.navBtnFocus);

    };

    return (

        // main container for navbar
      <div className={styles.navbarContainer}>

        {/* container for navbar title and toggle button on smaller screen */}
        <div className={styles.navBrandContainer}>
            <p className={styles.navTitle}>E-Bill OCR</p>

            {/* button to toggle menu on smaller screens */}
            <button id="nav-btn" onClick={ showHideNavMenu } type="button" className={styles.navBtn}>
                <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
        </div>

        {/* Menu items for navbar */}
        <div id="nav-menu" className={styles.navItemsContainer}>

            {/* navbar item */}
            <div className={styles.navItem+" "+styles.search}>
                <span className={styles.navIcon}><i className="fa-solid fa-magnifying-glass"></i></span>
                <p className={styles.menuTip}>Search</p>
            </div>

            {/* Notification item */}
            <div className={styles.navItem+" "+styles.notify}>
                <p className={styles.bellIcon}>
                    <span className={styles.navIcon}><i className="fa-regular fa-bell"></i></span>
                    <span className={styles.notificationDot}><i className="fa-solid fa-circle"></i></span>
                </p>
                <p className={styles.menuTip}>Notifications</p>
            </div>

            {/* Profile nav item */}
            <div className={styles.navItem+" "+styles.profile}>
                <span className={styles.userImgContainer}><img alt="User-Profile" src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80" /></span>
                <p className={styles.menuTip}>Profile</p>
            </div>
        </div>
        
      </div>
    );
  }
  
  export default Navbar;
  