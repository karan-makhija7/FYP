

import React from "react";
import { Card } from "react-bootstrap";
import Sidebar from "../../components/sidebar/Sidebar";

import './contact.css'
function Contact({ user }) {
  const [message, setMessage] = React.useState("");
  
  const handleChange = (e) => {
  setMessage(e.target.value);
  };
  
  const handleSend = () => {
  const subject = "Query";
  const body = encodeURIComponent(message);
  const from = encodeURIComponent(user.email);
  const mailtoString = `mailto:karan22makhija@gmail.com?subject=${subject}&body=From: ${from}%0D%0A%0D%0A${body}`;
  window.open(mailtoString, "_blank");
  window.alert("Email has been sent or is being prepared to send.");
  };

  return (



    
    <div className="home">
      <Sidebar />
      <div className="homeContainer" id="contactid">


      <Card>
        <Card.Body>
        <h2 >Contact</h2>
      <form action="https://formsubmit.co/karan22makhija@gmail.com" method="POST">
<div class="form-group">
<label for="firstName"> First Name </label>
<input type="text" id="firstName" name="firstName"/>
</div>

<p></p>

<div class="form-group">
<label for="latsName">Last Name </label>
<input type="text" id="lastName" name="lastName"/>
</div>

<p></p>

<div class="form-group">
<label for="contact">Contact &nbsp; &nbsp; </label>
<input type="contact" id="contact" name="contact"/>
</div>

<p></p>

<div class="form-group">
<label for="email">Email  &nbsp;  &nbsp;  &nbsp;  &nbsp;  </label>
<input type="email" id="email" name="email"/>
</div>

<p></p>
Message
<p></p>
<div class="form-group">

<textarea name="message" id="message" cols="30" rows="10"></textarea>
</div>
<p></p>
<button type="submit">Submit</button>
</form>
</Card.Body>
</Card>
</div>
</div>
  );
}

export default Contact;
