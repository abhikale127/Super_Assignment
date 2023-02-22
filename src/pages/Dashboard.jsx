import React, { useState, useEffect } from "react";
import { forwardRef } from "react";
import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import Avatar from '@mui/material/Avatar';



const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};


function Dashboard() {
  var columns = [
    { title: "id", field: "id" },
    {
      title: "Avatar",
      render: (rowData) => (
        <Avatar alt="Remy Sharp" src={rowData.imageUrl} />
      ),
    },
    { title: "Name", field: "name" ,editable: 'never', },
    { title: "Description", field: "description", editable: 'never',},
    { title: "ability", field: "ability.name" ,editable: 'never',},
    { title: "Type", field: "type",editable: 'never', },
    { title: "Role", field: "role" , editable: 'never',},
    { title: "Faction", field: "faction",editable: 'never', },
    { title: "Qoulity", field: "quality" },
    { title: "Health", field: "health" },
    { title: "AttackType", field: "attackType" },
    { title: "attackRangeType", field: "attackRangeType" },
    { title: "attackTargetType", field: "attackTargetType" },
    { title: "maxTargetCount", field: "maxTargetCount" },
    { title: "movementSpeedType", field: "movementSpeedType" },
    { title: "spawnCost", field: "spawnCost" },
    { title: "spawnCooldownInSeconds", field: "spawnCooldownInSeconds" },
  
  
  ];
  const [data, setData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
   
    const fetchData = () => {
      var qs = require('qs');
    var data = qs.stringify({
       
    });
    var config = {
      method: 'get',
    maxBodyLength: Infinity,
      url: 'https://test.indusgame.com/units',
      headers: { 
        'Authorization': `Bearer ${window.localStorage.getItem("accessToken")}`
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
     
      setData(response.data);
    })
    .catch(function (error) {
      console.log(error, "error in fetch table data");
      var data = JSON.stringify({
        refreshToken:  window.localStorage.getItem("refreshToken"),
      
      });

      var config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://test.indusgame.com/auths",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
       console.log("refreshed");   
          console.log(JSON.stringify(response.data));
          window.localStorage.setItem(
            "accessToken",
            response.data.accessToken
          );

          window.localStorage.setItem(
            "refreshToken",
            response.data.accessToken
          );
          fetchData();
        })
        .catch(function (error) {
          console.log(error);
        });
   
    });  
    }
    fetchData();
    
  }, []);

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = []; 
    console.log(newData);
    if (errorList.length < 1) {
       
var config = {
  method: 'patch',

maxBodyLength: Infinity,
  url: `https://test.indusgame.com/units/${newData.id}`,
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpIjoiYWJoaXNoZWsua2FsZSIsImV4cCI6MTY3NzA1NTIxMywiaXNzIjoiaSIsImF1ZCI6ImkifQ._1jY6ij1eqTg7_ZIbdQqYJLCfDWZcNlHVc4znVy5U8M', 
    'Content-Type': 'application/json'
  },
  data :{
    "id": newData.id,
    "quality": newData.quality,
    "health": newData.health,
    "attack": newData.attack,
    "maxTargetCount": newData.maxTargetCount,
    "spawnCost": newData.spawnCost,
    "spawnCooldownInSeconds": newData.spawnCooldownInSeconds
  }
};

axios(config)
        
        axios(config)
        .then((res) => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
        })
        .catch((error) => {
          setErrorMessages(["Update failed! Server error"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };
// code can be use to add units
  // const handleRowAdd = (newData, resolve) => {
  //   //validation
  //   let errorList = [];
  //   if (newData.first_name === undefined) {
  //     errorList.push("Please enter first name");
  //   }
  //   if (newData.last_name === undefined) {
  //     errorList.push("Please enter last name");
  //   }
  //   if (newData.email === undefined || validateEmail(newData.email) === false) {
  //     errorList.push("Please enter a valid email");
  //   }

  //   if (errorList.length < 1) {
  //     //no error
  //     api
  //       .post("/users", newData)
  //       .then((res) => {
  //         let dataToAdd = [...data];
  //         dataToAdd.push(newData);
  //         setData(dataToAdd);
  //         resolve();
  //         setErrorMessages([]);
  //         setIserror(false);
  //       })
  //       .catch((error) => {
  //         setErrorMessages(["Cannot add data. Server error!"]);
  //         setIserror(true);
  //         resolve();
  //       });
  //   } else {
  //     setErrorMessages(errorList);
  //     setIserror(true);
  //     resolve();
  //   }
  // };

  // const handleRowDelete = (oldData, resolve) => {
  //   api
  //     .delete("/users/" + oldData.id)
  //     .then((res) => {
  //       const dataDelete = [...data];
  //       const index = oldData.tableData.id;
  //       dataDelete.splice(index, 1);
  //       setData([...dataDelete]);
  //       resolve();
  //     })
  //     .catch((error) => {
  //       setErrorMessages(["Delete failed! Server error"]);
  //       setIserror(true);
  //       resolve();
  //     });
  // };

  return (
    <div className="App" style={{margin:"1rem"}}>
      <Grid container spacing={1}>
    
        <Grid item xs={12}>
          <div>
            {iserror && (
              <Alert severity="error">
                {errorMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>;
                })}
              </Alert>
            )}
          </div>
          <MaterialTable
            title="List all the available units"
            columns={columns}
            data={data}
            icons={tableIcons}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  handleRowUpdate(newData, oldData, resolve);
                }),
          
            }}
          />
        </Grid>
      
      </Grid>
    </div>
  );
}

export default Dashboard;
