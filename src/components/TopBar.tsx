import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab, { TabProps } from '@material-ui/core/Tab';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { createStyles, WithStyles } from '@material-ui/core';
import { Department } from '../services/client/TuringClient';
import Search from './Search';

const logo = require('../images/logo.svg');

interface LinkItemProps extends ListItemProps {
  to?: any,
}
const LinkItem: React.ReactType<LinkItemProps> = ListItem;

interface LinkTabProps extends TabProps{
  to?: any
}

const TabLink:React.ReactType<LinkTabProps> = Tab

const styles = (theme:any) => createStyles({
  appBar: {
    position: 'relative',
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.grey['100']}`,
    backgroundColor: 'white',

  },
  inline: {
    display: 'inline'
  },
  flex: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    }
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  productLogo: {
    display: 'inline-block',
    borderLeft: `1px solid ${theme.palette.grey['A100']}`,
    marginLeft: 32,
    paddingLeft: 24,
    [theme.breakpoints.up('md')]: {
      paddingTop: '1.5em'
    }
  },
  tagline: {
    display: 'inline-block',
    marginLeft: 10,
    [theme.breakpoints.up('md')]: {
      paddingTop: '0.8em'
    }
  },
  iconContainer: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  iconButton: {
    float: 'right'
  },
  tabContainer: {
    marginLeft: 32,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  searchContainer:{
    display: 'inline-block',
    marginLeft: 32,
    paddingLeft: 24,
    [theme.breakpoints.up('md')]: {
      paddingTop: '1.5em'
    }
  },
  tabItem: {
    paddingTop: 20,
    paddingBottom: 20,
    minWidth: 'auto'
  }
})

export interface TopBarProps extends WithStyles<typeof styles> {
  departments: Department[]
  onDepartmentSelected: Function,
  onSearch: Function
}

const TopBar = withStyles(styles)((props: TopBarProps) => {
  const [menuDrawer] = useState(false)
  const [value]= useState(0)
  const mobileMenuOpen = () => {}
  const mobileMenuClose = () => {}
  const classes = props.classes
  const departments = props.departments
  const handleChange = () => {
  }

  return (
  <AppBar position="absolute" color="default" className={classes.appBar}>
    <Toolbar>
      <Grid container spacing={24} alignItems="baseline">
        <Grid item xs={12} className={classes.flex}>
            <div className={classes.inline}>
              <Typography variant="h6" color="inherit" noWrap>
                <Link to='/' className={classes.link}>
                  <img width={20} src={logo} alt="" />
                  <span className={classes.tagline}>Material Sense</span>
                </Link>
              </Typography>
            </div>
            <React.Fragment>
                <div className={classes.iconContainer}>
                  <IconButton onClick={mobileMenuOpen} className={classes.iconButton} color="inherit" aria-label="Menu">
                    <MenuIcon />
                  </IconButton>
                </div>
                <div className={classes.tabContainer}>
                  <SwipeableDrawer anchor="right" open={menuDrawer} onClose={mobileMenuClose} onOpen={mobileMenuOpen}>
                    <AppBar title="Menu" />
                    <List>
                      {departments.map((item, index) => (
                        <LinkItem to={{}} key={index} component={Link as any}  button>
                          <ListItemText primary={item.name} />
                        </LinkItem>
                      ))}
                    </List>
                  </SwipeableDrawer>
                  <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={() => handleChange()}
                  >
                    {departments.map((item, index) => (
                      <TabLink key={index} onClick={()=>{ props.onDepartmentSelected(item) }} component={Link as any} classes={{root: classes.tabItem}} label={item.name} />
                    ))}
                  </Tabs>
                </div>
                <div className={classes.searchContainer}>
                  <Search onSearch={props.onSearch}></Search>
                </div>
              </React.Fragment>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
  );
})

export default TopBar;
