import React, { useState } from "react";
import CreateTimeTable from "./CreateTimeTable";
import Timetable from "./ViewTimetable";


const TimetableDashboard = () => {
    const [classId, setClassId] = useState(""); // State to hold the selected class ID

    return (
        <div>
            <CreateTimeTable setClassId={setClassId} />
            <p>Current Class ID: {classId}</p>
            <Timetable classId={classId} />
        </div>
    );
};

export default TimetableDashboard;
