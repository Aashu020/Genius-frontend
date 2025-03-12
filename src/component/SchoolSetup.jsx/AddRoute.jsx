import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Edit, Trash2 } from "lucide-react";

// Styled components
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

const Input = styled.input`
  width: 93%;
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
  transition: background 0.3s;
  margin-top: 20px;

  &:hover {
    background: linear-gradient(270deg, #1c2563 0%, #662acc 100%);
  }
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Table = styled.table`
  width: 70%;
  border-collapse: collapse;
  margin-top: 30px;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
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
  align-items: center;
`;

const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Modal styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const YesButton = styled.button`
  margin: 5px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: green;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const NoButton = styled.button`
  margin: 5px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: red;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const AddRoute = () => {
  const [routeName, setRouteName] = useState("");
  const [routeAmount, setRouteAmount] = useState("");
  const [routes, setRoutes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [errors, setErrors] = useState({ routeName: "", routeAmount: "" });

  const fetchRoutes = async () => {
    try {
      const response = await axios.get("http://localhost:8007/route/all");
      setRoutes(response.data);
    } catch (error) {
      console.error("Error fetching routes:", error);
      toast.error("Failed to fetch routes.");
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    let isValid = true;
    const newErrors = { routeName: "", routeAmount: "" };
    if (!routeName.trim()) {
      newErrors.routeName = "Route name is required.";
      isValid = false;
    }
    if (!routeAmount || isNaN(routeAmount)) {
      newErrors.routeAmount = "Valid route amount is required.";
      isValid = false;
    }
    setErrors(newErrors);

    if (!isValid) return;

    try {
      if (editId) {
        // Update existing Route
        const response = await axios.put(`http://localhost:8007/route/update/${editId}`, {
          RouteName: routeName,
          RouteAmount: routeAmount,
        });

        setRoutes(routes.map(dep => dep._id === editId ? response.data : dep));
        toast.success("Route updated successfully!");
        setEditId(null);
      } else {
        // Create new Route
        const response = await axios.post("http://localhost:8007/route/add", {
          RouteName: routeName,
          RouteAmount: routeAmount,
        });

        setRoutes([...routes, response.data]);
        toast.success("Route added successfully!");
      }
      setRouteName("");
      setRouteAmount("");
      setErrors({ routeName: "", routeAmount: "" });
    } catch (error) {
      console.error("Error saving route:", error);
      toast.error("Error saving route.");
    }
  };

  const handleEdit = (route) => {
    setRouteName(route.RouteName);
    setRouteAmount(route.RouteAmount);
    setEditId(route._id);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8007/route/delete/${deleteId}`);
      setRoutes(routes.filter(route => route._id !== deleteId));
      toast.success("Route deleted successfully!");
    } catch (error) {
      console.error("Error deleting route:", error);
      toast.error("Error deleting route.");
    } finally {
      setShowModal(false);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <>
      <MainDashboard>
        <Title>{editId ? "Edit Route" : "Add Route"}</Title>
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <Label>Route Name</Label>
            <Input
              type="text"
              placeholder="Enter Route Name"
              value={routeName}
              onChange={(e) => {
                setRouteName(e.target.value);
                if (errors.routeName) {
                  setErrors({ ...errors, routeName: "" });
                }
              }}
            />
            {errors.routeName && <ErrorText>{errors.routeName}</ErrorText>}
          </InputContainer>
          <InputContainer>
            <Label>Route Amount</Label>
            <Input
              type="text"
              placeholder="Enter Route Amount"
              value={routeAmount}
              onChange={(e) => {
                setRouteAmount(e.target.value);
                if (errors.routeAmount) {
                  setErrors({ ...errors, routeAmount: "" });
                }
              }}
            />
            {errors.routeAmount && <ErrorText>{errors.routeAmount}</ErrorText>}
          </InputContainer>
          <SubmitButton type="submit">{editId ? "Update" : "Save"}</SubmitButton>
        </Form>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>Route</Th>
                <Th>Amount</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route) => (
                <tr key={route._id}>
                  <Td>{route.RouteName}</Td>
                  <Td>{route.RouteAmount}</Td>
                  <Td1>
                    <EditButton onClick={() => handleEdit(route)}>
                      Edit
                      <Edit size={18} />
                    </EditButton>
                    <DeleteButton onClick={() => handleDelete(route._id)}>
                      <Trash2 size={18} />
                    </DeleteButton>
                  </Td1>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
        <ToastContainer />
        {showModal && (
          <ModalOverlay>
            <ModalContent>
              <h3>Are you sure you want to delete this route?</h3>
              <div>
                <YesButton onClick={confirmDelete}>Yes</YesButton>
                <NoButton onClick={cancelDelete}>No</NoButton>
              </div>
            </ModalContent>
          </ModalOverlay>
        )}
      </MainDashboard>
    </>
  );
};

export default AddRoute;
