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
        description: 'Swing trader that uses LSTM forecasting to trade over the S&P 100',
        source: 'https://github.com/minghanminghan/stock-trader',
    },
    {
        name: 'Deep learning chess bot',
        description: 'Chess bot using neural networks without search inspired by Leela Chess Zero',
        source: 'https://github.com/minghanminghan/chess-bot'
    },
    {
        name: 'Agentic browser assistant',
        description: 'LLM assistant browser extension with web search and provider customization',
        source: 'https://github.com/minghanminghan/browser-agent',
        // website: '', // TODO: add chrome web store link here
        // _blank: true
    },
    {
        name: 'Hands-on data exploration tool',
        description: 'Uses hand movements to view and control data (toggle series, rescale time series, make annotations)',
        source: 'https://github.com/minghanminghan/HackNYU/tree/v2.1',
    },
    {
        name: 'Harmonize',
        description: 'Music discovery app',
        source: 'https://github.com/minghanminghan/tiktok-techjam-2024',
    },
    {
        name: 'Ascii Art',
        description: 'Video stream into ascii visualization',
        source: 'https://github.com/minghanminghan/ascii-art',
        website: '/projects/ascii-art',
        _blank: false,
    },
    {
        name: 'minghanminghan.github.io',
        description: '',
        source: 'https://github.com/minghanminghan/minghanminghan.github.io',
        website: '/home',
        _blank: false,
    },
]