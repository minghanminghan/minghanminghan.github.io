import '../css/App.css';
import NavBar from '../components/NavBar';
import Project from '../components/Project';

export default function Work() {

    /* projects: spendwisely, harmonize, aimlearn, data display, abelian sandpile */
    /* props outline: name, start, end, logo, desc, stack, source */
    return (
    <div>
        <NavBar />
        <div className="main">
            <div className="work wrapper">
                <Project info={{
                    name: 'SpendWisely',
                    desc: 'Personal finance advising app built for the UPenn Hackathon',
                    stack: 'Next.js, Flask, Defang, PropelAuth',
                    libs: 'Chart.js, d3, Pandas, Bootstrap, NewsAPI',
                    source: 'https://devpost.com/software/spendwise-5ytj6r',
                }}/>
                <Project info={{
                    name: 'Harmonize',
                    desc: 'Tinder for music mobile app built for the 2024 TikTok Tech Jam',
                    stack: 'React Native, Rust, PostgreSQL, scikit-learn',
                    libs: 'Spotify API, Pandas, Docker',
                    source: 'https://devpost.com/software/harmonize-ejs6xo',
                }}/>
                <Project info={{
                    name: 'Neural Data Display',
                    desc: 'Internship app that renders observed activity from up to 128 neurons',
                    stack: 'React',
                    libs: 'd3, NumPy',
                    source: 'https://github.com/minghanminghan/data_display',
                }}/>
                <Project info={{
                    name: 'AIMLearn',
                    desc: 'Empathetic, multimodal AI tutor built for HackPrinceton',
                    stack: 'Next.js, Express.js',
                    libs: 'Hume API, OpenAI API',
                    source: 'https://devpost.com/software/aimlearn',
                }}/>
                <Project info={{
                    name: 'Conway\'s Game of Life',
                    desc: 'PyGame implementation of Conway\'s Game of Life',
                    stack: 'Python',
                    libs: 'PyGame',
                    source: 'https://github.com/minghanminghan/conway_game_of_life',
                }}/>
            </div>
        </div>
    </div>
    );
}