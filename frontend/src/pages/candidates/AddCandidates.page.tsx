import { useState, useEffect } from "react";
import "./candidates.scss";
import { ICreateCandidateDto, IJob } from "../../types/global.typing";
import {} from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Select from "@mui/material/Select/Select";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button/Button";
import httpModule from "../../helpers/http.module";

const AddCandidates = () => {
  const [candidates, setCandidates] = useState<ICreateCandidateDto>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverLetter: "",
    jobId: "",
  });

  const [jobs, setJob] = useState<IJob[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>();

  const redirect = useNavigate();

  useEffect(() => {
    httpModule
      .get<IJob[]>("/Job/Get")
      .then((response) => {
        setJob(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }, []);

  const handleClickSaveBtn = () => {
    if (
      candidates.firstName === "" ||
      candidates.lastName === "" ||
      candidates.email === "" ||
      candidates.phone === "" ||
      candidates.coverLetter === "" ||
      candidates.jobId === "" ||
      !pdfFile
    ) {
      alert("Fill all fields");
      return;
    }
    const newCandidateFormData = new FormData();
    newCandidateFormData.append("firstName", candidates.firstName);
    newCandidateFormData.append("lastName", candidates.lastName);
    newCandidateFormData.append("email", candidates.email);
    newCandidateFormData.append("phone", candidates.phone);
    newCandidateFormData.append("coverLetter", candidates.coverLetter);
    newCandidateFormData.append("jobId", candidates.jobId);
    newCandidateFormData.append("pdfFile", pdfFile);

    httpModule
      .post("/Candidate/Create", newCandidateFormData)
      .then((response) => redirect("/candidates"))
      .catch((error) => console.log(error));
  };

  const handleClickBackBtn = () => {
    redirect("/candidates");
  };

  return (
    <div className="content">
      <div className="add-candidate">
        <h2>Add New Candidate</h2>
        <FormControl fullWidth>
          <InputLabel>Job</InputLabel>
          <Select
            value={candidates.jobId}
            label="Job"
            onChange={(e) =>
              setCandidates({ ...candidates, jobId: e.target.value })
            }
          >
            {jobs.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          autoComplete="off"
          label="First Name"
          variant="outlined"
          value={candidates.firstName}
          onChange={(e) =>
            setCandidates({ ...candidates, firstName: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          label="Last Name"
          variant="outlined"
          value={candidates.lastName}
          onChange={(e) =>
            setCandidates({ ...candidates, lastName: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          label="Email"
          variant="outlined"
          value={candidates.email}
          onChange={(e) =>
            setCandidates({ ...candidates, email: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          label="Phone"
          variant="outlined"
          value={candidates.phone}
          onChange={(e) =>
            setCandidates({ ...candidates, phone: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          label="C V"
          variant="outlined"
          value={candidates.coverLetter}
          onChange={(e) =>
            setCandidates({ ...candidates, coverLetter: e.target.value })
          }
        />
        <input
          type="file"
          onChange={(event) =>
            setPdfFile(event.target.files ? event.target.files[0] : null)
          }
        />
        <div className="btns">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSaveBtn}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickBackBtn}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCandidates;
