import '../css/App.css';
import NavBar from '../components/NavBar';

export default function Home() {

  /*
  <p>Experience</p>
  <p>Frameworks</p>
  <p>Interests</p>
  <p>Hobbies</p>
  */
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
              <br/>I'm interested in all things software and technical, including software engineering, machine learning, full stack development, and hackathons.
              <br/>If anything interests you please out!
            </p>
          </div>
        </div>
    </div>
  );
}