import React from "react";
import { Cards, Chart, CountryPicker, NavBar } from "./components";
import styles from "./App.module.css";
import { fetchData, fetchDistricts } from "./api/api";
import { fetchStates } from "./api/api";

class Dashboard extends React.Component {
  state = {
    data: {},
    country: '60ed9fa52e6270563025e445', //Global ID
    state: '',
    district: '',
    statelist:[],
    districtlist:[]
  };


  async componentDidMount() {
    const fetchedData = await fetchData('country', this.state.country);
    this.setState({ ...this.state, data: fetchedData });
    const fetchedstate=await fetchStates(this.state.country);
    this.setState({...this.state, statelist:fetchedstate});
  }

  handleCountryChange=async(country)=>{
    const fetchedData=await fetchData('country',country);
    this.setState({ data: fetchedData, country: country, state: '', district: '', statelist:[], districtlist:[]});
    const fetchedstate=await fetchStates(country);
    this.setState({...this.state, statelist:fetchedstate});
    //this.handleStateChange(country,"");
    // this.setState({state:""});
    //this.setState({district:""});
  }

  handleStateChange=async(country,state)=>{
    const fetchedData=await fetchData('state',state);
    this.setState({ data: fetchedData, country: country, state: state });
    const fetcheddistrict=await fetchDistricts(state);
    this.setState({...this.state, districtlist:fetcheddistrict});
    //console.log(this.districtlist);
    this.setState({...this.state, district:""});
  }

  handleDistrictChange=async(country,state,district)=>{
    const fetchedData=await fetchData('district',district);
    this.setState({ ...this.state, data: fetchedData, district: district });
  }
  
  render() {
    const { data,country,state,district,statelist,districtlist } = this.state;
    console.log(data, country);
    return (
      <>
        <NavBar />
        <div className={styles.container}>  
          <Cards data={data} />
          <CountryPicker handleCountryChange={this.handleCountryChange} handleStateChange={this.handleStateChange} handleDistrictChange={this.handleDistrictChange}state={state} country={country} statelist={statelist} districtlist={districtlist}/>
          <Chart data={data} country={country} state={state} district={district}/>
        </div>
      </>
    );
  }
}

export default Dashboard;
