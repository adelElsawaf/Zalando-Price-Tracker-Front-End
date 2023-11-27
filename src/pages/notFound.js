import { Link } from "react-router-dom";

export default function NotFound(){
    return(
        <>
            <div className="align-items-center d-flex flex-column ">
            <h1 >Page Not Found ! </h1>
            <h4>Please Go Back To <Link to={'/'}> Home Page</Link></h4>
            </div>
        </>
    )
}