import React, { useState } from 'react';
import { ChakraProvider, Box, Table, Thead, Tbody, Tr, Th, Td, Heading, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { BsFillCaretDownFill } from 'react-icons/bs';

// JSON data
const data = {
  "Sheet1": [
    { "Month": "January", "OperatingActivities": 172937463.08, "InvestingActivities": 450098399.69, "FinancingActivities": 587873253.25, "NetChangeInCash": 766408753.39 },
    { "Month": "February", "OperatingActivities": 558052815.48, "InvestingActivities": 240625489.73, "FinancingActivities": 136019463.12, "NetChangeInCash": 97150953.75 },
    { "Month": "March", "OperatingActivities": 734194475.46, "InvestingActivities": 123489061.74, "FinancingActivities": 150519520.36, "NetChangeInCash": 377171608.76 },
    { "Month": "April", "OperatingActivities": 603217886.06, "InvestingActivities": 787168987.59, "FinancingActivities": 320338827.74, "NetChangeInCash": 51436824.34 },
    { "Month": "May", "OperatingActivities": 538484279.79, "InvestingActivities": 636583200.77, "FinancingActivities": 327452855.28, "NetChangeInCash": 809960171.80 },
    { "Month": "June", "OperatingActivities": 117281555.41, "InvestingActivities": 24425946.38, "FinancingActivities": 342606066.73, "NetChangeInCash": 706521972.57 },
  ]
};

// Function to calculate opening and ending cash
const calculateCashFlows = (data, initialOpeningCash) => {
  let cashFlows = [];
  let openingCash = initialOpeningCash;

  data.Sheet1.forEach((item) => {
    let endingCash = openingCash + item.NetChangeInCash;
    cashFlows.push({
      Month: item.Month,
      OperatingActivities: item.OperatingActivities,
      InvestingActivities: item.InvestingActivities,
      FinancingActivities: item.FinancingActivities,
      OpeningCash: openingCash,
      NetChangeInCash: item.NetChangeInCash,
      EndingCash: endingCash
    });
    openingCash = endingCash;
  });

  return cashFlows;
};

// Initial opening cash
const initialOpeningCash = 1000000;

// Calculated cash flows
const cashFlows = calculateCashFlows(data, initialOpeningCash);

// Conversion functions
const toPercent = (value) => ((value / 1000000000) * 100).toFixed(2);
const toDollar = (value) => '$' + (value / 75).toFixed(2); // Example conversion rate
const toEuro = (value) => '€' + (value / 85).toFixed(2); // Example conversion rate

// Main component
const FinancialTable = () => {
  const [viewMode, setViewMode] = useState('decimal');
  const [currency, setCurrency] = useState('rupee');

  const convertValue = (value) => {
    switch (viewMode) {
      case 'percent':
        return toPercent(value);
      default:
        switch (currency) {
          case 'dollar':
            return toDollar(value);
          case 'euro':
            return toEuro(value);
          default:
            return value.toLocaleString();
        }
    }
  };

  return (
    <ChakraProvider>
      <Box p={5} style={{ marginTop: "40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Heading size='xl' fontSize='20px'>Cashflow Summary</Heading>
          <div style={{ display: "flex", alignItems: "center", gap: "1%" }}>
            <Button
              color={viewMode === 'decimal' ? "skyblue" : "black"}
              boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
              size="md"
              onClick={() => setViewMode('decimal')}
            >
              Decimal View
            </Button>
            <Button
              color={viewMode === 'percent' ? "skyblue" : "black"}
              boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
              size="md"
              onClick={() => setViewMode('percent')}
            >
              Percent View
            </Button>
            <Menu>
              <MenuButton as={Button} bg="white" boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)" size="md" rightIcon={<BsFillCaretDownFill />}>
                {currency.charAt(0).toUpperCase() + currency.slice(1)}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setCurrency('rupee')}>Rupee</MenuItem>
                <MenuItem onClick={() => setCurrency('dollar')}>Dollar</MenuItem>
                <MenuItem onClick={() => setCurrency('euro')}>Euro</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
        <Table variant="striped" colorScheme="cyan">
          <Thead>
            <Tr>
              <Th>Cashflow</Th>
              {cashFlows.map((item, index) => (
                <Th key={index}>{item.Month}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Operating Activities</Td>
              {cashFlows.map((item, index) => (
                <Td key={index}>{convertValue(item.OperatingActivities)}</Td>
              ))}
            </Tr>
            <Tr>
              <Td>Investing Activities</Td>
              {cashFlows.map((item, index) => (
                <Td key={index}>{convertValue(item.InvestingActivities)}</Td>
              ))}
            </Tr>
            <Tr>
              <Td>Financing Activities</Td>
              {cashFlows.map((item, index) => (
                <Td key={index}>{convertValue(item.FinancingActivities)}</Td>
              ))}
            </Tr>
            <Tr>
              <Td>Opening Cash</Td>
              {cashFlows.map((item, index) => (
                <Td key={index}>{convertValue(item.OpeningCash)}</Td>
              ))}
            </Tr>
            <Tr>
              <Td>Net Change in Cash</Td>
              {cashFlows.map((item, index) => (
                <Td key={index}>{convertValue(item.NetChangeInCash)}</Td>
              ))}
            </Tr>
            <Tr>
              <Td>Ending Cash</Td>
              {cashFlows.map((item, index) => (
                <Td key={index}>{convertValue(item.EndingCash)}</Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </ChakraProvider>
  );
};

export default FinancialTable;
