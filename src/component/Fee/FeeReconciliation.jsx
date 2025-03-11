import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";


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
  @media (max-width: 480px) {
    font-size: 12px;
    height: 30px;
    width: 50%;
    margin-bottom: 30px;
    margin-top: 20px;
  }
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Main = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
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
const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
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
  @media (max-width: 480px) {
    height: 10px;
    width: 80%;
    font-size: 12px;
    padding: 12px 18px;
  }
`;
const Select = styled.select`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
  @media (max-width: 480px) {
    height: 38px;
    width: 94%;
    font-size: 12px;
    padding: 10px 12px;
  }
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

  @media (max-width: 768px) {
    width: 100%;
    font-size: 12px;
    padding: 5px;
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
  align-items: center;
`;
const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 10%;
  display: flex;
  justify-content: center;
`;

// +++++++++++++++++++++++++++++++++

const SelectContainer = styled.div`
  width: 88%;
  cursor: pointer;
`;

const Dropdown = styled.div`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  background-color: #f4f6fc;
  font-weight: bold;
  color: #7a7a7a;
`;

const CheckboxContainer = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  padding: 10px;
`;

const Checkbox = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
`;

const ClearButton = styled.button`
  width: 100px;
  padding: 5px;
  background-color: red;
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: darkred;
  }
`;

const FeeReconciliation = () => {
  const [ReceivedClass, setReceivedClass] = useState("");
  const [ReceivedReceived, setReceivedReceived] = useState("");
  const [pendigClass, setPendingClass] = useState("");
  const [ReceivedMonth, setReceivedMonth] = useState("");
  const [ReceivedSection, setReceivedSection] = useState("");
  const [ReceivedHouse, setReceivedHouse] = useState("");
  const [errors, setErrors] = useState({});
  const [allStudent, setAllStudent] = useState([]);
  const [feeData, setFeeData] = useState([]);

  const [totalFee, setTotalFee] = useState(0);
  const [remainingFee, setRemainingFee] = useState(0);

  useEffect(() => {
    // Fetch the fee data from the API
    const fetchFeeData = async () => {
      try {
        const response = await axios.get("https://api.edspride.in/fee-data/all");
        setFeeData(response.data); // Assuming the response is an array of student fee data

        // Calculate totalFee and remainingFee by iterating over the response data
        const total = response.data.reduce((sum, student) => sum + student.TotalFee, 0);
        const remaining = response.data.reduce((sum, student) => sum + student.RemainingFee, 0);

        setTotalFee(total);
        setRemainingFee(remaining);

        // Log the calculated total and remaining fees
        console.log("Total Fee:", total);
        console.log("Remaining Fee:", remaining);
      } catch (error) {
        console.error("Error fetching fee data:", error);
      }
    };

    fetchFeeData();
  }, []);


  useEffect(() => {
    // Fetch the fee data from the API
    const fetchStudent = async () => {
      try {
        const response = await axios.get("https://api.edspride.in/student/all");
        setAllStudent(response.data); 
      } catch (error) {
        console.error("Error fetching Student data:", error);
      }
    };

    fetchStudent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If validation passes, log the input values to the console (replace with your API call)
    console.log({
      ReceivedClass,
      ReceivedMonth,
      ReceivedSection,
      ReceivedHouse,
    });
    // alert("Form Submitted successfully");
    setReceivedClass("");
    setReceivedReceived("");
    setPendingClass("");
    setReceivedMonth("");
    setReceivedSection("");
    setReceivedHouse("");
  };

  const [student, setStudent] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [students, setStudents] = useState([]); // Initialize as an empty array
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [isFeeDropdownOpen, setIsFeeDropdownOpen] = useState(false);
  const [months, setMonths] = useState([]); // Store months from the API
  const [selectedMonth, setSelectedMonth] = useState("");
  const [houses, setHouses] = useState([]);
  const [fines, setFines] = useState([]);

  // Fetch classes on initial load
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("https://api.edspride.in/class/all");
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, []);

  // Fetch sections based on selected class
  useEffect(() => {
    const fetchSections = async () => {
      if (selectedClass) {
        try {
          const response = await axios.get(
            `https://api.edspride.in/class/get/${selectedClass}`
          );
          console.log('Sections Response:', response.data);
          setSections(response.data.Section || []);
        } catch (error) {
          console.error("Error fetching sections:", error);
        }
      } else {
        setSections([]);
      }
    };

    fetchSections();
  }, [selectedClass]);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.selectedClass;
      return newErrors;
    });
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.selectedSection;
      return newErrors;
    });
  };

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const response = await axios.get("https://api.edspride.in/academic-year-info/active");
        const academicData = response.data;

        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];

        const generatedMonths = [];
        const startYear = academicData.StartYear;
        const startMonthIndex = academicData.StartMonthNumber;
        const endYear = academicData.EndYear;
        const endMonthIndex = academicData.EndMonthNumber;

        for (let year = startYear; year <= endYear; year++) {
          const startMonth = year === startYear ? startMonthIndex : 1;
          const endMonth = year === endYear ? endMonthIndex : 12;

          for (let month = startMonth; month <= endMonth; month++) {
            generatedMonths.push({ value: `${monthNames[month - 1]} ${year}`, label: `${monthNames[month - 1]} ${year}` });
          }
        }

        setMonths(generatedMonths);
      } catch (error) {
        console.error("Error fetching academic year info:", error);
      }
    };

    fetchMonths();
  }, []);


  const toggleMonthDropdown = () => {
    setIsMonthDropdownOpen(prev => !prev);
  };


  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get('https://api.edspride.in/house/all');
        setHouses(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
        toast.error("Error fetching classes. Please try again.");
      }
    };
    fetchHouses();
  }, []);

  useEffect(() => {
    const fetchFines = async () => {
      try {
        const response = await axios.get("https://api.edspride.in/fine-setup/all");
        setFines(response.data);
      } catch (error) {
        console.error("Error fetching fines:", error);
      }
    };

    fetchFines();
  }, []);


  const [isReceivedOpen, setIsReceivedOpen] = useState(true); // Default to true
  const [isPendingOpen, setIsPendingOpen] = useState(false);

  const toggleReceived = () => setIsReceivedOpen(!isReceivedOpen);
  const togglePending = () => setIsPendingOpen(!isPendingOpen);
  const [discounts, setDiscounts] = useState([]);
  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await axios.get("https://api.edspride.in/discount/all");
        setDiscounts(response.data); // Assuming the response is an array of discounts
      } catch (error) {
        console.error("Error fetching discounts:", error);
      }
    };

    fetchDiscounts();
  }, []);

  useEffect(() => {

  }, [classes, totalFee, feeData])


  return (
    <>
      <MainDashboard>
        <FormContainer>
          <Title>Fee Reconciliation </Title>

          <Form onSubmit={handleSubmit}>
            <Section onClick={toggleReceived}>
              <Heading>Received Fee :- {totalFee - remainingFee}</Heading>
            </Section>
            <Main isOpen={isReceivedOpen}>
              <InputContainer>
                <Label>Select Class</Label>
                <Select value={selectedClass} onChange={handleClassChange}>
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls.ClassId} value={cls.ClassId}>
                      {cls.Class}
                    </option>
                  ))}
                </Select>
                {errors.selectedClass && <ErrorMessage>{errors.selectedClass}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Select Section</Label>
                <Select
                  value={selectedSection}
                  onChange={handleSectionChange}
                  disabled={!selectedClass}
                >
                  <option value="">Select Section</option>
                  {sections.map((section, index) => (
                    <option key={index} value={section}>
                      {section}
                    </option>
                  ))}
                </Select>
                {errors.selectedSection && <ErrorMessage>{errors.selectedSection}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Select Month</Label>
                <Select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                  <option value="">Select Month</option>
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </Select>
                {errors.ReceivedMonth && <ErrorMessage>{errors.ReceivedMonth}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Search By Received</Label>
                <Select
                  value={ReceivedReceived}
                  onChange={(e) => setReceivedReceived(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="1">Option</option>
                </Select>
                {errors.ReceivedReceived && (
                  <ErrorMessage>{errors.ReceivedReceived}</ErrorMessage>
                )}
              </InputContainer>

              <InputContainer>
                <Label>Search By cash Received</Label>
                <Select
                  value={ReceivedClass}
                  onChange={(e) => setReceivedClass(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="1">Option</option>
                </Select>
                {errors.ReceivedClass && (
                  <ErrorMessage>{errors.ReceivedClass}</ErrorMessage>
                )}
              </InputContainer>

              <InputContainer>
                <Label>Select House</Label>
                <Select
                  name="House"
                  value={houses}
                  onChange={(e) => setHouses(e.target.value)}>
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
                <Label>Search By Online</Label>
                <Select
                  value={ReceivedClass}
                  onChange={(e) => setReceivedClass(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="1">Option</option>
                </Select>
                {errors.ReceivedClass && (
                  <ErrorMessage>{errors.ReceivedClass}</ErrorMessage>
                )}
              </InputContainer>

              <InputContainer>
                <Label>Search By gender</Label>
                <Select
                  value={ReceivedClass}
                  onChange={(e) => setReceivedClass(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Select>
                {errors.ReceivedClass && (
                  <ErrorMessage>{errors.ReceivedClass}</ErrorMessage>
                )}
              </InputContainer>

              <InputContainer>
                <Label>Search By day Wise</Label>
                <Select
                  value={ReceivedClass}
                  onChange={(e) => setReceivedClass(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="1">Option</option>
                </Select>
                {errors.ReceivedClass && (
                  <ErrorMessage>{errors.ReceivedClass}</ErrorMessage>
                )}
              </InputContainer>

              <InputContainer>
                <Label>Search By Fine</Label>
                <Select
                  value={ReceivedClass}
                  onChange={(e) => setReceivedClass(e.target.value)}
                >
                  <option value="">Select</option>
                  {fines.map((fine) => (
                    <option key={fine._id} value={fine._id}>
                      {fine.Name} {/* Adjust this to the correct property */}
                    </option>
                  ))}
                </Select>
                {errors.ReceivedClass && (
                  <ErrorMessage>{errors.ReceivedClass}</ErrorMessage>
                )}
              </InputContainer>

              <InputContainer>
                <Label>Search By UPI</Label>
                <Select
                  value={ReceivedClass}
                  onChange={(e) => setReceivedClass(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="1">Option</option>
                </Select>
                {errors.ReceivedClass && (
                  <ErrorMessage>{errors.ReceivedClass}</ErrorMessage>
                )}
              </InputContainer>

            </Main>

            <Section onClick={togglePending}>
              <Heading>Pending Fee :- {remainingFee}</Heading>
            </Section>
            <Main isOpen={isPendingOpen}>
              <InputContainer>
                <Label>Select Class</Label>
                <Select value={selectedClass} onChange={handleClassChange}>
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls.ClassId} value={cls.ClassId}>
                      {cls.Class}
                    </option>
                  ))}
                </Select>
                {errors.selectedClass && <ErrorMessage>{errors.selectedClass}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Select Section</Label>
                <Select
                  value={selectedSection}
                  onChange={handleSectionChange}
                  disabled={!selectedClass}
                >
                  <option value="">Select Section</option>
                  {sections.map((section, index) => (
                    <option key={index} value={section}>
                      {section}
                    </option>
                  ))}
                </Select>
                {errors.selectedSection && <ErrorMessage>{errors.selectedSection}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Search By Discount</Label>
                <Select
                  value={discounts}
                  onChange={(e) => setDiscounts(e.target.value)}
                >
                  <option value="">Select</option>
                  {discounts.map((discount) => (
                    <option key={discount._id} value={discount._id}>
                      {discount.Title} {/* Adjust this according to your API response */}
                    </option>
                  ))}
                </Select>
                {errors.pendigClass && (
                  <ErrorMessage>{errors.pendigClass}</ErrorMessage>
                )}
              </InputContainer>

              <InputContainer>
                <Label>Select Month</Label>
                <Select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                  <option value="">Select Month</option>
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </Select>
                {errors.ReceivedMonth && <ErrorMessage>{errors.ReceivedMonth}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Search By gender</Label>
                <Select
                  value={ReceivedClass}
                  onChange={(e) => setReceivedClass(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Select>
                {errors.ReceivedClass && (
                  <ErrorMessage>{errors.ReceivedClass}</ErrorMessage>
                )}
              </InputContainer>

              <InputContainer>
                <Label>Select House</Label>
                <Select
                  name="House"
                  value={houses}
                  onChange={(e) => setHouses(e.target.value)}>
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

            </Main>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <SubmitButton type="submit">Submit</SubmitButton>
            </div>
          </Form>
        </FormContainer>
      </MainDashboard>
    </>
  );
};

export default FeeReconciliation;
