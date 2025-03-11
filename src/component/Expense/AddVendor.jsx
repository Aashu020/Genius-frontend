import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Edit, Trash2 } from "lucide-react";

const Container = styled.div`
  display: flex;
  background-color: #f4f4f4;
`;

const MainDashboard = styled.div`
  flex: 1;
  padding: 20px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  color: #0d47a1;
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
`;

const Form = styled.form`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Heading = styled.div`
  width: 30%;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  color: white;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-bottom: 40px;
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

const Label = styled.span`
  position: absolute;
  top: -10px;
  left: 20px;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  color: white;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 12px;
`;

const Label2 = styled.span`
  position: absolute;
  top: -10px;
  left: 20px;
  background: linear-gradient(270deg, #6c6c6c 0%, #525252 100%);

  color: white;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 12px;
`;

const Input = styled.input`
  width: 88%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
  outline: none;
`;

const SubmitButton = styled.button`
  width: 320px;
  padding: 12px;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 20px;

  &:hover {
    background: linear-gradient(270deg, #1c2563 0%, #662acc 100%);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-weight: 400;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Td1 = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  gap: 1rem;
`;

const EditButton = styled.div`
  background-color: #209a16bf;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const AddVendor = () => {
  const [vendorData, setVendorData] = useState({
    Name: "",
    MobileNo: "",
    GSTNo: "",
    Address: "",
    City: "",
    Remark: "",
  });

  const [vendors, setVendors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVendorId, setCurrentVendorId] = useState(null);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!vendorData.Name) formErrors.Name = "Name is required";
    if (!vendorData.MobileNo) formErrors.MobileNo = "Mobile No is required";
    if (!vendorData.Address) formErrors.Address = "Address is required";
    if (!vendorData.City) formErrors.City = "City is required";
    if (!vendorData.Remark) formErrors.Remark = "Remark is required";
    return formErrors;
  };
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(
          "https://api.edspride.in/vendor/all"
        );
        setVendors(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };
    fetchVendors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedErrors = { ...errors };

    if (name === "MobileNo") {
      if (!/^\d*$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          MobileNo: "Mobile number can only contain numbers.",
        }));
        return;
      } else if (value.length > 10) {
        setErrors((prev) => ({
          ...prev,
          MobileNo: "Mobile number must be 10 digits long.",
        }));
        return;
      } else {
        setErrors((prev) => ({ ...prev, MobileNo: "" }));
        delete updatedErrors.MobileNo;
      }
    }
    if (name === "Name" && !/^[a-zA-Z\s]*$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        Name: "Name can only contain letters.",
      }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, Name: "" }));
      delete updatedErrors.Name;

    }

    // if (name === "GSTNo") {
    //   const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1}$/;
    //   if (value.length > 15) {
    //     updatedErrors.GSTNo = "GST number must be 15 characters long.";
    //   } else if (!gstRegex.test(value)) {
    //     updatedErrors.GSTNo = "GST number is invalid. Example format: 22AAAAA0000A1Z5";
    //   } else {
    //     delete updatedErrors.GSTNo;
    //   }
    // }

    setVendorData({ ...vendorData, [name]: value });
    setErrors(updatedErrors);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      if (isEditing) {
        await axios.put(
          `https://api.edspride.in/vendor/update/${currentVendorId}`,
          vendorData
        );
        setVendors(
          vendors.map((vendor) =>
            vendor._id === currentVendorId
              ? { ...vendor, ...vendorData }
              : vendor
          )
        );
        alert("Vendor updated successfully!"); // Alert for update
        setIsEditing(false);
      } else {
        const response = await axios.post(
          "https://api.edspride.in/vendor/add",
          vendorData
        );
        setVendors([...vendors, response.data]);
        alert("Vendor added successfully!"); // Alert for add
      }
      setVendorData({
        Name: "",
        MobileNo: "",
        GSTNo: "",
        Address: "",
        City: "",
        Remark: "",
      });
    } catch (error) {
      console.error("Error adding/updating vendor:", error);
      alert("There was an error saving the vendor data. Please try again."); // Alert for error
    }
  };

  const handleEdit = (vendor) => {
    setVendorData({
      Name: vendor.Name,
      MobileNo: vendor.MobileNo,
      GSTNo: vendor.GSTNo,
      Address: vendor.Address,
      City: vendor.City,
      Remark: vendor.Remark,
    });
    setCurrentVendorId(vendor._id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vendor?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `https://api.edspride.in/vendor/delete/${id}`
        );
        setVendors(vendors.filter((vendor) => vendor._id !== id));
        alert("Vendor deleted successfully!"); // Alert for successful deletion
      } catch (error) {
        console.error("Error deleting vendor:", error);
        alert("There was an error deleting the vendor. Please try again."); // Alert for error
      }
    }
  };

  return (
    <>
      <MainDashboard>
        <FormContainer>
          <Title>{isEditing ? "Edit Vendor" : "Add Vendor"}</Title>
          <Form onSubmit={handleSubmit}>
            <Heading>Details</Heading>
            <Main>
              <InputContainer>
                <Label>Vendor Name</Label>
                <Input
                  type="text"
                  name="Name"
                  placeholder="Enter Name"
                  value={vendorData.Name}
                  onChange={handleChange}
                />
                {errors.Name && <ErrorMessage>{errors.Name}</ErrorMessage>}
              </InputContainer>
              <InputContainer>
                <Label>Vendor Mobile No.</Label>
                <Input
                  type="text"
                  name="MobileNo"
                  placeholder="Enter Mobile Number"
                  value={vendorData.MobileNo}
                  onChange={handleChange}
                />
                {errors.MobileNo && (
                  <ErrorMessage>{errors.MobileNo}</ErrorMessage>
                )}
              </InputContainer>
              <InputContainer>
                <Label2>GST No.</Label2>
                <Input
                  type="text"
                  name="GSTNo"
                  placeholder="Enter GST Number"
                  value={vendorData.GSTNo}
                  onChange={handleChange}
                />
                {/* {errors.GSTNo && <ErrorMessage>{errors.GSTNo}</ErrorMessage>} */}
              </InputContainer>
              <InputContainer>
                <Label>Address</Label>
                <Input
                  type="text"
                  name="Address"
                  placeholder="Enter Address"
                  value={vendorData.Address}
                  onChange={handleChange}
                />
                {errors.Address && (
                  <ErrorMessage>{errors.Address}</ErrorMessage>
                )}
              </InputContainer>
              <InputContainer>
                <Label>City</Label>
                <Input
                  type="text"
                  name="City"
                  placeholder="Enter City"
                  value={vendorData.City}
                  onChange={handleChange}
                />
                {errors.City && <ErrorMessage>{errors.City}</ErrorMessage>}
              </InputContainer>
              <InputContainer>
                <Label>Vendor Remark</Label>
                <Input
                  type="text"
                  name="Remark"
                  placeholder="Enter Vendor Remark"
                  value={vendorData.Remark}
                  onChange={handleChange}
                />
                {errors.Remark && (
                  <ErrorMessage>{errors.Remark}</ErrorMessage>
                )}
              </InputContainer>
            </Main>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <SubmitButton type="submit">
                {isEditing ? "Update" : "Save"}
              </SubmitButton>
            </div>
          </Form>
          <Table>
            <thead>
              <tr>
                <Th>Sr. No</Th>
                <Th>Vendor Name</Th>
                <Th>Mobile No</Th>
                <Th>GST No</Th>
                <Th>Address</Th>
                <Th>City</Th>
                <Th>Remark</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr key={vendor._id}>
                  <Td>{index + 1}</Td>
                  <Td>{vendor.Name}</Td>
                  <Td>{vendor.MobileNo}</Td>
                  <Td>{vendor.GSTNo || "-"}</Td>
                  <Td>{vendor.Address}</Td>
                  <Td>{vendor.City}</Td>
                  <Td>{vendor.Remark}</Td>
                  <Td>
                    <EditButton onClick={() => handleEdit(vendor)}>
                      Edit <Edit size={18} />
                    </EditButton>
                    <DeleteButton onClick={() => handleDelete(vendor._id)}>
                      <Trash2 size={18} />
                    </DeleteButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </FormContainer>
      </MainDashboard>

    </>
  );
};

export default AddVendor;
