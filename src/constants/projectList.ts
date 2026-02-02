export type Project = {
    name: string
    description: string
    source: string
    website?: string
    _blank?: boolean     // true: open website in new tab on click
}

export const Projects: Project[] = [
    {
        name: 'Algorithmic stock trader',
        description: 'Deep neural net stock trader trained on S&P 500 historical data',
        source: 'https://github.com/minghanminghan/trader',
    },
    {
        name: 'Chess bot',
        description: '2200 ELO chess bot trained using RL from self-play, inspired by AlphaZero (https://arxiv.org/pdf/1712.01815)',
        source: 'https://github.com/minghanminghan/chess-bot'
    },
    {
        name: 'Hands-on data exploration tool',
        description: 'Uses hand movements to view and control data (toggle series, rescale time series, make annotations)',
        source: 'https://github.com/minghanminghan/HackNYU/tree/v2.1',
    },
    {
        name: 'Ascii Art',
        description: 'Video stream into ascii visualization',
        source: 'https://github.com/minghanminghan/ascii-art',
        website: '/projects/ascii-art',
        _blank: false,
    },
    {
        name: 'andrewminghanjiang.com',
        description: '',
        source: 'https://github.com/minghanminghan/minghanminghan.github.io',
        website: '/home',
        _blank: false,
    },
]