import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h3>Addis Eats</h3>
          <p>
            Sharing traditions from the Ethiopian highlands — one Gursha at a
            time.
          </p>
        </div>

        <div>
          <h3>Hospitality Hours</h3>
          <p>Tuesday – Sunday: 11:30 AM – 11:00 PM</p>
          <p>Monday: Reserved for Private Banquets</p>
        </div>

        <div>
          <h3>Dietary traditions</h3>
          <p>Vegan Fasting (Beyaynetu / Tsom)</p>
          <p>Traditional Prime Meat Feasts</p>
          <p>House Tej (Pure Honey Wine)</p>
          <p>Jebena Buna Roasting Ceremony</p>
        </div>

        <div>
          <h3>Addis location</h3>
          <p>Bole Medhanialem, Addis Ababa & express delivery across town.</p>
          <p>+251 911 234 567</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
