import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import AllInclusiveIcon from '@material-ui/icons/AllInclusive'
import FunctionsIcon from '@material-ui/icons/Functions'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MenuIcon from '@material-ui/icons/Menu'
import clsx from 'clsx'
import Link from 'next/link'
import React, { useState } from 'react'

import Copyleft from './Copyleft'


const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
)

const navLinks: Array<{ link: string, text: string }> = [
  {
    link: '/health/bmi',
    text: 'BMI'
  },

  {
    link: '/business/vat-number',
    text: 'VAT Number'
  },

  {
    link: '/converters/angles',
    text: 'Angles'
  },

  {
    link: '/converters/data-storage',
    text: 'Data Storage'
  },

  {
    link: '/converters/energy',
    text: 'Energy'
  },

  {
    link: '/converters/force',
    text: 'Force'
  },

  {
    link: '/converters/length',
    text: 'Length'
  },

  {
    link: '/converters/mass',
    text: 'Mass'
  },

  {
    link: '/converters/power',
    text: 'Power'
  },

  {
    link: '/converters/pressure',
    text: 'Pressure'
  },

  {
    link: '/converters/surface-area',
    text: 'Surface Area'
  },

  {
    link: '/converters/temperature',
    text: 'Temperature'
  },

  {
    link: '/converters/time',
    text: 'Time'
  },

  {
    link: '/converters/volume',
    text: 'Volume'
  },
]

const Layout: React.FC = ({ children }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(true)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <IconButton
              color="inherit"
            >
              <AllInclusiveIcon />
            </IconButton>
            Calculators
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {navLinks.map(({ link, text }, index) => (
            <Link href={link} passHref key={index}>
              <ListItem button>
                <ListItemIcon>
                  <FunctionsIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="sm">
          <>
            {children}
          </>
        </Container>
      </main>

      {/* Footer */}
      <footer>
        <Typography variant="h6" align="center" gutterBottom>Calculators</Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Compute what you want
        </Typography>
        <Copyleft />
      </footer>
      {/* End footer */}
    </>
  )
}

export default Layout
