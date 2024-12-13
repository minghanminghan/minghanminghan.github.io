import '../css/App.css';
import NavBar from '../components/NavBar';

export default function Home() {

  return (
    <div>
        <NavBar />
        <div className="main">
          <img src="headshot2.jpg" alt="Andrew headshot" id="headshot"></img>
          <div className="mini">
            <h2>About Me</h2>
            <p className="content">
              Hi, I'm Andrew!
              <br/>I'm an NYU Junior majoring Computer Science and Math, and minoring in Psychology.
              <br/>I'm interested in all things technical, including software engineering, full stack development, machine learning, and hackathons.
              <br/>If anything interests you please reach out!
            </p>
          </div>
        </div>
    </div>
  );
}