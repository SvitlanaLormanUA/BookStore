import { Link, useNavigate } from "react-router-dom";
import { SeeMoreButtonProps } from "../interfaces/SeeMoreButtonProps";
export default function SeeMoreButton( {forLink}: SeeMoreButtonProps) {

    const navigate = useNavigate();

const goToOtherBookPage = () => {
    navigate(`/books/${forLink}`);
};
    return (

        
        <div className="see-more-button-container">
                 <button className="see-more-button" onClick={goToOtherBookPage}>See More</button>
          
        </div>
    );
}
