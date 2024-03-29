import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { Tab, Tabs, useMediaQuery } from "@mui/material";
import { tabs } from "../constants";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tabsState } from "../../store/atoms/tabs";
import LinearDeterminate from "./LinerProgreeBar";
import ResumeDownload from "./ResumeDownload";
const CustomAppBar = styled(AppBar)(({ theme }) => ({
  "& .MuiContainer-root": {
    paddingRight: "12px",
    paddingLeft: "12px",
  },
  "& .MuiToolbar-root": {
    minHeight: "60px", // Center align items in the toolbar
  },
}));

const CustomTabs = styled(Tabs)(({ theme }) => {
  const isMobile = useMediaQuery("(max-width:650px)");
  const activeColor = "#F78066";

  return {
    minHeight: "60px",
    flex: isMobile && 0.5,
    "& .MuiTabs-flexContainer": {
      gap: "2.5rem",
      alignItems: 'flex-start'
    },
    "& .MuiTabs-scroller": {
      display: "flex",
      alignItems: "center",
    },
    "& .MuiTab-root": {
      color: "white",
      fontSize: isMobile ? "1.5rem" : "1rem",
      height: "28px",
      marginLeft: !isMobile && "14px",
      marginRight: isMobile && "1.5rem",
      padding: isMobile && '2rem',
      textTransform: "none",
      transition: "transform 0.3s, box-shadow 0.3s",
      minHeight: "40px",
      "&:hover": {
        backgroundColor: "rgb(16, 19, 26)",
        borderRadius: "10px",
        transform: "scale(1.03)",
      },
    },
    "& .MuiSvgIcon-root": {
      height: "1.25rem",
    },
    "& .Mui-selected": {
      color: "white !important",
    },
    "& .MuiTabs-indicator": {
      backgroundColor: activeColor,
    },
  };
});

const Sidebar = ({
  isOpen,
  handleClose,
  handleChange,
  tabState,
}: {
  isOpen: boolean;
  handleClose: () => void;
  handleChange: (v: any) => void;
  tabState: { isLoading: boolean; activeTab: string | undefined };
}) => {
  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        sx: {
          bgcolor: "#111827",
        },
      }}
    >
      <CustomTabs
        orientation="vertical"
        value={tabState.activeTab}
        onChange={(e, v) => {
          handleChange(v); // Invoke handleChange
          handleClose(); // Invoke handleClose
        }}
      >
        {tabs.map(({ key, value, Icon }) => (
          <Tab
            value={value}
            label={key}
            icon={<Icon />}
            iconPosition="start"
            key={value}
          />
        ))}
      </CustomTabs>
    </Drawer>
  );
};

const NavBar = () => {
  const setTab = useSetRecoilState(tabsState);
  const tabState = useRecoilValue(tabsState);
  const isMobile = useMediaQuery("(max-width:650px)");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handleChange = (v: any) => {
    setTab((prev) => ({ ...prev, isLoading: true }));
    setTimeout(() => {
      setTab({
        isLoading: false,
        activeTab: v,
      });
      handleCloseSidebar();
    }, 400);
  };

  return (
    <nav className="border-b border-gray-700 h-30">
      {tabState.isLoading && <LinearDeterminate />}
      <CustomAppBar position="sticky" color="transparent">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {isMobile && (
              <Box
                sx={{
                  bgcolor: "transparent",
                  justifyContent: "flex-end",
                  display: "flex",
                  padding: "0px 14px",
                }}
              >
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleSidebarToggle}
                  size="large"
                >
                  {sidebarOpen ? <CloseIcon /> : <MenuIcon fontSize="large" />}
                </IconButton>
                <Sidebar
                  isOpen={sidebarOpen}
                  handleClose={handleCloseSidebar}
                  tabState={tabState}
                  handleChange={handleChange}
                />
              </Box>
            )}
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: isMobile ? "center" : "flex-start",
              }}
            >
              {!isMobile && (
                <CustomTabs
                  value={tabState.activeTab}
                  onChange={(e, v) => handleChange(v)}
                  centered
                >
                  {tabs.map(({ key, value, Icon }) => (
                    <Tab
                      value={value}
                      label={key}
                      icon={<Icon />}
                      iconPosition="start"
                      key={value}
                    />
                  ))}
                </CustomTabs>
              )}
              {isMobile && (
                <h2 className="text-2xl items-center text-center  border-b-2 border-green font-semibold">
                  Web Portfolio
                </h2>
              )}
            </Box>
            <Box
              sx={{
                bgcolor: "transparent",
                justifyContent: "flex-end",
                display: "flex",
                gap: "1rem",
                padding: "0px 14px",
              }}
            >
              <Avatar alt="sagun pic" src="/pic.jpg" sx={{ ml: 2 }} />
              <ResumeDownload isMobile={isMobile} />
            </Box>
          </Toolbar>
        </Container>
      </CustomAppBar>
    </nav>
  );
};

export default NavBar;
