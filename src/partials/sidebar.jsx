import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
    Box,
    Center,
    Img,
    VStack
} from "@chakra-ui/react";

import config from "../config.json";
import icon from "../images/icon_dark.jpg";

function SiderBar() {
    let [page, setPage] = useState("");
    let { pathname } = useLocation();
    const handleNavigation = (target) => {
        window.location.href = `/${target}`;
    }

    useEffect(() => {
        const initialize = () => {
            let [target] = pathname.slice(1).split("/").splice(1);
            setPage((target && config.pages.includes(target)) ? target : "dashboard");
        }
        initialize();
    }, [pathname]);

    return (
        <Box
            pos="fixed"
            w="15%"
            h="100vh" 
            bgColor="#1C1C1C"
            color="white"
        >
            <Center>
                <Img
                    h="10rem"
                    w="auto"
                    borderRadius="full"
                    src={icon}
                    alt="icon"
                />
            </Center>
            <VStack mt={5} spacing={0}>
                <Box
                    as="button"
                    w="100%"
                    p="15px"
                    fontWeight="bold"
                    transition="all 0.2s"
                    bgColor={page === "dashboard" ? "#0f0f0f" : null}
                    _hover={page === "dashboard" ? null : { bgColor: "#0f0f0f" }}
                    onClick={() => handleNavigation("admin")}
                >
                    Dashboard
                </Box>
                <Box
                    as="button"
                    w="100%"
                    p="15px"
                    fontWeight="bold"
                    transition="all 0.2s"
                    bgColor={page === "courses" ? "#0f0f0f" : null}
                    _hover={page === "courses" ? null : { bgColor: "#0f0f0f" }}
                    onClick={() => handleNavigation("admin/courses")}
                >
                    Courses
                </Box>
            </VStack>
        </Box>
    )
}

export default SiderBar;