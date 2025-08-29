export type Project = {
    name: string
    description: string
    source: string
    website?: string
    _blank?: boolean     // true: open website in a new tab when clicked
}

export const Projects: Project[] = [
    {
        name: 'Hands-on data exploration tool',
        description: 'Uses hand movements to view and control data (toggle series, rescale time series, make annotations)',
        source: 'https://github.com/minghanminghan/HackNYU/tree/v2.1',
    },
    {
        name: 'Harmonize',
        description: 'Spotify music discovery app',
        source: 'https://github.com/minghanminghan/tiktok-techjam-2024',
    },
    {
        name: 'Ascii Art',
        description: 'Simple visualization that converts video stream into ascii art, with a user-customizable ascii ramp',
        source: 'https://github.com/minghanminghan/ascii-art',
        website: '/ascii-art',
        _blank: false,
    },
    {
        name: 'minghanminghan.github.io',
        description: 'Personal website built with Next JS and MUI',
        source: 'https://github.com/minghanminghan/minghanminghan.github.io',
        website: '/home',
        _blank: false,
    },
]