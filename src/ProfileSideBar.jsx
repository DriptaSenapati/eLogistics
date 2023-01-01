import { Avatar, Box, Card, CardContent, CircularProgress, Collapse, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { sidebarDetails } from './../src/helpers/utils';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import _ from 'underscore';
import { MCard, StyledListItemButton } from './MuiStyleOverrides';
import CircleIcon from '@mui/icons-material/Circle';
import { GLOBAL_PADDING } from './helpers/constants';



const StyledSideBar = styled(Box)(({ theme }) => ({
  backgroundColor: "transparent",
  width: "30vw",
  position: "fixed",
  height: "100%",
  left: GLOBAL_PADDING,
  // border: "1px solid black",
  // display: "flex",
  // justifyContent: "center",
  // alignItems: "center"
}))




const sidebar_data_available = (session, setRightComponent, localStateOpen, setLocalStateOpen, openPage) => {
  // console.log("psb",localState);
  // const { open, optionSelected } = localState;

  const handleClick = (section) => (e) => {
    setLocalStateOpen(localStateOpen === section ? false : section);
  };

  const handleClickCollaspe = (section_content) => (e) => {
    setRightComponent({
      page: section_content.page,
      open: localStateOpen
    })
  };

  const handleArrowColorGroup = (section, section_item) => {
    return Boolean(section.find((k) => k.page === section_item))
  }


  return (
    <>
      <MCard sx={{ p: 0 }}>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={session.user.image} alt={session.user.name} />
            </ListItemAvatar>
            <ListItemText primary="Welcome!" secondary={session.user.name} secondaryTypographyProps={{
              sx: {
                color: (theme) => theme.palette.secondary.main,
                textTransform: 'capitalize'
              }
            }} />
          </ListItem>
        </List>
      </MCard>
      <MCard sx={{ mt: "20px", p: 1 }}>
        <List>
          {
            Object.keys(sidebarDetails).map((val) => {
              const Iconcontent = sidebarDetails[val]["icon"]
              if (sidebarDetails[val]["content"] != null) {
                return (
                  <div key={val}>
                    <StyledListItemButton onClick={handleClick(val)}>
                      <ListItemIcon>
                        <Iconcontent color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary={val} />
                      {localStateOpen === `${val}` ? <ExpandLess color={handleArrowColorGroup(sidebarDetails[val]["content"], openPage) ? 'primary' : "inherit"} /> : <ExpandMore color={handleArrowColorGroup(sidebarDetails[val]["content"], openPage) ? 'primary' : "inherit"} />}
                    </StyledListItemButton>
                    <Collapse in={localStateOpen === `${val}`} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {

                          sidebarDetails[val]["content"].map((item) => (

                            <StyledListItemButton sx={{ pl: 4 }} key={item["page"]}
                              selected={openPage === item["page"]} onClick={handleClickCollaspe(item)}>
                              <ListItemIcon>
                                <CircleIcon color={openPage === item["page"] ? "primary" : "secondary"} sx={{ fontSize: "10px" }} />
                              </ListItemIcon>
                              <ListItemText primary={item["page"]} />
                              <KeyboardArrowRightIcon color={openPage === item["page"] ? 'primary' : "inherit"} />
                            </StyledListItemButton>

                          ))
                        }
                      </List>
                    </Collapse>
                  </div>
                )
              } else {
                return (
                  <div key={val}>
                    <StyledListItemButton>
                      <ListItemIcon>
                        <Iconcontent color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary={val} />
                      <KeyboardArrowRightIcon />
                    </StyledListItemButton>
                  </div>
                )
              }
            })
          }
        </List>

      </MCard>
    </>
  )
}

const ProfileSideBar = ({ session, setRightComponent, openGroup, openPage }) => {
  // const { data: session } = useSession();


  const [localStateOpen, setLocalStateOpen] = React.useState(false);

  useEffect(() => {
    setLocalStateOpen(openGroup)
  }, [openGroup])


  return (
    <StyledSideBar>
      {
        localStateOpen ?
          sidebar_data_available(session, setRightComponent, localStateOpen, setLocalStateOpen, openPage) :
          <CircularProgress />
      }
    </StyledSideBar>
  )
}



export default ProfileSideBar