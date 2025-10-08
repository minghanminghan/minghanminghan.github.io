'use client'

import { routes } from '@/constants/routes'
import { useViewContext } from '../context/ViewContext'
import { Box, Typography, Link, Paper } from '@mui/material'
import Header from './Header'

export default function TopNav() {
    const { active } = useViewContext()
    
    return (
    <Paper>
    <Box
        sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 2,
            px: { xs: 2, sm: 3, md: 4 },
            overflow: 'hidden'
        }}
    >
        <Header/>
        <Box
            sx={{
                gap: { xs: 1, sm: 2, md: 3 },
                display: 'flex',
                flexDirection: 'row',
                flexShrink: 0
            }}
        >
            {routes.map((v, i) =>
                <Link
                    href={`/${v.toLowerCase()}`}
                    key={i}
                >
                <Typography
                    variant="h2"
                    sx={{
                        textDecoration: v === active ? 'underline' : 'none',
                        fontSize: { xs: '1rem', sm: '1rem', md: '1rem' }
                    }}
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