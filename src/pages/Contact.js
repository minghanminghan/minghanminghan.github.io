import '../css/App.css';
import NavBar from '../components/NavBar';
import * as emailjs from '@emailjs/browser';
import { useState } from 'react';

export default function Contact() {

  const [form, setForm] = useState(
    <><p className="content center">Send me an email!</p>
    <form onSubmit={async (e) => {await sendMail(e)}}>
      <div className="contentLeft">
        <label htmlFor="name">Name</label><br/>
        <input className="short" id="name" required /><br/><br/>
      </div>
      <div className="contentLeft">
        <label htmlFor="email">Email</label><br/>
        <input className="short" id="email" type="email" required /><br/><br/>
      </div>
        <br/><textarea className="long" id="message" required /><br/><br/>
      <button type="submit">Submit</button>
    </form></>);

  const mail = emailjs.init({
    publicKey: 'oBlUyL9NjyjRp5I6S',
    // Do not allow headless browsers
    blockHeadless: true,
    blockList: {
      // Block the suspended emails
      // list: ['foo@emailjs.com', 'bar@emailjs.com'],
      // The variable contains the email address
      // watchVariable: 'userEmail',
    },
    limitRate: {
      // Set the limit rate for the application
      id: 'app',
      // Allow 1 request per 10s
      throttle: 10000,
    },
  });

  async function sendMail(e) {
    e.preventDefault();
    const form = {
      'name': e.target.name.value,
      'email': e.target.email.value,
      'message': e.target.message.value,
    }
    emailjs.send('service_1pswovc', 'template_tk1084b', form)
    .then(res => {
      setForm(<p className="content" style={{marginLeft:"9vw"}}>Email sent. Thank you!</p>);
    })
    .catch(err => {console.log(err)});
  }

  return (
    <div>
        <NavBar />
        <div className="contact" id="main">
          { form }
        </div>
    </div>
  );
}