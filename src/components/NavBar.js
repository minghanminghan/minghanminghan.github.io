import { useNavigate } from "react-router";
import "../css/NavBar.css";

export default function NavBar() {
    
    const navigate = useNavigate();

    function handleClick(dest) {
        navigate('../'+dest);
    }

    function openTab(dest) {
        window.open(dest, '_blank').focus();
    }

    return (
        <div className="navbar wrapper">
            <div className="navbar wrapper">
                <p className="logo" id="logo">Andrew Jiang</p>
                <div className="navbar wrapper child" id="icons">
                    <img src="github.png" alt="github" className="link icon" onClick={() => {openTab("https://www.github.com/minghanminghan")}}></img>
                    <img src="linkedin.png" alt="linkedin" className="link icon" onClick={() => {openTab("https://www.linkedin.com/in/andrewminghanjiang")}}></img>
                </div>
            </div>
            <div className="navbar wrapper child">
                <p className="link" id="/" onClick={(e) => {handleClick(e.target.id)}}>About</p>
                <p className="link" id="work" onClick={(e) => {handleClick(e.target.id)}}>Work</p>
                <p className="link" id="contact" onClick={(e) => {handleClick(e.target.id)}}>Contact</p>
                <p className="link" id="resume" onClick={(e) => {openTab('https://drive.google.com/file/d/16Wz2klpxsVC1WGUVK_pmd6HSyFx9_hE3/view?usp=drive_link')}}>Resume</p>
            </div>
        </div>
    );
}