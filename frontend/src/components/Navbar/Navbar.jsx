import {NavLink} from 'react-router-dom';
import styles from './Navbar.module.css'
import { useSelector } from 'react-redux';
import { resetUser } from '../../store/userSlice';
import { useDispatch } from 'react-redux';
import { signout } from '../../api/internal';
function Navbar(){
    const dispatch   = useDispatch();
    const isAuthenticated =useSelector((state)=>state.user.auth);
    const isAdmin = useSelector((state) =>state.user.isAdmin);
    const handleSignout = async () => {
        await signout;
        dispatch(resetUser());
    }
    return(
        <>
        <nav className={styles.navbar}>

        <NavLink to='/'className={`${styles.logo}`}>HouseHub</NavLink>
            {isAdmin && <NavLink to='propertyReqs' className={({isActive})=> isActive ? styles.activeStyle : styles.inActiveStyle} >Dashboard</NavLink>}
            {isAuthenticated && <NavLink to='owner' className={({isActive})=> isActive ? styles.activeStyle : styles.inActiveStyle}>Become Owner</NavLink>}
            {isAuthenticated && <NavLink to='tenant' className={({isActive})=> isActive ? styles.activeStyle : styles.inActiveStyle}>Become Tenant</NavLink>}
            
            {/* <NavLink to='blogs' className={({isActive})=> isActive ? styles.activeStyle : styles.inActiveStyle}>Blogs</NavLink> */}
            {/* <NavLink to='submit' className={({isActive})=> isActive ? styles.activeStyle : styles.inActiveStyle}>Submit a blog</NavLink> */}
            { isAuthenticated ? <div><NavLink><button className={styles.signOutButton} onClick={handleSignout}>Sign Out</button> </NavLink> </div> : <div><NavLink to='login' className={({isActive})=> isActive ? styles.activeStyle : styles.inActiveStyle}>
                <button className={styles.logInButton}>
                Log In
                </button>
                </NavLink>
            <NavLink to='signup' className={({isActive})=> isActive ? styles.activeStyle : styles.inActiveStyle}>
                <button className={styles.signUpButton}>
                Sign Up
                </button>
                </NavLink>
                </div>}
        </nav>
        <div className={styles.separator}></div>
        </>
    )
}
export default Navbar;