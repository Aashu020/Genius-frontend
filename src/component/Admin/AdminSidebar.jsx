import React, { useState } from "react";
import {
  AiOutlinePlus,
  AiOutlineDashboard,
  AiOutlineMinus,
} from "react-icons/ai"; // Using icons for the sidebar items
import { Link } from "react-router-dom";
import { AiFillAppstore } from "react-icons/ai";
import {
  SidebarContainer,
  SidebarContainer1,
  DropdownIcon,
  SidebarMenuTitle,
  MenuItem,
  MenuLabel,
  MenuIcon,
  PlusIcon,
  SubMenuItem,
  Left,
} from "../Admin/AdminStyle";

const AdminSidebar = () => {
  const [expandedItems, setExpandedItems] = useState({ main: null, sub: null });
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleExpand = (type, index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [type]: prev[type] === index ? null : index, // Toggle the specific item
    }));
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
      <SidebarContainer isVisible={sidebarVisible}>
        <SidebarContainer1>
          <SidebarMenuTitle>Menu</SidebarMenuTitle>

          <Link to="">
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Dashboard
              </MenuLabel>
              <PlusIcon>
                <AiOutlinePlus />
              </PlusIcon>
            </MenuItem>
          </Link>

          <PlusIcon onClick={() => toggleExpand("main", 1)}>
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Enquiry
              </MenuLabel>
              {expandedItems.main === 1 ? (
                <AiOutlineMinus />
              ) : (
                <AiOutlinePlus />
              )}
            </MenuItem>
          </PlusIcon>
          {expandedItems.main === 1 && (
            <>
              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Enquiry
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Status
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Report
                  </MenuLabel>
                </SubMenuItem>
              </Link>
            </>
          )}

          <PlusIcon onClick={() => toggleExpand("main", 2)}>
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Student
              </MenuLabel>
              {expandedItems.main === 2 ? (
                <AiOutlineMinus />
              ) : (
                <AiOutlinePlus />
              )}
            </MenuItem>
          </PlusIcon>
          {expandedItems.main === 2 && (
            <>
              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Student
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    View Students
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Admission Letter
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Report
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    ID Cards
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Promote Student
                  </MenuLabel>
                </SubMenuItem>
              </Link>
            </>
          )}

          <PlusIcon onClick={() => toggleExpand("main", 3)}>
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Staff
              </MenuLabel>
              {expandedItems.main === 3 ? (
                <AiOutlineMinus />
              ) : (
                <AiOutlinePlus />
              )}
            </MenuItem>
          </PlusIcon>
          {expandedItems.main === 3 && (
            <>
              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Staff
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Generate Offer Letter
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Generate ID Cards
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Report
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Promotion
                  </MenuLabel>
                </SubMenuItem>
              </Link>
            </>
          )}

          <PlusIcon onClick={() => toggleExpand("main", 4)}>
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Attendance
              </MenuLabel>
              {expandedItems.main === 4 ? (
                <AiOutlineMinus />
              ) : (
                <AiOutlinePlus />
              )}
            </MenuItem>
          </PlusIcon>
          {expandedItems.main === 4 && (
            <>
              <Link to="">
                <SubMenuItem onClick={() => toggleExpand("sub", "staff")}>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Staff
                  </MenuLabel>
                  {expandedItems.sub === "staff" ? (
                    <AiOutlineMinus />
                  ) : (
                    <AiOutlinePlus />
                  )}
                </SubMenuItem>
              </Link>
              {expandedItems.sub === "staff" && (
                <>
                  <Link to="">
                    <Left>
                      <SubMenuItem>
                        <MenuLabel>
                          <MenuIcon>
                            <AiFillAppstore />
                          </MenuIcon>
                          Mark Attendance
                        </MenuLabel>
                      </SubMenuItem>
                    </Left>
                  </Link>
                  <Link to="">
                    <Left>
                      <SubMenuItem>
                        <MenuLabel>
                          <MenuIcon>
                            <AiFillAppstore />
                          </MenuIcon>
                          Report
                        </MenuLabel>
                      </SubMenuItem>
                    </Left>
                  </Link>
                </>
              )}

              <Link to="">
                <SubMenuItem onClick={() => toggleExpand("sub", "stu")}>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Student
                  </MenuLabel>
                  {expandedItems.sub === "stu" ? (
                    <AiOutlineMinus />
                  ) : (
                    <AiOutlinePlus />
                  )}
                </SubMenuItem>
              </Link>
              {expandedItems.sub === "stu" && (
                <>
                  <Link to="">
                    <Left>
                      <SubMenuItem>
                        <MenuLabel>
                          <MenuIcon>
                            <AiFillAppstore />
                          </MenuIcon>
                          Mark Attendance
                        </MenuLabel>
                      </SubMenuItem>
                    </Left>
                  </Link>
                  <Link to="">
                    <Left>
                      <SubMenuItem>
                        <MenuLabel>
                          <MenuIcon>
                            <AiFillAppstore />
                          </MenuIcon>
                          Report
                        </MenuLabel>
                      </SubMenuItem>
                    </Left>
                  </Link>
                </>
              )}
            </>
          )}

          <PlusIcon onClick={() => toggleExpand("main", 5)}>
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Front Office
              </MenuLabel>
              {expandedItems.main === 5 ? (
                <AiOutlineMinus />
              ) : (
                <AiOutlinePlus />
              )}
            </MenuItem>
          </PlusIcon>
          {expandedItems.main === 5 && (
            <>
              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Visitor
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Early Leaving
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="">
                <SubMenuItem onClick={() => toggleExpand("sub", "postal")}>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Student
                  </MenuLabel>
                  {expandedItems.sub === "postal" ? (
                    <AiOutlineMinus />
                  ) : (
                    <AiOutlinePlus />
                  )}
                </SubMenuItem>
              </Link>
              {expandedItems.sub === "postal" && (
                <>
                  <Link to="">
                    <Left>
                      <SubMenuItem>
                        <MenuLabel>
                          <MenuIcon>
                            <AiFillAppstore />
                          </MenuIcon>
                          Received
                        </MenuLabel>
                      </SubMenuItem>
                    </Left>
                  </Link>
                  <Link to="">
                    <Left>
                      <SubMenuItem>
                        <MenuLabel>
                          <MenuIcon>
                            <AiFillAppstore />
                          </MenuIcon>
                          Dispatched
                        </MenuLabel>
                      </SubMenuItem>
                    </Left>
                  </Link>
                </>
              )}

              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Complaint
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Meter Reading
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Report
                  </MenuLabel>
                </SubMenuItem>
              </Link>
            </>
          )}

          <PlusIcon onClick={() => toggleExpand("main", 6)}>
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Academic
              </MenuLabel>
              {expandedItems.main === 6 ? (
                <AiOutlineMinus />
              ) : (
                <AiOutlinePlus />
              )}
            </MenuItem>
          </PlusIcon>
          {expandedItems.main === 6 && (
            <>
              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Academic Calendar
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Class
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Section
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Subject
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Create Syllabus
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="">
                <SubMenuItem onClick={() => toggleExpand("sub", "exam")}>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Exam
                  </MenuLabel>
                  {expandedItems.sub === "exam" ? (
                    <AiOutlineMinus />
                  ) : (
                    <AiOutlinePlus />
                  )}
                </SubMenuItem>
              </Link>
              {expandedItems.sub === "exam" && (
                <>
                  <Link to="">
                    <Left>
                      <SubMenuItem>
                        <MenuLabel>
                          <MenuIcon>
                            <AiFillAppstore />
                          </MenuIcon>
                          Add Exam
                        </MenuLabel>
                      </SubMenuItem>
                    </Left>
                  </Link>
                  <Link to="">
                    <Left>
                      <SubMenuItem>
                        <MenuLabel>
                          <MenuIcon>
                            <AiFillAppstore />
                          </MenuIcon>
                          Exam Timetable
                        </MenuLabel>
                      </SubMenuItem>
                    </Left>
                  </Link>

                  <Link to="">
                    <Left>
                      <SubMenuItem>
                        <MenuLabel>
                          <MenuIcon>
                            <AiFillAppstore />
                          </MenuIcon>
                          Admit Card
                        </MenuLabel>
                      </SubMenuItem>
                    </Left>
                  </Link>

                  <Link to="">
                    <Left>
                      <SubMenuItem>
                        <MenuLabel>
                          <MenuIcon>
                            <AiFillAppstore />
                          </MenuIcon>
                          Add Result
                        </MenuLabel>
                      </SubMenuItem>
                    </Left>
                  </Link>

                  <Link to="">
                    <Left>
                      <SubMenuItem>
                        <MenuLabel>
                          <MenuIcon>
                            <AiFillAppstore />
                          </MenuIcon>
                          Consolidated Marksheet
                        </MenuLabel>
                      </SubMenuItem>
                    </Left>
                  </Link>

                  <Link to="">
                    <Left>
                      <SubMenuItem>
                        <MenuLabel>
                          <MenuIcon>
                            <AiFillAppstore />
                          </MenuIcon>
                          Classwise Result
                        </MenuLabel>
                      </SubMenuItem>
                    </Left>
                  </Link>

                  <Link to="">
                    <Left>
                      <SubMenuItem>
                        <MenuLabel>
                          <MenuIcon>
                            <AiFillAppstore />
                          </MenuIcon>
                          Subjectwise Result
                        </MenuLabel>
                      </SubMenuItem>
                    </Left>
                  </Link>
                  <Link to="">
                    <Left>
                      <SubMenuItem>
                        <MenuLabel>
                          <MenuIcon>
                            <AiFillAppstore />
                          </MenuIcon>
                          Generate Report Card
                        </MenuLabel>
                      </SubMenuItem>
                    </Left>
                  </Link>
                </>
              )}
            </>
          )}

          <PlusIcon onClick={() => toggleExpand("main", 7)}>
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Payroll
              </MenuLabel>
              {expandedItems.main === 7 ? (
                <AiOutlineMinus />
              ) : (
                <AiOutlinePlus />
              )}
            </MenuItem>
          </PlusIcon>
          {expandedItems.main === 7 && (
            <>
              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Allowance Head
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Deduction
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Generate Salary
                  </MenuLabel>
                </SubMenuItem>
              </Link>
            </>
          )}
        </SidebarContainer1>
      </SidebarContainer>

      <DropdownIcon onClick={toggleSidebar}>
        {sidebarVisible ? "☰" : "☰"}
      </DropdownIcon>
    </>
  );
};

export default AdminSidebar;