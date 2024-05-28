import React from "react";
import { Button, Icon, Flex } from "@chakra-ui/react";
import { FiCalendar } from "react-icons/fi";
import './navabar.css';

const Navbar = ({ setView, view }) => {
  return (
    <div className="navbar">
      <Flex
        direction={{ base: "column", md: "row" }}
        wrap="wrap"
        justify="space-between"
        align="center"
        p={4}
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          wrap="wrap"
          gap={2}
          mb={{ base: 4, md: 0 }}
        >
          <Button
            bg="white"
            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
            size="md"
          >
            Summary
          </Button>
          <Button
            bg="white"
            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
            size="md"
          >
            Balance Sheet
          </Button>
          <Button
            bg="white"
            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
            size="md"
          >
            Income Statement
          </Button>
          <Button 
          // color={"skyblue"} 
          bg="white"
          size="md">
            CashFlow
          </Button>
          <Button
            bg="white"
            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
            size="md"
          >
            +
          </Button>
        </Flex>

        <Flex
          direction={{ base: "column", md: "row" }}
          wrap="wrap"
          gap={2}
        >
          <Button 
            color={view === "normal" ? "skyblue" : "black"}
            size="md" 
            onClick={() => setView("normal")}
          >
            Normal View
          </Button>
          <Button
            color={view === "growth" ? "skyblue" : "black"}
            // bg="white"
            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
            size="md"
            onClick={() => setView("growth")}
          >
            Growth View
          </Button>
          <Button
            bg="white"
            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
            size="md"
          >
            Period From
            <Icon
              as={FiCalendar}
              color="gray.300"
              style={{ marginLeft: "5px" }}
            />
          </Button>
          <Button
            bg="white"
            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
            size="md"
          >
            Period To
            <Icon
              as={FiCalendar}
              color="gray.300"
              style={{ marginLeft: "5px" }}
            />
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default Navbar;
