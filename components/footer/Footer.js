import { ArrowRight } from '@mui/icons-material';
import Link from 'next/link';
import React from 'react'

const Footer = () => {
  return (
    <div className="hi-footer">
      <footer class="footer">
        <div class="container">
          <div class="row">
            <div class="footer-col">
              <h4>company</h4>
              <ul>
                <li>
                  <Link href="#about">about me</Link>
                </li>
                <li>
                  <Link href="#">my services</Link>
                </li>
                <li>
                  <Link href="#">privacy policy</Link>
                </li>
                <li>
                  <Link href="#">affiliate program</Link>
                </li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>get help</h4>
              <ul>
                <li>
                  <Link href="/faq">FAQ</Link>
                </li>
                <li>
                  <Link href="/help">help</Link>
                </li>

                <li>
                  <Link href="#">order status</Link>
                </li>
                <li>
                  <Link href="#">payment options</Link>
                </li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>online shop</h4>
              <ul>
                <li>
                  <Link href="#">watch</Link>
                </li>
                <li>
                  <Link href="#">custom order</Link>
                </li>
                <li>
                  <Link href="#">website</Link>
                </li>
                <li>
                  <Link href="/faq">Faq?</Link>
                </li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>follow Me</h4>

              <ul>
                <li>
                  <Link href="https://www.facebook.com/md.asikur.9047506/">Facebook</Link>
                </li>
                <li>
                  <Link href="https://github.com/Md-Asikur-Rahman2">Github</Link>
                </li>
                <li>
                  <Link href="https://www.fiverr.com/designhill24">Fiverr</Link>
                </li>
                <li>
                  <Link href="https://www.freelancer.com/u/asikurmd190">Freelancer</Link>
                </li>
                <li>
                  <Link href="https://www.upwork.com/freelancers/~015c702346fb8330d3">
                    Upwork
                  </Link>
                </li>
                <li>
                  <b>Phone/Whatsapp:</b>01893585782/01853012585
                </li>
                <li>
                  {" "}
                  <b>gmail:</b>asikurrahaman997@gmail.com
                </li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>Subscribe Me</h4>

              <div className="subscribe">
                <input placeholder="Enter Email" />
                <span>Subscribe</span>
              </div>
              {/* <ul>
                <li>
                  <b>Phone/Whatsapp:</b>01893585782
                </li>
                <li>
                  {" "}
                  <b>gmail:</b>asikurrahaman997@gmail.com
                </li>
                <li>
                  <b>Facebook:</b>https://www.facebook.com/md.asikur.9047506/
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </footer>
      <p className="center">
        created by md asikur<span>2023</span>@all Right <span>Reserved..</span>
      </p>
    </div>
  );
}

export default Footer