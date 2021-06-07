import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import '../../App.css';
import moment from 'moment';
import { Multiselect } from "multiselect-react-dropdown";

const EditStudentDetails = () => {
    let history = useHistory();
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:3001/students/${id}`)
        .then(response => response.json())
        .then(data => {
            const formattedData = {
                name: data.name,
                dob: moment(data.dob).format("YYYY-MM-DD"),
                gender: data.gender,
                course: data.course
            }
            debugger
           setUser(formattedData);
        })
    }, [])
    const [user, setUser] = useState({
        name: "",
        dob: "",
        gender: "",
        course:[]
    });
    const [options, setOptions] = useState({
        courseOptions:  [
            {key: 1, cat: "Bachelor of Technology"},
            {key: 2, cat: "Bachelor in Hotel Management"},
            {key: 3, cat: "MBA"},
            {key: 4, cat: "Bachelor of Communication"}
          ],
    })
    debugger
    const { name, dob, gender, course } = user;
    const onInputChange = e => {
        const format = 'YYYY/MM/DD'; // Your date format
        const resultFormat = 'years' // Result format (years, months, days)

        const age = moment().diff(moment(e.target.value, format), resultFormat, true);
        if (age < 8) {
          alert("Age must be greater than 8")
        }
       else{  setUser({ ...user, [e.target.name]: e.target.value }); }
       
    };
     

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
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        fetch(`http://localhost:3001/students/${id}`, requestOptions)
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
    // var someDate = dob;
    // var numberOfDaysToAdd = 3;
    // console.log(someDate,"someDatesomeDate")
    // var date = someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
    return (
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Add Student Details</h2>
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
                        defaultValue={dob == "" ? "" : moment(dob).format("YYYY-MM-DD")}
                        data-placeholder="DD/MM/YYYY" 
                        aria-required="true"
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
                        {console.log(user)}
                        <strong>Select Course:</strong>
                        
                        <Multiselect
                            options={options.courseOptions}
                            selectedValues={user.course} // Function will trigger on select event
                            displayValue="cat"
                        />
                    </div>
                   
                    <button className="btn btn-primary btn-block">Update User</button>
                </form>
            </div>
        </div>
    );
};

export default EditStudentDetails;