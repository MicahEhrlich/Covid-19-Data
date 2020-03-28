import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Container } from '@material-ui/core';
import { Chart } from '@bit/primefaces.primereact.chart';
import Button from '@material-ui/core/Button';

import FavoriteIcon from '@material-ui/icons/Favorite';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import SentimentDissatisfiedRoundedIcon from '@material-ui/icons/SentimentDissatisfiedRounded';
import Paper from '@material-ui/core/Paper';

import { green, red, yellow } from '@material-ui/core/colors';

import { COUNTRIES_DATA_API, TOTAL_CASES_API } from '../../constants';

const Home = () => {
  const [data, setData] = useState({});
  const [unsortedData, setUnsortedData] = useState([]);
  const [total, setTotal] = useState([]);

  const sortDataByDeaths = () => {
    unsortedData.sort((a, b) => (a.deaths < b.deaths ? 1 : -1));

    let labels = [];
    let deaths = [];

    for (let i = 0; i < 9; i++) {
      labels.push(unsortedData[i].countryregion);
      deaths.push(unsortedData[i].deaths);
    }

    let colors = [];
    for (let i = 0; i < 10; i++) {
      colors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }

    labels.push('Others');

    deaths.push(total.deaths - deaths.reduce((a, b) => a + b, 0));

    let tempData = {
      labels: labels,
      datasets: [
        {
          data: deaths,
          backgroundColor: colors,
          hoverBackgroundColor: colors
        }
      ]
    };
    setData(tempData);
  };

  const sortDataByRecovered = () => {
    unsortedData.sort((a, b) => (a.recovered < b.recovered ? 1 : -1));

    let labels = [];
    let recovered = [];

    for (let i = 0; i < 9; i++) {
      labels.push(unsortedData[i].countryregion);
      recovered.push(unsortedData[i].recovered);
    }

    let colors = [];
    for (let i = 0; i < 10; i++) {
      colors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }

    labels.push('Others');

    recovered.push(total.recovered - recovered.reduce((a, b) => a + b, 0));

    let tempData = {
      labels: labels,
      datasets: [
        {
          data: recovered,
          backgroundColor: colors,
          hoverBackgroundColor: colors
        }
      ]
    };
    setData(tempData);
  };

  const sortDataByConfirmed = () => {
    let labels = [];
    let confirmed = [];

    // sort our data by confiremd
    unsortedData.sort((a, b) => (a.confirmed < b.confirmed ? 1 : -1));

    for (let i = 0; i < 9; i++) {
      labels.push(unsortedData[i].countryregion);
      confirmed.push(unsortedData[i].confirmed);
    }

    labels.push('Others');

    confirmed.push(total.confirmed - confirmed.reduce((a, b) => a + b, 0));

    let colors = [];
    for (let i = 0; i < 10; i++) {
      colors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }

    let tempData = {
      labels: labels,
      datasets: [
        {
          data: confirmed,
          backgroundColor: colors,
          hoverBackgroundColor: colors
        }
      ]
    };
    setData(tempData);
  };

  const getCoronaData = async () => {
    const resTotal = await axios.get(TOTAL_CASES_API);
    setTotal(resTotal.data);

    const res = await axios.get(COUNTRIES_DATA_API);
    setUnsortedData(res.data);

    let labels = [];
    let confirmed = [];

    // sort our data by confiremd
    res.data.sort((a, b) => (a.confirmed < b.confirmed ? 1 : -1));

    for (let i = 0; i < 9; i++) {
      labels.push(res.data[i].countryregion);
      confirmed.push(res.data[i].confirmed);
    }

    labels.push('Others');

    console.log(resTotal.data.confirmed - confirmed.reduce((a, b) => a + b, 0));

    confirmed.push(
      resTotal.data.confirmed - confirmed.reduce((a, b) => a + b, 0)
    );

    let colors = [];
    for (let i = 0; i < 10; i++) {
      colors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }

    let tempData = {
      labels: labels,
      datasets: [
        {
          data: confirmed,
          backgroundColor: colors,
          hoverBackgroundColor: colors
        }
      ]
    };
    setData(tempData);
  };

  useEffect(() => {
    getCoronaData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Container>
        <div className='world-total'>
          <Button onClick={sortDataByConfirmed}>
            <Paper
              style={{
                backgroundColor: 'goldenrod',
                minWidth: 100,
                marginLeft: '6px',
                paddingRight: '4px',
                marginRight: '10px'
              }}
              elevation={3}>
              <div>
                <h3>
                  <LocalHospitalIcon
                    fontSize='large'
                    style={{ color: yellow[500] }}
                  />
                  Confirmed {total.confirmed}
                </h3>
              </div>
            </Paper>
          </Button>
          <Button onClick={sortDataByDeaths}>
            <Paper
              onClick={sortDataByDeaths}
              style={{
                backgroundColor: 'darkred',
                minWidth: 100,
                paddingRight: '4px',
                marginRight: '10px'
              }}
              elevation={3}>
              <div>
                <h3>
                  <SentimentDissatisfiedRoundedIcon
                    fontSize='large'
                    style={{ color: red[500] }}
                  />
                  Deaths {total.deaths}
                </h3>
              </div>
            </Paper>
          </Button>
          <Button onClick={sortDataByRecovered}>
            <Paper
              style={{
                backgroundColor: 'green',
                minWidth: 100,
                paddingRight: '4px',
                marginRight: '10px'
              }}
              elevation={3}>
              <div>
                <h3>
                  <FavoriteIcon
                    fontSize='large'
                    style={{ color: green[500] }}
                  />
                  Recovered {total.recovered}
                </h3>
              </div>
            </Paper>
          </Button>
        </div>
        <div>
          <Chart type='pie' data={data} />
        </div>
      </Container>
    </div>
  );
};

export default Home;
