import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit, Trash2 } from "lucide-react";
import {
  MainDashboard,
  Title,
  Form,
  AddRouteMain,
  InputContainer,
  Label,
  Input,
  SubmitButton,
  TableContainer,
  Table,
  Th,
  Td,
  Td1,
  EditButton,
  DeleteButton,
  ModalOverlay,
  ModalContent,
  YesButton,
  NoButton,
  ErrorText,
} from "./SchoolSetupStyle";

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
      const response = await axios.get("https://api.edspride.in/route/all");
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
        const response = await axios.put(`https://api.edspride.in/route/update/${editId}`, {
          RouteName: routeName,
          RouteAmount: routeAmount,
        });
        setRoutes(routes.map((dep) => (dep._id === editId ? response.data : dep)));
        toast.success("Route updated successfully!");
        setEditId(null);
      } else {
        const response = await axios.post("https://api.edspride.in/route/add", {
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
      await axios.delete(`https://api.edspride.in/route/delete/${deleteId}`);
      setRoutes(routes.filter((route) => route._id !== deleteId));
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
    <MainDashboard>
      <Title>{editId ? "Edit Route" : "Add Route"}</Title>
      <Form onSubmit={handleSubmit}>
        <AddRouteMain>
          <InputContainer>
            <Label>Route Name</Label>
            <Input
              type="text"
              placeholder="Enter Route Name"
              value={routeName}
              onChange={(e) => {
                setRouteName(e.target.value);
                if (errors.routeName) setErrors({ ...errors, routeName: "" });
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
                if (errors.routeAmount) setErrors({ ...errors, routeAmount: "" });
              }}
            />
            {errors.routeAmount && <ErrorText>{errors.routeAmount}</ErrorText>}
          </InputContainer>
        </AddRouteMain>
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
  );
};

export default AddRoute;