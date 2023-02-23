import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@material-ui/core";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Sale distribution of the packs ",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};
var back_from_the_dead_01 = [];
var rise_of_the_dead_01 = [];
var the_undead_mob_01 = [];
var the_kings_army_01 = [];
var kingsmen_skirmishers_01 = [];
var medieval_mayhem_01 = [];

var Date = [];

var lowest = Number.POSITIVE_INFINITY;
var highest = Number.NEGATIVE_INFINITY;
var tempnamelow;
var tempnamehigh;

var lowestD = Number.POSITIVE_INFINITY;
var highestD = Number.NEGATIVE_INFINITY;
var tempnamelowD;
var tempnamehighD;

export const AnalyticsPage = () => {
  const [Sales, setSales] = useState();
  const navigate = useNavigate();
  var group = [];
  useEffect(() => {
    const fetchData = () => {
      var config1 = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://test.indusgame.com/sales",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        },
      };

      axios(config1)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setSales(response.data);
          response.data.map(function (d) {
            Date.push(d.date);
            d.packs.map((e) => {
              if (e.id === "back_from_the_dead_01") {
                back_from_the_dead_01.push(e.quantity);
              } else {
                back_from_the_dead_01.push(0);
              }
              if (e.id === "rise_of_the_dead_01") {
                rise_of_the_dead_01.push(e.quantity);
              } else {
                rise_of_the_dead_01.push(0);
              }
              if (e.id === "the_undead_mob_01") {
                the_undead_mob_01.push(e.quantity);
              } else {
                the_undead_mob_01.push(0);
              }
              if (e.id === "the_kings_army_01") {
                the_kings_army_01.push(e.quantity);
              } else {
                the_kings_army_01.push(0);
              }
              if (e.id === "kingsmen_skirmishers_01") {
                kingsmen_skirmishers_01.push(e.quantity);
              } else {
                kingsmen_skirmishers_01.push(0);
              }
              if (e.id === "medieval_mayhem_01") {
                medieval_mayhem_01.push(e.quantity);
              } else {
                medieval_mayhem_01.push(0);
              }
            });
          });

          Sales.map((data) => {
            var groupObj = data.packs.reduce(
              (r, { id, quantity }) => ((r[id] = (r[id] || 0) + quantity), r),
              {}
            );
            group = Object.keys(groupObj).map((key) => ({
              id: key,
              quantity: groupObj[key],
            }));
          });
          console.log(group, "test");

          var tmp;
          var tmpD;

          for (var i = group.length - 1; i >= 0; i--) {
            tmp = group[i].quantity;
            if (group[i].id === "kingsmen_skirmishers_01") {
              tmpD = group[i].quantity * 4.99;
            }
            if (group[i].id === "the_undead_mob_01") {
              tmpD = group[i].quantity * 4.99;
            }
            if (group[i].id === "medieval_mayhem_01") {
              tmpD = group[i].quantity * 9.99;
            }
            if (group[i].id === "back_from_the_dead_01") {
              tmpD = group[i].quantity * 4.99;
            }
            if (group[i].id === "the_kings_army_01") {
              tmpD = group[i].quantity * 24.99;
            }

            if (tmpD < lowestD) {
              lowestD = tmpD;
              tempnamelowD = group[i].id;
            }
            if (tmpD > highestD) {
              highestD = tmpD;
              tempnamehighD = group[i].id;
            }

            if (tmp < lowest) {
              lowest = tmp;
              tempnamelow = group[i].id;
            }
            if (tmp > highest) {
              highest = tmp;
              tempnamehigh = group[i].id;
            }
          }
          console.log(highest, tempnamehigh, "and", lowest, tempnamelow);
          console.log(highestD, tempnamehighD, "and", lowestD, tempnamelowD);
        })
        .catch(function (error) {
          console.log(error, "error in fetch table data");
          var data = JSON.stringify({
            refreshToken: window.localStorage.getItem("refreshToken"),
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
                response.data.refreshToken
              );
              fetchData();
            })
            .catch(function (error) {
              localStorage.removeItem("user");
              navigate("/", { replace: true });
              console.log(error);
            });
        });
    };
    fetchData();
  }, []);
  const labels = Date;
  const data = {
    labels,
    datasets: [
      {
        label: "back_from_the_dead_01",
        data: back_from_the_dead_01,
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "rise_of_the_dead_01",
        data: rise_of_the_dead_01,
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "the_undead_mob_01",
        data: the_undead_mob_01,
        backgroundColor: "rgb(53, 162, 235)",
      },
      {
        label: "the_kings_army_01",
        data: the_kings_army_01,
        backgroundColor: "rgb(50, 168, 82)",
      },
      {
        label: "kingsmen_skirmishers_01",
        data: kingsmen_skirmishers_01,
        backgroundColor: "rgb(58, 50, 168)",
      },
    ],
  };

  return (
    <div style={{ margin: "1rem" }}>
      <Grid container spacing={1}>
        <Grid item xs>
          <Card sx={{ minWidth: 200 }}>
            <div style={{ backgroundColor: "pink" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {highest} of {tempnamehigh}
                </Typography>
                <Typography variant="body2">
                  Most sold pack from the quantity perspective
                  <br />
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs>
          <Card sx={{ minWidth: 200 }}>
            <div style={{ backgroundColor: "yellow" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {lowest} of {tempnamelow}
                </Typography>
                <Typography variant="body2">
                  least sold pack from the quantity perspective
                  <br />
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs>
          <Card sx={{ minWidth: 200 }}>
            <div style={{ backgroundColor: "Gray" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {highestD} $ of {tempnamehighD}
                </Typography>
                <Typography variant="body2">
                  most sold pack from the USD perspective
                  <br />
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs>
          <Card sx={{ minWidth: 200 }}>
            <div style={{ backgroundColor: "green" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {lowestD} $ of {tempnamelowD}
                </Typography>
                <Typography variant="body2">
                  least sold pack from the USD perspective
                  <br />
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
      </Grid>

      <Bar options={options} data={data} />
      {console.log(data)}
    </div>
  );
};
