import UPadWrapper from "@components/Shared/UPadWrapper";
import MyLoader from "@components/Shared/MyLoader";
import { useDateTypeFilterAndPagination } from "@components/Dashboard/Tabs/useDateTypeFilterAndPagination";
import { makeStyles } from "@material-ui/core";
import {
  TextField,
  InputAdornment,
  IconButton,
  Icon
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useMemo, useState } from "react";
import { DateRange, LoopSource, LoopType } from "@interfaces/LoopTypes";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import FilterDropdowns from "@components/Dashboard/FilterDropdowns";
import Pagination from "@components/Dashboard/Pagination";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import Win from "@helpers/Win";
import { useFetchReturnType } from "@hooks/useFetch";
import MessageCard from "@components/Shared/MessageCard";
import { useWaiter } from "@hooks/useWaiter";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { NONAME } from "node:dns";

export const itemsPerPageOptions = [5, 10, 15];
export interface StdData {
  items: any[];
  total: number;
}
interface TabsBaseProps {
  getter: useFetchReturnType<StdData>;
}

const RecipientGrid = ({ getter }: TabsBaseProps) => {
  const styles = useStyles();
  const [loopSource, setLoopSource] = useState<LoopSource>("all");
  const { windowDimensions } = useWindowDimensions();
  const { wait } = useWaiter(0);
  const win = new Win(windowDimensions);
  const [dateRange, setDateRange] = useState<DateRange>({
    start: null,
    end: null,
  });
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[1]);
  const [page, setPage] = useState(1);
  const [noItems, setNoItems] = useState(true);
  const [packagesToShow, setPackagesToShow] = useState([]);
  
  const columns: GridColDef[] = [
    { field: 'name', headerName: "Name", width: 350 , disableColumnMenu:true},
    { field: 'org', headerName: 'Organization', width: 350, disableColumnMenu:true},
    { field: 'contact', headerName: 'Contact Info', width: 350, disableColumnMenu:true}
  ];

  const user = useAppSelector((state) => state.user.user);
  
  useEffect(() => {
    if (noItems && getter.data?.total) {
      setNoItems(false);
    }
  }, [getter.data]);

  useDateTypeFilterAndPagination({
    getter,
    page,
    dateRange,
    loopSource,
    setPage,
  });

  useEffect(() => {
    const dataItems = getter.data ? getter.data.items : [];
    if (dataItems.length > 0) {
        const listOfItems = [] as any;
        dataItems.map((items, i) => {
            const recName = items.recipient.name 
            const recCompany = items.recipient.company;
            const recContact = items.recipient.email
            listOfItems.push({
              id: i+1,
              name: recName,
              org: recCompany,
              contact: recContact
            })
        })
        setPackagesToShow(listOfItems)
    }
    else {
      setPackagesToShow([])
    }
  }, [getter.data, user]);

  return (
    <div className={styles.right}>
      <h2 className={styles.packageMainHead}>Recipients</h2>
      <div className={styles.packageBox}>
      <div className={styles.packagesHead}>
        <div className={styles.pckgHeadOne}>
          <h3 className={styles.pckgHeadTitle}>Reports</h3>
        </div>
        <div className={styles.pckgHeadTwo}>
          <TextField
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            className={styles.recipientSearch}
          />
        <div
          className="dropdowns"
          style={{ display: noItems ? "none" : "inline-block" }}
        >
          <FilterDropdowns
            loopSource={loopSource}
            setLoopSource={setLoopSource}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
        </div>
        <TextField
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          className={styles.recipientSearchMobile}
        />
        </div>
      </div>
      {wait || getter.loading ? (
        <div style={{ paddingTop: "3rem" }}>
          <MyLoader loaded={!getter.loading} />
        </div>
      ) : (getter.data?.items  && packagesToShow !== null) ? (
        <>
          <UPadWrapper>
            <>
                <div style={{ height: 520, width: '100%' }}>
                <DataGrid rows={packagesToShow} columns={columns} hideFooter={true}/>
                </div>

                <div className={styles.packagePagination}>
                  <Pagination
                    totalItems={getter.data.total}
                    itemsPerPageOptions={itemsPerPageOptions}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    page={page}
                    setPage={setPage}
                  />
                </div>
            </>
          </UPadWrapper>
        </>
      ) : (
        <div
          style={{
            padding: 20,
          }}
        >
          <MessageCard type="warning">Some error occured</MessageCard>
        </div>
      )}
      </div>
    </div>
  );
};
export default RecipientGrid;
const useStyles = makeStyles((theme) => ({
  right: {
    marginLeft: 250,
    padding: "3rem 3rem",
    // border: "2px solid blue",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      padding: "0",
    },
    "& .dropdowns": {
      paddingTop: "0rem",
      marginTop: "-5px",
      [theme.breakpoints.down("sm")]: {
        padding: "0px 0px 15px 0px",
        width: "100%",
      },
    },
    "& .top": {
      display: "flex",
      justifyContent: "space-between",
      padding: "1.5rem 4%",
      "& .head": {
        fontSize: "1.3rem",
        fontWeight: "500",
      },
    },
    "& .noLoopsMessage": {
      textAlign: "center",
      fontSize: 20,
      marginTop: "4rem",
    },
    packagesGrid: {
      marginBottom: "20px"
    }
  },
  rest: {
    "& .cards": {
      // border: "1px solid red",
      padding: "3rem 0",
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 40,
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "repeat(2, 1fr)",
      },
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "repeat(1, 1fr)",
      },
    },
  },
  packageBox: {
    border: "1px solid #DFDFDF",
  },
  packagesHead: {
    display: "block",
    overflow: "auto",
    [theme.breakpoints.up("md")]: {
      padding: "20px 20px 0px 20px"
    },
  },
  pckgHeadOne: {
    display: "inline-block",
    width: "25%",
    [theme.breakpoints.down("sm")]: {
        display: "none",
      },
  },
  pckgHeadTwo: {
    marginBottom: "15px",
    [theme.breakpoints.up("md")]: {
      display: "inline-block",
      width: "75%",
      textAlign: "right"
    },
    [theme.breakpoints.down("sm")]: {
      padding: "15px"
    },
  },
  pckgHeadTitle: {
    display: "inline-block",
    fontSize: "20px",
    fontWeight: 600    
  },
  pckgHeadAction: {
    border: "1px solid #797979",
    color: "#797979",
    padding: "5px",
    fontSize: "12px",
    borderRadius: "2px",
    cursor: "pointer",
    marginLeft: "20px"
  },
  packagePagination: {
    marginTop: "20px"
  },
  packageMainHead: {
    fontSize: "22px",
    fontWeight: 500,
    
    [theme.breakpoints.down("md")]: {
      padding: "15px",
    },
    [theme.breakpoints.up("md")]: {
      marginBottom: "35px",
    },
  },
  recipientSearch: {
    height: "42px",
    border: "0px",
    borderRadius: "5px",
    background: "#DFDFDF",
    padding: "5px",
    fontSize: "16px",
    display: "inline-block",
    width: "25%",
    marginRight: "20px",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
    "& .MuiInput-underline:after , .MuiInput-underline:before": {
      display: "none",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "0px"
    },
  },
  recipientSearchMobile: {
    height: "42px",
    border: "0px",
    borderRadius: "5px",
    background: "#fff",
    padding: "5px",
    fontSize: "16px",
    "& .MuiInput-underline:after": {
      display: "none",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "0px"
    },
    "& .MuiInput-underline:after , .MuiInput-underline:before": {
      display: "none",
    },
    [theme.breakpoints.up("md")]: {
      display: "none"
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
  }
}));
