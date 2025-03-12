import  { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainDashboard,SubmitButton,Title,Th,FormContainer,Td,Input,Label,Form,Heading,Section,Main,InputContainer} from "../StudentAdmission/StudentAdmission";
import { Td1,ConfirmationModal,EditButton,Table100,DeleteButton,ModalContent,ConfirmButton } from "../Subject/SubjectStyle";


const Addperiod = () => {
  const [formData, setFormData] = useState({
    Title: "",
    StartTime: "",
    EndTime: "",
  });

  const [errors, setErrors] = useState({});
  const [expense, setExpense] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch existing periods
    const fetchPeriods = async () => {
      try {
        const response = await axios.get("https://api.edspride.in/period/all");
        setExpense(response.data);
      } catch (err) {
        console.error("Error fetching periods:", err);
      }
    };
    fetchPeriods();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Title) newErrors.Title = "Title is required";
    if (!formData.StartTime) newErrors.StartTime = "Starting Time is required";
    if (!formData.EndTime) newErrors.EndTime = "Ending Time is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (isEditing) {
        const response = await axios.put(`https://api.edspride.in/period/update/${currentId}`, formData);
        setExpense(expense.map(item => item._id === currentId ? response.data : item));
        toast.success("Period updated successfully!");
      } else {
        const response = await axios.post("https://api.edspride.in/period/add", formData);
        setExpense([...expense, response.data]);
        toast.success("Period added successfully!");
      }
      setFormData({ Title: "", StartTime: "", EndTime: "" });
      setIsEditing(false);
      setCurrentId(null);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleEdit = (item) => {
    setFormData({ Title: item.Title, StartTime: item.StartTime, EndTime: item.EndTime });
    setIsEditing(true);
    setCurrentId(item._id);
  };

  const handleDeleteConfirmation = (id) => {
    setShowModal(true);
    setCurrentId(id);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://api.edspride.in/period/delete/${currentId}`);
      setExpense(expense.filter(item => item._id !== currentId));
      toast.success("Period deleted successfully!");
    } catch (err) {
      console.error("Error deleting period:", err);
    } finally {
      setShowModal(false);
      setCurrentId(null);
    }
  };

  return (
    <>

      <MainDashboard>
        <ToastContainer />
        <FormContainer>
          <Title>Add Period</Title>
          <Form onSubmit={handleSubmit}>
            <Section>
              <Heading>Details</Heading>
              <Heading>Add +</Heading>
            </Section>
            <Main>
              <InputContainer>
                <Label>Title</Label>
                <Input
                  type="text"
                  name="Title"
                  value={formData.Title}
                  onChange={handleChange}
                />
                {errors.Title && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.Title}
                  </div>
                )}
              </InputContainer>
              <InputContainer>
                <Label>Starting Time</Label>
                <Input
                  type="time"
                  name="StartTime"
                  value={formData.StartTime}
                  onChange={handleChange}
                />
                {errors.StartTime && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.StartTime}
                  </div>
                )}
              </InputContainer>
              <InputContainer>
                <Label>Ending Time</Label>
                <Input
                  type="time"
                  name="EndTime"
                  value={formData.EndTime}
                  onChange={handleChange}
                />
                {errors.EndTime && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.EndTime}
                  </div>
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
              <SubmitButton type="button">Cancel</SubmitButton>
              <SubmitButton type="submit">{isEditing ? "Update" : "Save"}</SubmitButton>
            </div>
          </Form>

          <Table100>
            <thead>
              <tr>
                <Th>Title</Th>
                <Th>Time</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {expense.map((item) => (
                <tr key={item._id}>
                  <Td>{item.Title}</Td>
                  <Td>{item.StartTime} - {item.EndTime}</Td>
                  <Td1>
                    <EditButton onClick={() => handleEdit(item)}>
                      Edit
                      <Edit size={18} />
                    </EditButton>
                    <DeleteButton onClick={() => handleDeleteConfirmation(item._id)}>
                      <Trash2 size={18} />
                    </DeleteButton>
                  </Td1>
                </tr>
              ))}
            </tbody>
          </Table100>
        </FormContainer>
        {showModal && (
          <ConfirmationModal>
            <ModalContent>
              <h3>Are you sure you want to delete this period?</h3>
              <ConfirmButton className="yes" onClick={handleDelete}>Yes</ConfirmButton>
              <ConfirmButton className="no" onClick={() => setShowModal(false)}>No</ConfirmButton>
            </ModalContent>
          </ConfirmationModal>
        )}
      </MainDashboard>

    </>
  );
};

export default Addperiod;
