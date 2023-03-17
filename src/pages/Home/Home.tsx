import "./Home.css";
import { useNavigate } from "react-router-dom";

type Props = {}

const Home = (props: Props) => {

    //create function navigate
    const navigate = useNavigate();
    return (
        <main className="home">
            <section className="welcome">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#273444" fillOpacity="1" d="M0,32L21.8,37.3C43.6,43,87,53,131,85.3C174.5,117,218,171,262,165.3C305.5,160,349,96,393,90.7C436.4,85,480,139,524,176C567.3,213,611,235,655,245.3C698.2,256,742,256,785,256C829.1,256,873,256,916,218.7C960,181,1004,107,1047,106.7C1090.9,107,1135,181,1178,181.3C1221.8,181,1265,107,1309,74.7C1352.7,43,1396,53,1418,58.7L1440,64L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></path></svg>
                <div className="image">
                    <img src="images/desktop-exemple-mac.png" alt="from Vectonauta in Freepik" />
                </div>
                <div className="message">
                    <p>
                        Keep track of all your tasks in an easy way. Create reports of
                        time spent on each task and efficiently calculate the value
                        of your working hour.
                    </p>
                    <button className="btn" onClick={() => navigate("/register")}>Start Now</button>
                </div>
            </section>
        </main>
    )
}

export default Home