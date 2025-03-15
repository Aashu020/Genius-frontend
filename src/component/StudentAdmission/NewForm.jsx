import React, { useState } from 'react'
import {
    MainDashboard,
    Title,
    Form,
    Main,
    InputContainer,
    Label,
    Input,
    Select,
    Wrapper,
    StyledTable,
    HeaderCell,
    BodyCell,
    SubmitButton,
    StatusButtonP,
    StatusButtonA,
    StatusButtonL,
    FormContainer,
    // ToastContainer,
} from '../../Style/Index';
import RequireSymbol from '../RequireSymbol';
import { Step,StepIndicatorContainer,Section,StyledInput,InputContainer1,StepContent,Heading } from './StudentAdmission';
// import {Toas}
import { ToastContainer } from 'react-toastify';
const NewForm = () => {
    const [formData, setFormData] = useState({
        StudentName: '',
        StudentId: '',
        DOB: '',
        Gender: '',
        Religion: '',
        BloodGroup: '',
        Category: '',
        Height: '',
        Weight: '',
        AadharNumber: '',
        MobileNo: '',
        House: '',
        Email: '',
        Address: '',
        City: '',
        Area: '',
        Pincode: '',
        AdmissionDate: '',
        Stream: '',
        AdmissionInClass: '',
        Section: '',
        FeeCategory: '',
        RollNo: '',
        LastSchoolAttended: '',
        IdentificationMark: '',
        SourceOfAdmission: '',
        TransportNeeded: false,
        Route: '',
        FeeDiscount: '',
        BankName: '',
        BankAccountNumber: '',
        IFSC: '',
        Disability: false,
        DisabilityName: '',
        Discount: '',
        Orphan: false,
        SiblingStatus: false,
        Sibling: {
            Id: '',
            Status: false,
        },
        Subject: [],
        FatherDetail: {
            Name: '',
            Qualification: '',
            Occupation: '',
            AnnualIncome: '',
            AadharNumber: '',
            MobileNo: '',
            EmailId: '',
        },
        MotherDetails: {
            Name: '',
            Qualification: '',
            Occupation: '',
            AnnualIncome: '',
            AadharNumber: '',
            MobileNo: '',
            EmailId: '',
        },
        EmergencyContact: {
            Name: '',
            Relation: '',
            MobileNo: '',
        },
        Document: {
            StudentPhoto: '',
            Birth: '',
            Leaving: '',
            FatherPhoto: '',
            MotherPhoto: '',
        },
    });

    const [tab, setTab] = useState("Basic");

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === 'file') {
            // Handle file inputs
            setFormData(prevData => ({
                ...prevData,
                Document: {
                    ...prevData.Document,
                    [name]: files[0], // Store the first file selected
                },
            }));
        } else if (name.includes('.')) {
            // Handle nested objects
            const keys = name.split('.');
            setFormData(prevData => ({
                ...prevData,
                [keys[0]]: {
                    ...prevData[keys[0]],
                    [keys[1]]: type === 'checkbox' ? checked : value,
                },
            }));
        } else {
            // Handle regular inputs
            setFormData(prevData => ({
                ...prevData,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (const key in formData.Document) {
            formDataToSend.append(key, formData.Document[key]);
        }

        // Here you can append other fields if needed
        // formDataToSend.append('otherField', formData.otherField);

        // Example API call
        console.log('Submitted Data:', formDataToSend);
        // Send formDataToSend to your backend via fetch/axios
    };

    const handelTabChange = (value) => {
        setTab(value);
    }

    return (
        <>
            {tab === "Basic" ?
                <>
                    <MainDashboard>
                        <FormContainer>
                            <Title>Add Student</Title>
                            <RequireSymbol />
                            <StepIndicatorContainer>
                                <Step active>
                                    <StepContent>Student Details</StepContent>
                                </Step>
                                <Step>
                                    <StepContent>Family Details</StepContent>
                                </Step>
                                <Step>
                                    <StepContent>Documents</StepContent>
                                </Step>
                            </StepIndicatorContainer>

                            <Form onSubmit={handleSubmit}>
                                <ToastContainer />
                                <Section>
                                    <Heading>Personal Information</Heading>
                                    <InputContainer1>
                                        <Label>Search Enquiry</Label>
                                        <StyledInput
                                            type="text"
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            onBlur={handleBlur}
                                            onFocus={handleFocus}
                                        />
                                        {showSuggestions && filteredOptions.length > 0 && (
                                            <SuggestionsList>
                                                {filteredOptions.map((option, index) => (
                                                    <SuggestionItem
                                                        key={index}
                                                        onClick={() => handleOptionClick(option)}
                                                    >
                                                        {option.RegistrationNo}
                                                    </SuggestionItem>
                                                ))}
                                            </SuggestionsList>
                                        )}
                                    </InputContainer1>
                                </Section>

                                <Main>
                                    <InputContainer>
                                        <Label>Student Name</Label>
                                        <StyledInput
                                            type="text"
                                            name="StudentName"
                                            value={formData.StudentName}
                                            onChange={handleChange}
                                            placeholder="Enter student name"
                                        />
                                        {/* {errors.StudentName && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.StudentName}
                  </div>
                )} */}
                                    </InputContainer>

                                    <InputContainer>
                                        <Label>DOB</Label>
                                        <Input
                                            type="date"
                                            name="DOB"
                                            value={formData.DOB}
                                            onChange={handleChange}
                                            placeholder="Enter student DOB"
                                        />
                                        {/* {errors.DOB && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.DOB}
                  </div>
                )} */}
                                    </InputContainer>

                                    <InputContainer>
                                        <Label>Gender</Label>
                                        <Select
                                            name="Gender"
                                            value={formData.Gender}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </Select>
                                        {/* {errors.Gender && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.Gender}
                  </div>
                )} */}
                                    </InputContainer>

                                    <InputContainer>
                                        <Label2>Religion</Label2>
                                        <Input
                                            type="text"
                                            name="Religion"
                                            value={formData.Religion}
                                            onChange={handleChange}
                                            placeholder="Religion"
                                        />
                                    </InputContainer>

                                    <InputContainer>
                                        <Label2>Blood Group</Label2>
                                        <Select
                                            name="BloodGroup"
                                            value={formData.BloodGroup}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select blood group</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                        </Select>
                                    </InputContainer>

                                    <InputContainer>
                                        <Label2>Category</Label2>
                                        <Input
                                            type="text"
                                            name="Category"
                                            value={formData.Category}
                                            onChange={handleChange}
                                            placeholder="Category"
                                        />
                                    </InputContainer>

                                    <InputContainer>
                                        <Label2>Height</Label2>
                                        <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                                            <Input
                                                type="text"
                                                placeholder="eg: (5 ft 7 in)"
                                                min="1"
                                                max="8"
                                                name="Height"
                                                value={formData.Height}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </InputContainer>

                                    <InputContainer>
                                        <Label2>Weight</Label2>
                                        <Input
                                            type="text"
                                            name="Weight"
                                            value={formData.Weight}
                                            onChange={handleChange}
                                            placeholder="Weight in kg"
                                        />
                                    </InputContainer>

                                    <InputContainer>
                                        <Label2>Aadhar Number</Label2>
                                        <Input
                                            type="text"
                                            name="AadharNumber"
                                            value={formData.AadharNumber}
                                            onChange={handleChange}
                                            placeholder="Enter Aadhar number"
                                            maxLength="12"
                                        />
                                        {/* {errors.AadharNumber && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.AadharNumber}
                  </div>
                )} */}
                                    </InputContainer>

                                    <InputContainer>
                                        <Label>Email</Label>
                                        <Input
                                            type="email"
                                            name="Email"
                                            value={formData.Email}
                                            onChange={handleChange}
                                            placeholder="Email"
                                        />

                                        {/* {errors.Email && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.Email}
                  </div>
                )} */}
                                    </InputContainer>
                                </Main>

                                {/* Contact Info */}

                                <Heading>Contact Information</Heading>
                                <Main>
                                    <InputContainer>
                                        <Label>Mobile Number</Label>
                                        <Input
                                            type="text"
                                            name="MobileNo"
                                            value={formData.MobileNo}
                                            onChange={handleChange}
                                            placeholder="Enter contact number"
                                            maxLength="10"
                                        />
                                        {/* {errors.MobileNo && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.MobileNo}
                  </div>
                )} */}
                                    </InputContainer>

                                    <InputContainer>
                                        <Label2>Address</Label2>
                                        <Input
                                            type="text"
                                            name="Address"
                                            value={formData.Address}
                                            onChange={handleChange}
                                            placeholder="Enter address"
                                        />
                                    </InputContainer>

                                    <InputContainer>
                                        <Label2>City</Label2>
                                        <Input
                                            type="text"
                                            name="City"
                                            value={formData.City}
                                            onChange={handleChange}
                                            placeholder="City"
                                        />
                                    </InputContainer>

                                    <InputContainer>
                                        <Label2>Local/Outsider</Label2>
                                        <Input
                                            type="text"
                                            name="Area"
                                            value={formData.Area}
                                            onChange={handleChange}
                                            placeholder="Enter Area"
                                        />
                                    </InputContainer>

                                    <InputContainer>
                                        <Label2>Pincode</Label2>
                                        <Input
                                            type="text"
                                            name="Pincode"
                                            value={formData.Pincode}
                                            onChange={handleChange}
                                            placeholder="Enter Pincode"
                                        />
                                    </InputContainer>
                                </Main>

                                {/* Admission Details */}

                                <Heading>Admission Details</Heading>
                                <Main>
                                    <InputContainer>
                                        <Label>Admission Date</Label>
                                        <Input
                                            type="date"
                                            name="AdmissionDate"
                                            value={formData.AdmissionDate}
                                            onChange={handleChange}
                                            placeholder="Enter Admission Date"
                                        />
                                        {/* {errors.AdmissionDate && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.AdmissionDate}
                  </div>
                )} */}
                                    </InputContainer>

                                    <InputContainer>
                                        <Label2>Stream</Label2>
                                        <Input
                                            type="text"
                                            name="Stream"
                                            value={formData.Stream}
                                            onChange={handleChange}
                                            placeholder="Enter Stream"
                                        />
                                    </InputContainer>

                                    <InputContainer>
                                        <Label>Admission in class</Label>
                                        <Select value={formData.AdmissionInClass} onChange={handleClassChange}>
                                            <option value="">Select Class</option>
                                            {classes.map((cls) => (
                                                <option key={cls.ClassId} value={cls.ClassId}>
                                                    {cls.Class}
                                                </option>
                                            ))}
                                        </Select>
                                        {/* {errors.AdmissionInClass && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.AdmissionInClass}
                  </div>
                )} */}
                                    </InputContainer>

                                    <InputContainer>
                                        <Label>Select Section</Label>
                                        <Select
                                            name="Section"
                                            value={formData.Section}
                                            onChange={handleChange}
                                            disabled={!formData.AdmissionInClass}
                                        >
                                            <option value="">Select Section</option>
                                            {sections.map((section, index) => (
                                                <option key={index} value={section}>
                                                    {section}
                                                </option>
                                            ))}
                                        </Select>
                                        {/* {errors.selectedSection && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.selectedSection}
                  </div>
                )} */}
                                    </InputContainer>
                                    <InputContainer>
                                        <Label>Select House</Label>
                                        <Select
                                            name="House"
                                            value={formData.House}
                                            onChange={handleChange}>
                                            <option value="">Select House</option>
                                            {houses.map((house) => (
                                                <option key={house._id} value={house._id}>
                                                    {house.HouseName}
                                                </option>
                                            ))}
                                        </Select>
                                        {/* {errors.house && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.selectedSection}
                  </div>
                )} */}
                                    </InputContainer>

                                    <InputContainer>
                                        <Label>Fee Category</Label>
                                        <Select
                                            name="FeeCategory"
                                            value={formData.FeeCategory}
                                            onChange={handleChange}
                                        >
                                            <option value="" >Select a fee category</option>
                                            <option value="Genral">Genral</option>
                                            {feeCategories.map((category) => (
                                                <option key={category.id} value={category.Title}>
                                                    {category.Title}
                                                </option>
                                            ))}
                                        </Select>
                                        {/* {errors.FeeCategory && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.FeeCategory}
                  </div>
                )} */}
                                    </InputContainer>

                                    <InputContainer>
                                        <Label2>Roll No.</Label2>
                                        <Input
                                            type="text"
                                            name="RollNo"
                                            value={formData.RollNo}
                                            onChange={handleChange}
                                            placeholder="Roll No."
                                        />
                                    </InputContainer>

                                    <InputContainer>
                                        <Label2>Last School Attended</Label2>
                                        <Input
                                            type="text"
                                            name="LastSchoolAttended"
                                            value={formData.LastSchoolAttended}
                                            onChange={handleChange}
                                            placeholder="Last School Attended"
                                        />
                                    </InputContainer>

                                    <InputContainer>
                                        <Label2>Identification Mark</Label2>
                                        <Input
                                            type="text"
                                            name="IdentificationMark"
                                            value={formData.IdentificationMark}
                                            onChange={handleChange}
                                            placeholder="Identification Mark"
                                        />
                                    </InputContainer>

                                    <InputContainer>
                                        <Label2>Source of Admission</Label2>
                                        <Input
                                            type="text"
                                            name="SourceOfAdmission"
                                            value={formData.SourceOfAdmission}
                                            onChange={handleChange}
                                            placeholder="Source of Admission"
                                        />
                                    </InputContainer>
                                </Main>

                                {/* Transport & Fee Details */}

                                <Heading>Transport and Fee Details</Heading>
                                <Main>
                                    <InputContainer>
                                        <Label2>Transport Needed</Label2>
                                        <Select
                                            name="TransportNeeded"
                                            value={formData.TransportNeeded}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Transport Needed</option>
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </Select>
                                    </InputContainer>

                                    {formData.TransportNeeded === "yes" && (
                                        <InputContainer>
                                            <Label2>Route</Label2>

                                            <Select
                                                name="Route"
                                                value={formData.Route}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Route</option>
                                                {routes.map((route) => (
                                                    <option key={route._id} value={route.RouteName}>
                                                        {route.RouteName}
                                                    </option>
                                                ))}
                                            </Select>

                                        </InputContainer>
                                    )}

                                    <InputContainer>
                                        <Label2>Fee discount (if any)</Label2>
                                        <Input
                                            type="text"
                                            name="FeeDiscount"
                                            value={formData.FeeDiscount}
                                            onChange={handleChange}
                                            placeholder="mention fee discount (if any)"
                                        />
                                    </InputContainer>

                                    <InputContainer>
                                        <Label2>Bank Account Name</Label2>
                                        <Input
                                            type="text"
                                            name="BankName"
                                            value={formData.BankName}
                                            onChange={handleChange}
                                            placeholder="Enter Bank Account Name"
                                        />
                                    </InputContainer>

                                    <InputContainer>
                                        <Label2>Bank Account Number</Label2>
                                        <Input
                                            type="text"
                                            name="BankAccountNumber"
                                            value={formData.BankAccountNumber}
                                            onChange={handleChange}
                                            placeholder="Enter Bank Account Number"
                                        />
                                    </InputContainer>

                                    <InputContainer>
                                        <Label2>IFSC Code</Label2>
                                        <Input
                                            type="text"
                                            name="IFSC"
                                            value={formData.IFSC}
                                            onChange={handleChange}
                                            placeholder="IFSC Code"
                                        />
                                    </InputContainer>
                                </Main>

                                {/* Special Condition */}
                                <Heading>Special Conditions</Heading>
                                <Main>
                                    <InputContainer>
                                        <Label2>Disability</Label2>
                                        <Select
                                            name="Disability"
                                            value={formData.Disability}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select</option>
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </Select>
                                    </InputContainer>

                                    {formData.Disability === "yes" && (
                                        <InputContainer>
                                            <Label2>Which Disability</Label2>
                                            <Input
                                                type="text"
                                                name="DisabilityName"
                                                value={formData.DisabilityName}
                                                onChange={handleChange}
                                                placeholder="Mention disability"
                                            />
                                        </InputContainer>
                                    )}

                                    <InputContainer>
                                        <Label2>Orphan</Label2>
                                        <Select
                                            name="Orphan"
                                            value={formData.Orphan}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select</option>
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </Select>
                                    </InputContainer>
                                </Main>

                                <div
                                    style={{
                                        display: "flex",
                                        gap: "10px",
                                        justifyContent: "center",
                                    }}
                                >
                                    <SubmitButton type="submit">Save</SubmitButton>
                                    <SubmitButton type="submit" onClick={handleSaveAndNext}>
                                        Save & Next
                                    </SubmitButton>
                                </div>
                            </Form>
                        </FormContainer>
                    </MainDashboard>
                </>
                : null}

            {tab === "Family" ?
                <>
                    <h1>Student Family</h1>
                </>
                : null}

            {tab === "Documents" ?
                <>
                    <h1>Documents</h1>
                </>
                : null}
        </>
    )
}

export default NewForm