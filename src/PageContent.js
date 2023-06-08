import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import sheetData from './sheetData';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function SheetTable(props) {
    console.log("sheet table", props.lender);
    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Rate Sheet</TableCell>
              <TableCell>File Type</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sheetData
            .filter((sheet) => {return sheet.lender === props.lender})
            .map((sheet) => (
              <TableRow>
                <TableCell><a href={`${sheet.downloadLink}`}>{sheet.name}</a></TableCell>
                <TableCell>{sheet.fileType}</TableCell>
                <TableCell>{sheet.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default function PageContent() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="lender">
          <Tab label="Rocket Mortgage" {...a11yProps(0)} />
          <Tab label="Caliber" {...a11yProps(1)} />
          <Tab label="AT Lending" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <SheetTable lender="rocket"/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SheetTable lender="caliber" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SheetTable lender="atlending" />
      </TabPanel>
    </Box>
  );
}