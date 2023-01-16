import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { chakra } from "@chakra-ui/react";
import React, { useMemo, useState, useEffect } from "react";
import { useTable, useSortBy } from "react-table";
import { FiTrash2, FiUser } from "react-icons/fi";
import { Table } from "react-chakra-pagination";
import { MdPageview } from "react-icons/md";
import CsvDownloadButton from "react-json-to-csv";
import "@mui/material/styles";
import { MdChevronLeft, MdChevronRight, MdMenu } from "react-icons/md";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

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
import { IoIosPeople, IoIosLogOut } from "react-icons/io";

export default function ChakraTable() {
  // const data = useMemo(
  //   () => [
  //     {
  //       fromUnit: "inches",
  //       toUnit: "millimetres (mm)",
  //       factor: 25.4,
  //     },
  //     {
  //       fromUnit: "feet",
  //       toUnit: "centimetres (cm)",
  //       factor: 30.48,
  //     },
  //     {
  //       fromUnit: "yards",
  //       toUnit: "metres (m)",
  //       factor: 0.91444,
  //     },
  //   ],
  //   []
  // );
  const [merchants, setMerchant] = useState("");
  const [status, setStatus] = useState();
  const [transaction, setTransaction] = useState([]);
  const [page, setPage] = React.useState(1);

  const allTrans = async () => {
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
    const url = `http://apis.paybaba.co/admin/allTrans?admin_jwt=${jwt_token}`;
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
    const url = `http://apis.paybaba.co/admin/getAdmin?admin_jwt=${jwt_token}`;
    var requestOptions = {
      method: "GET",
      headers: myheaders,
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    console.log(data);
    setMerchant(data.email);
  };

  useEffect(() => {
    const jwt_token = localStorage.getItem("admin");

    if (!jwt_token) {
      window.location.href = "/login";
    } else {
      allTrans();
      getAdmin();
    }
  }, []);

  const getStatusData = async (e, status) => {
    e.preventDefault();
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
    const url = `http://apis.paybaba.co/admin/getbystatus?admin_jwt=${jwt_token}&status=${status}`;
    var requestOptions = {
      method: "GET",
      headers: myheaders,
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    setTransaction(data?.data);
  };

  const columns = [
    {
      Header: "Transaction Id",
      accessor: "_id",
    },
    {
      Header: "Merchant Id",
      accessor: "merchantId",
    },
    {
      Header: "UTR",
      accessor: "utr",
    },
    {
      Header: "Email",
      accessor: "emailId",
    },
    {
      Header: "Mobile",
      accessor: "mobileno",
      isNumeric: true,
    },
    {
      Header: "Amount",
      accessor: "amount",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Updated By",
      accessor: "updatedBy",
    },
    {
      Header: "Transaction Date",
      accessor: "transactionDate",
    },
    {
      Header: "Screen Shot",
      accessor: "screenShot",
    },
    {
      Header: "View",
      accessor: "action",
    },
  ];

  const tableData = transaction.map((val) => ({
    name: (
      <Flex align="center">
        <Avatar name={val.emailId} src={val.screenShot} size="sm" mr="4" />
        <Text>{val.emailId}</Text>
      </Flex>
    ),
    mobileno: val.mobileno,
    _id: val._id,
    merchantId: val.merchantId,
    updatedBy: val.updatedBy,
    transactionDate: val.transactionDate,
    status: val.status,
    amount: val.amount,
    emailId: val.emailId,
    utr: val.utr,
    screenShot: val.screenShot,
    action: (
      <a colorScheme="gray" href={`/viewTrans/${val._id}`} size="sm">
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
                  <Icon
                    as={FiDollarSign}
                    fontSize="2xl"
                    className="active-icon"
                  />
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
            <Text textAlign="center">{merchants}</Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex w="80%" p="3%" flexDir="column" overflow="auto" minH="100vh">
        <span>
          <Heading mb="5">All Transactions</Heading>
          <CsvDownloadButton
            style={{
              marginBottom: "20px",
              marginLeft: "20px",
              border: "1px solid #efefef",
              padding: "7px",
              borderRadius: "8px",
              color: "#efefef",
              backgroundColor: "#F32C48",
            }}
            className="Download_Button"
            data={transaction}
          />
          <Menu>
            <MenuButton
              style={{ marginLeft: "10px" }}
              px={12}
              py={2}
              transition="all 0.2s"
              borderRadius="md"
              borderWidth="1px"
              _hover={{ bg: "#F32C48", color: "#efefef" }}
              _expanded={{ bg: "blue.400" }}
              _focus={{ boxShadow: "outline" }}
            >
              <span
                style={{
                  display: "flex",
                  gap: "2px",
                  alignItems: "center",
                  marginLeft: "0px",
                }}
              >
                Status <MdChevronRight />
              </span>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={(e) => getStatusData(e, "completed")}>
                Completed
              </MenuItem>
              <MenuItem onClick={(e) => getStatusData(e, "pending")}>
                Pending
              </MenuItem>
            </MenuList>
          </Menu>
        </span>
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
