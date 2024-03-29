"use client"
import { useRecoilValue } from "recoil";
import { tabsState } from "./store/atoms/tabs";
import AboutMe from "./components/about-me/page";
import Skills from "./components/skills/page";
import Projects from "./components/projects/page";
import ContactMe from "./components/contact/page";

const Tabs = () => {
  const tabState = useRecoilValue(tabsState);
  switch(tabState.activeTab) {
    case 'about-me':
      return <AboutMe />
    case 'skills':
      return <Skills />
    case 'projects':
      return <Projects />
    case 'contact':
      return <ContactMe />
  }
};

export default Tabs;
