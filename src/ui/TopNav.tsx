'use client'

import { Views, useViewContext } from '../context/ViewContext'
import { Box, Typography, Link, Paper } from '@mui/material'
import Header from './Header'

export default function TopNav() {
    const { active } = useViewContext()
    
    return (
    <Paper
        sx={{
            paddingX: 5,
            paddingY: 2,
        }}
    >
    <Box
        display='flex'
        flexDirection='row'
        gap={125}
        justifyContent='center'
    >
        <Header/>
        <Box
            gap={5}
            display='flex'
            flexDirection='row'
            // alignItems='center'
        >
            {Views.map((v, i) =>
                <Link
                    href={`/${v.toLowerCase()}`}
                    key={i}
                >
                <Typography 
                    variant="h2"
                    sx={{ textDecoration: v === active ? 'underline' : 'none' }}
                >
                    {v}
                </Typography>
                </Link>
            )}
        </Box>
    </Box>
    </Paper>
    )
}