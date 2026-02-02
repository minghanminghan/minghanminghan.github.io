'use client'

import { Box, Typography } from "@mui/material"
import { useViewContext } from "../../context/ViewContext"
import Image from "next/image"
import StackUI from "@/components/StackUI"
import { useState } from "react"
import Link from "next/link"
import { SELF_INTRO } from "@/constants/home"

export default function Page() {
    const { setActive } = useViewContext()
    setActive('Home')

    const [srcNumber, setSrcNumber] = useState(0)
    const INTRO = SELF_INTRO.map((v, i) => 
    <Typography key={i} sx={{ maxWidth: '100%', mx: 'auto' }}>
        {v}
    </Typography>)

    return(
    <Box
        width='100%'
        display='flex'
        alignItems='center'
        alignContent='center'
        flexDirection='column'
    >
        <Box justifyItems='center'>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
            Welcome!
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Drag blocks to reorder
            </Typography>
        </Box>
        <StackUI>
            <Box
                sx={{
                    width: 'fit-content',
                    cursor: 'pointer',
                    mx: 'auto'
                }}
            >
                <Image
                    src={`/headshot${srcNumber}.jpg`}
                    alt='headshot'
                    width='300'
                    height='300'
                    onClick={() => setSrcNumber((srcNumber + 1) % 2)}
                />
            </Box>
            {INTRO}
        </StackUI>
    </Box>
    )
}