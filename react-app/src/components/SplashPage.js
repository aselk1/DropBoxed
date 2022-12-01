import HomePage from "./images/HomePage.png";

const Splash = () => {
  return (
    <div className="flexCol alignCenter splashBack">
      <div className="splashBack2">
        <h2 className="fontHead3">
          Join over 700 million registered users who trust DropBoxed
        </h2>
        <h3 className="fontHead4">
          Easy to use, reliable, private, and secure. It’s no wonder DropBoxed is
          the choice for storing and sharing your most important files.
        </h3>
      </div>
        <img src={HomePage} className="homePage"></img>
    </div>
  );
};

export default Splash;
