import React, { Component } from 'react'
import HomeSearchBar from './HomeSearchBar'
import DoctorSearchCard from './DoctorSearchCard'


export default class HomePage extends Component {

    // state = {
    //     doctors: 
    //     filteredDoctors: [],
    //   }

      
    handleSearch = (e) => {
        const docSearch = e.currentTarget.name
        const docSearchValue = e.currentTarget.value

        let result = [];
        console.log(docSearch)
        console.log(docSearchValue)
        // console.log(speciality.value)
        // console.log(city.value)

    }



    render() {
        return (
            <>                               

                <h1>Hello on Index</h1>

                <HomeSearchBar onSearch={this.handleSearch} />
                <DoctorSearchCard />
                
            </>
        )
    }
}
