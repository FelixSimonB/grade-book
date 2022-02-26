import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from  'next/router'
import { connect } from 'react-redux'
import { logout } from '../../reducers/account/accountActions'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { MENU, LOGO } from '/utility/constants/menu' 
import { getFullname } from '../../utility/helpers/helperfunction'

const Navbar = (props) => {
    const { accountData, logout } = props
    const router = useRouter()
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)

    useEffect(() => {
        setAnchorElUser(null)
        setAnchorElNav(null)
    }, [accountData?.isLoggedIn])

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }
    
    const handleCloseNavMenu = (event, url) => {
        setAnchorElNav(null)
        if(url !== 'backdropClick') router?.push(url)
    }

    const handleCloseUserMenu = (event, url) => {
        setAnchorElUser(null)
        if(url !== 'backdropClick') router?.push(url)
    }

    const handleLogout = async (event) => {
        if(accountData?.isLoggedIn) {
            await logout()
            router.push('/')
        } else {
            router.push('/login')
        }
    }
    
    return (
        <>
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar>
                    <Box
                        sx={{ mr: 10, display: { xs: 'none', md: 'flex' } }}
                    >
                        <img src={LOGO.captionBg} alt="logo" style={{ width: '60px' }}/>
                    </Box>

                    {/* MOBILE VIEW */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            { MENU.pages.map((page, index) => (
                                page.loginRequired &&
                                accountData?.isLoggedIn &&
                                    <MenuItem key={index}
                                        onClick={ (event) => handleCloseNavMenu(event, page?.url) }>
                                        <Typography className='navItem' textAlign="center">
                                            {page.title}
                                        </Typography>
                                    </MenuItem> ||
                                !page.loginRequired &&
                                    <MenuItem key={index}
                                        onClick={ (event) => handleCloseNavMenu(event, page?.url) }>
                                        <Typography className='navItem' textAlign="center">
                                            {page.title}
                                        </Typography>
                                    </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        <img src={LOGO.caption} alt="logo" style={{ width: '58px' }}/>
                    </Box>
                    {/* END */}

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {MENU.pages.map((page, index) => (                            
                            page.loginRequired &&
                            accountData?.isLoggedIn &&
                                <Button
                                    key={index}
                                    onClick={ (event) => handleCloseNavMenu(event, page?.url)}
                                    sx={{ my: 2, color: 'white', display: 'block', mr: 4 }}
                                >
                                    {page.title}
                                </Button> ||
                            !page.loginRequired &&
                                <Button
                                    key={index}
                                    onClick={ (event) => handleCloseNavMenu(event, page?.url)}
                                    sx={{ my: 2, color: 'white', display: 'block', mr: 4 }}
                                >
                                    {page.title}
                                </Button>
                        ))}
                    </Box>
                    {
                        accountData?.isLoggedIn &&
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title={getFullname(accountData?.loggedInUser?.firstname, accountData?.loggedInUser?.lastname)}>
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>                                
                                        <Avatar
                                            sx={{ bgcolor: 'secondary.main' }}
                                            alt={getFullname(accountData?.loggedInUser?.firstname, accountData?.loggedInUser?.lastname)}
                                            src="/" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {MENU.settings.map((setting, index) => (
                                        <MenuItem key={index}
                                            onClick={ (event) => handleCloseUserMenu(event, setting?.url)}>
                                            <Typography textAlign="center">
                                                {setting.title}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                    <MenuItem
                                        onClick={ () => handleLogout() }>
                                        <Typography textAlign="center">
                                            {'Logout'}
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        accountData: state.accountReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Navbar)