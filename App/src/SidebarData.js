import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import BusinessIcon from '@material-ui/icons/Business';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import ShowChartIcon from '@material-ui/icons/ShowChart';

export const SidebarData = [
    {
        title: "Dashboard",
        icon: <HomeIcon />,
        link: "/"
    },
    {
        title: "Company List",
        icon: <BusinessIcon />,
        link: "/companies"
    },
    {
        title: "New Company",
        icon: <InsertDriveFileIcon />,
        link: "/newPortfolio"
    },
    {
        title: "My Portfolio",
        icon: <CardTravelIcon />,
        link: "/portfolio"
    },
    {
        title: "Model Description",
        icon: <ShowChartIcon />,
        link: "/about"
    },
]
