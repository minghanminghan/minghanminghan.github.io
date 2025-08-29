'use client'


import { Box, Typography } from "@mui/material"
import { useViewContext } from "../../context/ViewContext"
import Image from "next/image"
import StackUI from "@/components/StackUI"
import { useState } from "react"

export default function Page() {
    const { setActive } = useViewContext()
    setActive('Home')

    const [srcNumber, setSrcNumber] = useState(0)

    return(
    <Box
        p={3}
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
                marginLeft={29}
            >
                <Image
                    src={`/headshot${srcNumber}.jpg`}
                    alt='headshot'
                    width='300'
                    height='300'
                    onClick={() => setSrcNumber((srcNumber + 1) % 2)}
                />
            </Box>
            <Typography>
                Hi! I’m Andrew, a software engineer based in NYC.
            </Typography>
            <Typography>
                I'm a senior at NYU studying Computer Science, Mathematics, and Psychology.
            </Typography>
            <Typography>
                I recently interned at Disney as a Software Engineer, where I built AI solutions for the Customer Service Tooling team.
            </Typography>
            <Typography>
                I'm experienced in working with web apps and technologies through internship, hackathon, and project experiences.
            </Typography>
            <Typography>
                I'm passionate about machine learning, and have been building out deep learning and agentic systems in my free time.
            </Typography>
            <Typography>
                I'm always excited to learn, collaborate, and build- feel free to reach out and contact me!
            </Typography>
        </StackUI>
    </Box>
    )
}