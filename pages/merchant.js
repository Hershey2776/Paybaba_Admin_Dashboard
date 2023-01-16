import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { chakra } from "@chakra-ui/react";
import React, { useMemo, useState, useEffect } from "react";
import { useTable, useSortBy } from "react-table";
import { useRouter } from "next/router";

import { FiTrash2, FiUser } from "react-icons/fi";
import { MdPageview } from "react-icons/md";
import { Table } from "react-chakra-pagination";

import {
  Flex,
  Heading,
  Avatar,
  AvatarGroup,
  Text,
  Icon,
  IconButton,
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
import { IoIosPeople, IoIosLogOut, IoIosPersonAdd } from "react-icons/io";
export default function ChakraTable() {
  const router = useRouter();

  const [merchants, setMerchant] = useState([]);

  const [transaction, setTransaction] = useState([]);
  const [page, setPage] = React.useState(1);

  const allTrans = async () => {
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
    const url = `http://localhost:5000/admin/allTrans?admin_jwt=${jwt_token}`;
    var requestOptions = {
      method: "GET",
      headers: myheaders,
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    setTransaction(data.transaction);
  };

  const getAdmin = async () => {
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
    const url = `http://localhost:5000/admin/getAllMerchants?admin_jwt=${jwt_token}`;
    var requestOptions = {
      method: "GET",
      headers: myheaders,
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    console.log(data);
    setMerchant(data?.data);
  };

  useEffect(() => {
    const jwt_token = localStorage.getItem("admin");
    if (router.isReady) {
      if (!jwt_token) {
        window.location.href = "/login";
      } else {
        allTrans();
        getAdmin();
      }
    }
  }, [router.isReady]);

  const columns = [
    {
      Header: "Merchant Id",
      accessor: "_id",
    },
    {
      Header: "Email",
      accessor: "email",
    },

    {
      Header: "UPI Id",
      accessor: "upiId",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Last Login",
      accessor: "lastlogin",
    },
    {
      Header: "View",
      accessor: "action",
    },
  ];

  const tableData = merchants.map((val) => ({
    name: (
      <Flex align="center">
        <Avatar name={val.email} src={val.qr} size="sm" mr="4" />
        <Text>{val.email}</Text>
      </Flex>
    ),
    _id: val._id,
    merchantId: val._id,
    status: val.status,
    email: val.email,
    upiId: val.upiId,
    qr: val.qr,
    lastlogin: val.lastlogin,
    action: (
      <a colorScheme="gray" href={`/viewMerchants/${val._id}`} size="sm">
        <Icon as={MdPageview} fontSize="20" />
      </a>
    ),
  }));

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   useTable({ columns, tableData }, useSortBy);

  return (
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
            <Flex flexDir="column" align="flex-start" justifyContent="center">
              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <Link display={["none", "none", "flex", "flex", "flex"]}>
                  <Icon as={FiHome} fontSize="2xl" />
                </Link>
                <Link
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}
                  href="/"
                >
                  <Text className="active">Home</Text>
                </Link>
              </Flex>
              {/* <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                  <Link display={["none", "none", "flex", "flex", "flex"]}>
                    <Icon as={FiPieChart} fontSize="2xl" />
                  </Link>
                  <Link
                    _hover={{ textDecor: "none" }}
                    display={["flex", "flex", "none", "flex", "flex"]}
                  >
                    <Text className="active">Charts</Text>
                  </Link>
                </Flex> */}
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
                  <Icon
                    as={IoIosPeople}
                    className="active-icon"
                    fontSize="2xl"
                  />
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
                  <Icon as={IoIosPersonAdd} fontSize="2xl" />
                </Link>
                <Link
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}
                  href="/addMerch"
                >
                  <Text className="active">Add Merchant</Text>
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
            {/* <Text textAlign="center">{merchants}</Text> */}
          </Flex>
        </Flex>
      </Flex>
      <Flex w="80%" p="3%" flexDir="column" overflow="auto" minH="100vh">
        <Heading>All Transactions</Heading>
        <Table
          colorScheme="blue"
          // Fallback component when list is empty
          emptyData={{
            icon: FiUser,
            text: "Nobody is registered here.",
          }}
          totalRegisters={transaction.length}
          page={page}
          // Listen change page event and control the current page using state
          onPageChange={(page) => setPage(page)}
          columns={columns}
          data={tableData}
        />
      </Flex>
    </Flex>
  );
}
