import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTable, usePagination } from "react-table";

import Chart from "chart.js/auto";
import {
  Flex,
  Heading,
  Avatar,
  AvatarGroup,
  Text,
  Icon,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Link,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import {
  FiHome,
  FiPieChart,
  FiDollarSign,
  FiBox,
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiPlus,
  FiCreditCard,
  FiSearch,
  FiBell,
} from "react-icons/fi";
import { IoIosPeople, IoIosLogOut } from "react-icons/io";
import MyChart from "../components/MyChart";
import qr from "../assets/frame.png";
import Image from "next/image";
import Widgets from "./components/Widgets";

export default function Dashboard() {
  const [display, changeDisplay] = useState("hide");
  const [value, changeValue] = useState(1);
  const [amount, setAmount] = useState("");
  const [user, setUser] = useState([]);
  const [admin, setAdmin] = useState("");
  const [transaction, setTrans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const allUsers = async () => {
    setIsLoading(true);

    const jwt_token = localStorage.getItem("admin");

    var myheaders = new Headers();
    myheaders.append(
      "Access-Control-Allow-Origin",
      "*",
      "Access-Control-Allow-Origin",
      "http://localhost:3000",
      "Access-Control-Allow-Credentials",
      "true"
    );
    myheaders.append("Content-Type", "application/json");
    const url = `https://api.paybaba.co/admin/allUsers?admin_jwt=${jwt_token}`;
    var requestOptions = {
      method: "GET",
      headers: myheaders,
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    setUser(data?.data);
    setIsLoading(false);
  };

  const allTrans = async () => {
    setIsLoading(true);

    const jwt_token = localStorage.getItem("admin");

    var myheaders = new Headers();
    myheaders.append(
      "Access-Control-Allow-Origin",
      "*",
      "Access-Control-Allow-Origin",
      "http://localhost:3000",
      "Access-Control-Allow-Credentials",
      "true"
    );
    myheaders.append("Content-Type", "application/json");
    const url = `https://api.paybaba.co/admin/allTrans?admin_jwt=${jwt_token}`;
    var requestOptions = {
      method: "GET",
      headers: myheaders,
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    setTrans(data?.transaction);
    setIsLoading(false);
  };
  console.log("tarns", transaction);

  const getAmount = async () => {
    setIsLoading(true);

    const jwt_token = localStorage.getItem("admin");

    var myheaders = new Headers();
    myheaders.append(
      "Access-Control-Allow-Origin",
      "*",
      "Access-Control-Allow-Origin",
      "http://localhost:3000",
      "Access-Control-Allow-Credentials",
      "true"
    );
    myheaders.append("Content-Type", "application/json");
    const url = `https://api.paybaba.co/admin/totalAmount?admin_jwt=${jwt_token}`;
    var requestOptions = {
      method: "GET",
      headers: myheaders,
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    setAmount(data?.amount);
    setIsLoading(false);
  };

  const getAdmin = async () => {
    setIsLoading(true);

    const jwt_token = localStorage.getItem("admin");
    console.log(localStorage);

    var myheaders = new Headers();
    myheaders.append(
      "Access-Control-Allow-Origin",
      "*",
      "Access-Control-Allow-Origin",
      "http://localhost:3000",
      "Access-Control-Allow-Credentials",
      "true"
    );
    myheaders.append("Content-Type", "application/json");
    const url = `https://api.paybaba.co/admin/getAdmin?admin_jwt=${jwt_token}`;
    var requestOptions = {
      method: "GET",
      headers: myheaders,
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    setAdmin(data.email);
    setIsLoading(false);
  };
  useEffect(() => {
    const jwt_token = localStorage.getItem("admin");
    if (router.isReady) {
      if (!jwt_token) {
        window.location.href = "/login";
      } else {
        allUsers();
        getAdmin();
        allTrans();
        getAmount();
      }
    }
  }, [router.isReady]);

  return (
    <>
      {isLoading ? (
        <>
          <div className="bodykk">
            <div className="testloader">
              <span></span>
              <span></span>
            </div>
          </div>
        </>
      ) : (
        <Flex h="100vh" flexDir="row" overflow="hidden" maxW="2000px">
          <Flex
            w="15%"
            flexDir="column"
            alignItems="center"
            backgroundColor="#020202"
            color="#fff"
          >
            <Flex flexDir="column" justifyContent="space-between">
              <Flex flexDir="column" as="nav">
                <Heading
                  mt={50}
                  mb={100}
                  fontSize={20}
                  alignSelf="center"
                  letterSpacing="tight"
                >
                  PayBaba
                </Heading>
                <Flex
                  flexDir="column"
                  align="flex-start"
                  justifyContent="center"
                >
                  <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                    <Link display={["none", "none", "flex", "flex", "flex"]}>
                      <Icon
                        as={FiHome}
                        fontSize="2xl"
                        className="active-icon"
                      />
                    </Link>
                    <Link
                      _hover={{ textDecor: "none" }}
                      display={["flex", "flex", "none", "flex", "flex"]}
                      href="/"
                    >
                      <Text className="active">Home</Text>
                    </Link>
                  </Flex>

                  <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                    <Link display={["none", "none", "flex", "flex", "flex"]}>
                      <Icon as={FiDollarSign} fontSize="2xl" />
                    </Link>
                    <Link
                      _hover={{ textDecor: "none" }}
                      display={["flex", "flex", "none", "flex", "flex"]}
                      href="/allTrans"
                    >
                      <Text className="active">All Transactions</Text>
                    </Link>
                  </Flex>
                  <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                    <Link display={["none", "none", "flex", "flex", "flex"]}>
                      <Icon as={IoIosPeople} fontSize="2xl" />
                    </Link>
                    <Link
                      _hover={{ textDecor: "none" }}
                      display={["flex", "flex", "none", "flex", "flex"]}
                      href="/merchant"
                    >
                      <Text className="active">Merchant</Text>
                    </Link>
                  </Flex>
                  <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                    <Link display={["none", "none", "flex", "flex", "flex"]}>
                      <Icon as={IoIosLogOut} fontSize="2xl" />
                    </Link>

                    <Link
                      _hover={{ textDecor: "none" }}
                      display={["flex", "flex", "none", "flex", "flex"]}
                      href="/logout"
                    >
                      <Text className="active">Logout</Text>
                    </Link>
                  </Flex>
                </Flex>
              </Flex>
              <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
                <Avatar my={2} src="avatar-1.jpg" />
                <Text textAlign="center">{admin}</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            w={["100%", "100%", "60%", "60%", "55%"]}
            p="3%"
            flexDir="column"
            overflow="auto"
            minH="100vh"
          >
            <Heading fontWeight="normal" mb={4} letterSpacing="tight">
              Welcome back,{" "}
              <Flex display="inline-flex" fontWeight="bold">
                {admin}
              </Flex>
            </Heading>
            <Text color="gray" fontSize="sm">
              Total Transactions
            </Text>
            <Text fontWeight="bold" fontSize="2xl">
              &#8377;{amount}
            </Text>
            <MyChart />
            <Flex justifyContent="space-between" mt={8}>
              <Flex align="flex-end">
                <Heading as="h2" size="lg" letterSpacing="tight">
                  Transactions
                </Heading>
                <Text fontSize="small" color="gray" ml={4}>
                  Jan 2023
                </Text>
              </Flex>
              <IconButton icon={<FiCalendar />} />
            </Flex>
            <Flex flexDir="column">
              <Flex overflow="auto">
                <Table variant="unstyled" mt={4}>
                  <Thead>
                    <Tr color="gray">
                      <Th>Transaction ID</Th>
                      <Th>Name</Th>
                      <Th isNumeric>Amount</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {transaction.slice(0, 5).map((val, key) => (
                      <Tr val={val._id}>
                        <Td>
                          <Flex align="center">
                            <Avatar size="sm" mr={2} src="amazon.jpeg" />
                            <Flex flexDir="column">
                              <Heading size="sm" letterSpacing="tight">
                                {val.utr}
                              </Heading>
                              <Text fontSize="sm" color="gray">
                                {val.transactionDate}
                              </Text>
                            </Flex>
                          </Flex>
                        </Td>
                        <Td>{val.emailId}</Td>

                        <Td isNumeric>
                          <Text fontWeight="bold" display="inline-table">
                            &#8377;{val.amount}
                          </Text>
                        </Td>
                      </Tr>
                    ))}

                    {display == "show" &&
                      transaction.slice(5).map((val, key) => (
                        <Tr val={val._id}>
                          <Td>
                            <Flex align="center">
                              <Avatar size="sm" mr={2} src="amazon.jpeg" />
                              <Flex flexDir="column">
                                <Heading size="sm" letterSpacing="tight">
                                  {val.utr}
                                </Heading>
                                <Text fontSize="sm" color="gray">
                                  {val.transactionDate}
                                </Text>
                              </Flex>
                            </Flex>
                          </Td>
                          <Td>{val.emailId}</Td>

                          <Td isNumeric>
                            <Text fontWeight="bold" display="inline-table">
                              &#8377;{val.amount}
                            </Text>
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </Flex>
              <Flex align="center">
                <Divider />
                <IconButton
                  icon={display == "show" ? <FiChevronUp /> : <FiChevronDown />}
                  onClick={() => {
                    if (display == "show") {
                      changeDisplay("none");
                    } else {
                      changeDisplay("show");
                    }
                  }}
                />
                <Divider />
              </Flex>
            </Flex>
          </Flex>
          <Flex
            w={["100%", "100%", "30%"]}
            bgColor="#F5F5F5"
            p="3%"
            flexDir="column"
            overflow="auto"
            minW={[null, null, "300px", "300px", "400px"]}
          >
            <Widgets type="user"></Widgets>
            <Widgets type="earning"></Widgets>
            <Widgets type="order"></Widgets>
          </Flex>
        </Flex>
      )}
    </>
  );
}
