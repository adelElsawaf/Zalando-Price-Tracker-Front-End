import { Link, useLocation, useRoutes } from "react-router-dom";
import '../Styles/main.css'

export default function Navbar() {
    const location = useLocation()
    return (
        <>
            <nav className="container navbar navbar-expand-lg navbar-light bg-light  border-bottom border-1 border-grey">
                <ul className="navbar-nav ms-3">
                    <li className="nav-item h5">
                        <Link to="/" className={(location.pathname == "/" ? "text-decoration-underline orange " : "") + "nav-link  text-captalized  "}>Home</Link>
                    </li>
                </ul>
            </nav>

        </>
    )
}