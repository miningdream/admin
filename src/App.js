import { getAdminUser } from "./api";
import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react"

import SiderBar from "./partials/sidebar";
import config from "./config.json";

import Main from "./pages/main";
import Courses from "./pages/courses";

function App() {

  let { pathname } = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    const initialize = async() => {
      if(!pathname.length || pathname === "/") return window.location.href = "/admin";
  
      let response = null;
      try {
        response = await getAdminUser();
      } catch (error) {
        console.log(error);
      }
      if(!response) return navigate(config.domain);
      else {
        if(!response.is_admin) return navigate(config.domain);
      }
    }
    initialize();
  }, [pathname, navigate]);

  return (
    <Flex>
      <Box w="15%">
        <SiderBar />
      </Box>
      <Box w="85%">
        <Routes>
          <Route path="/admin" Component={Main} />
          <Route path="/admin/courses" Component={Courses} />
          <Route path="/admin/courses/:typeOrId" Component={Courses} />
        </Routes>
      </Box>
    </Flex>
  );
}

export default App;
