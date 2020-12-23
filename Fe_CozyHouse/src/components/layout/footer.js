import React from "react";
import instagramIcon from "./instagram.png";
import facebookIcon from "./facebook.png";
import youtubeIcon from "./youtube.png";
import locationPin from "./location-pin.png";
import round_call from "./round_call.png";



import "../../css/footer.css";



const Footer = () => {
  return (
    <div className="footer">
     


      
      <div className="aboutUse">
        <div className="cosyHome"><h2>CozyHome</h2></div>
        <div className="enhance"><p>Nâng tầm trải nghiệm tìm nhà</p></div>
      </div>
      <div className="founder">
        <h4>Our Team</h4>
        <ul>
          <li className="b"><i class="material-icons icon person">person</i> Võ Lương Bằng</li>
          <li className= "t"><i class="material-icons icon person">person</i> Lưu Thị Hoài Thu</li>
          <li className="v"><i class="material-icons icon person">person</i> Đỗ Ngọc Thanh Vân</li>
        </ul>
      </div>
      <div className="contact">
        <h4>Contact</h4>
        <ul>
          <li>
            <i class="material-icons">edit_location</i>
            Số 22 Thành Công - Ba Đình - Hà Nội
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
