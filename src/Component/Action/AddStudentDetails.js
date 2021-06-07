import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import '../../App.css';
import moment from 'moment';
import { Multiselect } from "multiselect-react-dropdown";

const StudentDetails = () => {
    let history = useHistory();
    const [user, setUser] = useState({
        name: "",
        dob: moment().format(),
        gender: "",
        courseOptions:  [
            {key: 1, cat: "Bachelor of Technology"},
            {key: 2, cat: "Bachelor in Hotel Management"},
            {key: 3, cat: "MBA"},
            {key: 4, cat: "Bachelor of Communication"}
          ],
        course:[]
    });

    const { name, dob, gender, course } = user;
    const onInputChange = e => {
        const format = 'YYYY/MM/DD'; // Your date format
        const resultFormat = 'years' // Result format (years, months, days)

        const age = moment().diff(moment(e.target.value, format), resultFormat, true);
        if (age < 8) {
          alert("Age must be greater than 8")
        }
       else{ setUser({ ...user, [e.target.name]: e.target.value }); }
    };
     
   const onSelect = (selectedList, selectedItem) => {
       let selectedOptions = [];
       selectedList.map((options) => {
           selectedOptions.push(options)
       })
       setUser({ ...user, course: selectedOptions });
    }
    const onSubmit = async e => {
        e.preventDefault();
        const format = 'YYYY/MM/DD'; // Your date format
        const resultFormat = 'years' // Result format (years, months, days)

        const age = moment().diff(moment(dob, format), resultFormat, true);
        const data = {
            "name": name,
            "gender": gender,
            "dob": dob,
            "age": Math.round(age),
            "course":course
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        fetch('http://localhost:3001/students', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
              })
              .catch((error) => {
                console.error('Error:', error);
              });
            
        fetch('http://localhost:3001/students')
              .then(response => response.json())
              history.push('/');
    };
    return (
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Add Student</h2>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="form-group mb-2">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Your Name"
                            name="name"
                            value={name}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group mb-2">
                      <input 
                        type="date"
                        name="dob"  
                        value={dob}
                        data-placeholder="DD/MM/YYYY" 
                        aria-required="true"
                        required
                        class="form-control datePicker"
                        onChange={e => onInputChange(e)} 
                        />

                    </div>
                    <div className="form-group mb-2">
                        <span className="text">Gender</span><br />
                        <label class="radio-inline text">
                            <input
                                type="radio"
                                value="Male"
                                name="gender"
                                checked={gender === "Male"}
                                onChange={e => onInputChange(e)}
                            />
                            {` Male`}
                        </label>
                        <label class="radio-inline text">
                            <input
                                type="radio"
                                value="Female"
                                name="gender"
                                checked={gender === "Female"}
                                onChange={e => onInputChange(e)}
                            />
                            {` Female`}
                        </label>
                        <label class="radio-inline text">
                            <input
                                type="radio"
                                value="Other"
                                name="gender"
                                checked={gender === "Other"}
                                onChange={e => onInputChange(e)}
                            />
                            {` Other`}
                        </label>
                    </div>
                    <div className="form-group mb-2">
                        <strong>Select Course:</strong>
                        <Multiselect
                            options={user.courseOptions} // Options to display in the dropdown
                            onSelect={onSelect} // Function will trigger on select event
                            displayValue="cat" // Property name to display in the dropdown options
                        />
                    </div>
                   
                    <button className="btn btn-primary btn-block">Add User</button>
                </form>
            </div>
        </div>
    );
};

export default StudentDetails;