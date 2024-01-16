import "./jobs.scss";
import httpModule from "../../helpers/http.module";
import { useState, useEffect } from "react";
import { IJob } from "../../types/global.typing";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import JobsGrid from "../../components/jobs/JobsGrid.components";
import { CircularProgress } from "@mui/material";

const Candidates = () => {
  const [candidates, setCandidates] = useState<IJob[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<ICandidate[]>("/Candidate/Get")
      .then((response) => {
        setCandidates(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="content candidate">
      <div className="heading">
        <h2>Candidates</h2>
        <Button variant="outlined" onClick={() => redirect("/candidates/add")}>
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : candidates.length == 0 ? (
        <h1>No Candidate</h1>
      ) : (
        <CandidatesGrid data={jobs} />
      )}
    </div>
  );
};

export default Candidates;
