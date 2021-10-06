import UPadWrapper from "@components/Shared/UPadWrapper";
import MyLoader from "@components/Shared/MyLoader";
import { useDateTypeFilterAndPagination } from "@components/Dashboard/Tabs/useDateTypeFilterAndPagination";
import { makeStyles } from "@material-ui/core";
import ListenClickAtParentElement from "@components/Shared/ListenClickAtParentElement";
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
import moment from "moment";
import PackagesIcon from "@components/Shared/PackagesIcon";
import { randomMemoizedColor } from "@helpers/utils";
import { openModal } from "@store/slices/modalSlice";
import Link from "next/link";

export const itemsPerPageOptions = [5, 10, 15];
export interface StdData {
  items: any[];
  total: number;
}
interface TabsBaseProps {
  getter: useFetchReturnType<StdData>;
}

const PackageGrid = ({ getter }: TabsBaseProps) => {
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
    { field: 'receiver', headerName: "Receiver's info", width: 260 , disableColumnMenu:true},
    { field: 'date', headerName: 'Date Created', width: 260, disableColumnMenu:true},
    { field: 'contact', headerName: 'Contact info', width: 260, disableColumnMenu:true},
    { 
      field: 'looper',
      headerName: 'Loopers',
      width: 260, 
      disableColumnMenu:true, 
      renderCell(cellValues) {
        if(cellValues?.row?.looper) {
          const loopersName = cellValues?.row?.looper
          return (
            <PackagesIcon
                firstAlphabets={loopersName.map((item: any) =>
                  item.name[0].toUpperCase()
                )}
                colorStrings={loopersName.map((itm: any) =>
                  randomMemoizedColor(itm.name + itm.email)
                )}
              />
          )
        }
        return (
          <b>{cellValues.row.looper}</b>
        )
      }
    },
    { 
      field: 'detail',
      headerName: 'Detail',
      width: 50, 
      disableColumnMenu:true, 
      renderCell(cellValues) {
        console.log(cellValues?.row)
        return (
          <Link href={`/detail?loopId=${cellValues.row.loopId}`}>View</Link>
        )
      }
    }
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
            const recipientInfo = items.recipient.name + ", " + items.recipient.company
            const dateCreated = moment(items.updatedAt).format("MM/DD/YYYY");
            const contactInfo = items.recipient.email
            const loopId = items.loopid
            const loopersList = [] as any;
            items.loopers.map((looper: any) => {
                loopersList.push(looper)
            })
            listOfItems.push({
              id: i+1,
              receiver: recipientInfo,
              date: dateCreated,
              contact: contactInfo,
              looper: loopersList,
              loopId: loopId
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
      <h2 className={styles.packageMainHead}>Packages</h2>
      <div className={styles.packageBox}>
      <div className={styles.packagesHead}>
        <div className={styles.pckgHeadOne}>
          <h3 className={styles.pckgHeadTitle}>Reports</h3>
          {ListenClickAtParentElement(
                  (e) => {
                    openModal(e, {
                      translationsFrom: "element",
                      positionWRTPoint: {
                        bottom: true,
                        right: true,
                      },
                      translations: {
                        y: -145,
                        x: 10,
                      },
                    });
                  },
                  (childClick) => (
                    <button type='button' onClick={childClick} className={styles.pckgHeadAction}>+ Create Loopreceipt</button>
                  )
                )}
          
        </div>
        <div className={styles.pckgHeadTwo}>
        <div
          className="dropdowns"
          style={{ display: noItems ? "none" : "block" }}
        >
          <FilterDropdowns
            loopSource={loopSource}
            setLoopSource={setLoopSource}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
        </div>
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
                <DataGrid rows={packagesToShow} columns={columns} hideFooter={true} />
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
export default PackageGrid;
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
      padding: "0 4%",
      paddingTop: "0rem",
      [theme.breakpoints.down("md")]: {
        paddingTop: "1rem",
        paddingBottom: "1rem",
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
      padding: "20px 0px 0px 20px"
    },
  },
  pckgHeadOne: {
    display: "inline-block",
    width: "40%",
    padding: "25px 0px 25px 0px",
    [theme.breakpoints.down("sm")]: {
        display: "none",
      },
  },
  pckgHeadTwo: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      display: "inline-block",
      width: "60%",
      float: "right"
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
  }
}));
