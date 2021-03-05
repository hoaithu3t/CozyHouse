import React from "react";
import "../../css/footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="aboutUse">
        <div className="cosyHome">
          <h2>CozyHome</h2>
        </div>
        <div className="enhance">
          <p>Enhance the home search experience</p>
        </div>
      </div>
      <div className="founder">
        <h4>Our Team</h4>
        <ul>
          <li className="b">
            <i class="material-icons icon person">person</i> Vo Luong Bang
          </li>
          <li className="t">
            <i class="material-icons icon person">person</i> Luu Thi Hoai Thu
          </li>
          <li className="v">
            <i class="material-icons icon person">person</i> Do Ngoc Thanh Van
          </li>
        </ul>
      </div>
      <div className="contact">
        <h4>Contact</h4>
        <ul>
          <li>
            <i class="material-icons">edit_location</i>
            144 Xuan Thuy - Cau Giay - Ha Noi
          </li>
          <li>
            <i class="material-icons">phone_iphone</i>
            Phone: 0909767654
          </li>
          <li>
            <i class="material-icons">email</i>
            Email: email@gmail.com
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
