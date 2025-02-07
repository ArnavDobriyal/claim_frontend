import React, { useState } from "react";
import axios from "axios";
import ReactJson from "react-json-view";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [policyholderId, setPolicyholderId] = useState("");
  const [policyId, setPolicyId] = useState("");
  const [claimId, setClaimId] = useState("");
  const [coverage, setCoverage] = useState("");
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [updatePolicyholderResponse, setUpdatePolicyholderResponse] = useState(null);
  const [createPolicyResponse, setCreatePolicyResponse] = useState(null);
  const [updatePolicyResponse, setUpdatePolicyResponse] = useState(null);
  const [createClaimResponse, setCreateClaimResponse] = useState(null);
  const [updateClaimResponse, setUpdateClaimResponse] = useState(null);
  const [deletePolicyholderResponse, setDeletePolicyholderResponse] = useState(null);
  const [deleteClaimResponse, setDeleteClaimResponse] = useState(null);
  const [deletePolicyResponse, setDeletePolicyResponse] = useState(null);
  const [allPoliciesAndClaims, setAllPoliciesAndClaims] = useState(null);
  const [policiesByPolicyholder, setPoliciesByPolicyholder] = useState(null);
  const [claimsByPolicyholder, setClaimsByPolicyholder] = useState(null);

  const handleButtonClick = async (method, endpoint, data, setResponse) => {
    try {
      const response = await axios({
        method,
        url: `http://127.0.0.1:8000${endpoint}`,
        data,
        headers: {
          "api-key": "12345"
        }
      });
      setResponse(response.data);
    } catch (error) {
      setResponse({ error: error.toString() });
    }
  };

  // Common props for ReactJson to remove extra info.
  const jsonViewProps = {
    theme: "monokai",
    collapsed: false,
    displayDataTypes: false,
    displayObjectSize: false
  };

  return (
    <div url="">
      <h1 style={{textAlign:"center",backgroundColor:"rgb(171, 159, 159)"}}>Admin  Dashboard</h1>
      <div className="dashboard-container">

        {/* Update Policyholder Box */}
        <div className="dashboard-box">
          <h3>Update Policyholder</h3>
          <input type="text" placeholder="Policyholder ID" value={policyholderId} onChange={(e) => setPolicyholderId(e.target.value)} />
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button
            onClick={() =>
              handleButtonClick("PUT", `/policyholders/${policyholderId}`, { name, email, password }, setUpdatePolicyholderResponse)
            }
          >
            Update Policyholder
          </button>
          {updatePolicyholderResponse && (
            <ReactJson src={updatePolicyholderResponse} {...jsonViewProps} />
          )}
        </div>

        {/* Create Policy Box */}
        <div className="dashboard-box">
          <h3>Create Policy</h3>
          <input type="text" placeholder="Policyholder ID" value={policyholderId} onChange={(e) => setPolicyholderId(e.target.value)} />
          <input type="text" placeholder="Coverage" value={coverage} onChange={(e) => setCoverage(e.target.value)} />
          <button
            onClick={() =>
              handleButtonClick("POST", `/policyholders/${policyholderId}/policies/`, { coverage }, setCreatePolicyResponse)
            }
          >
            Create Policy
          </button>
          {createPolicyResponse && (
            <ReactJson src={createPolicyResponse} {...jsonViewProps} />
          )}
        </div>

        {/* Update Policy Box */}
        <div className="dashboard-box">
          <h3>Update Policy</h3>
          <input type="text" placeholder="Policyholder ID" value={policyholderId} onChange={(e) => setPolicyholderId(e.target.value)} />
          <input type="text" placeholder="Policy ID" value={policyId} onChange={(e) => setPolicyId(e.target.value)} />
          <input type="text" placeholder="Coverage" value={coverage} onChange={(e) => setCoverage(e.target.value)} />
          <input type="text" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
          <button
            onClick={() =>
              handleButtonClick("PUT", `/policyholders/${policyholderId}/policies/${policyId}`, { coverage, status }, setUpdatePolicyResponse)
            }
          >
            Update Policy
          </button>
          {updatePolicyResponse && (
            <ReactJson src={updatePolicyResponse} {...jsonViewProps} />
          )}
        </div>

        {/* Create Claim Box */}
        <div className="dashboard-box">
          <h3>Create Claim</h3>
          <input type="text" placeholder="Policyholder ID" value={policyholderId} onChange={(e) => setPolicyholderId(e.target.value)} />
          <input type="text" placeholder="Policy ID" value={policyId} onChange={(e) => setPolicyId(e.target.value)} />
          <input type="text" placeholder="Claim Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <button
            onClick={() =>
              handleButtonClick("POST", `/policyholders/${policyholderId}/policies/${policyId}/claims/`, { amount }, setCreateClaimResponse)
            }
          >
            Create Claim
          </button>
          {createClaimResponse && (
            <ReactJson src={createClaimResponse} {...jsonViewProps} />
          )}
        </div>

        {/* Update Claim Status Box */}
        <div className="dashboard-box">
          <h3>Update Claim Status</h3>
          <input type="text" placeholder="Policyholder ID" value={policyholderId} onChange={(e) => setPolicyholderId(e.target.value)} />
          <input type="text" placeholder="Policy ID" value={policyId} onChange={(e) => setPolicyId(e.target.value)} />
          <input type="text" placeholder="Claim ID" value={claimId} onChange={(e) => setClaimId(e.target.value)} />
          <input type="text" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
          <button
            onClick={() =>
              handleButtonClick("PUT", `/policyholders/${policyholderId}/policies/${policyId}/claims/${claimId}`, { status }, setUpdateClaimResponse)
            }
          >
            Update Claim Status
          </button>
          {updateClaimResponse && (
            <ReactJson src={updateClaimResponse} {...jsonViewProps} />
          )}
        </div>

        {/* Delete Policyholder Box */}
        <div className="dashboard-box">
          <h3>Delete Policyholder</h3>
          <input type="text" placeholder="Policyholder ID" value={policyholderId} onChange={(e) => setPolicyholderId(e.target.value)} />
          <button
            onClick={() =>
              handleButtonClick("DELETE", `/policyholders/${policyholderId}`, {}, setDeletePolicyholderResponse)
            }
          >
            Delete Policyholder
          </button>
          {deletePolicyholderResponse && (
            <ReactJson src={deletePolicyholderResponse} {...jsonViewProps} />
          )}
        </div>

        {/* Delete Claim Box */}
        <div className="dashboard-box">
          <h3>Delete Claim</h3>
          <input type="text" placeholder="Policyholder ID" value={policyholderId} onChange={(e) => setPolicyholderId(e.target.value)} />
          <input type="text" placeholder="Policy ID" value={policyId} onChange={(e) => setPolicyId(e.target.value)} />
          <input type="text" placeholder="Claim ID" value={claimId} onChange={(e) => setClaimId(e.target.value)} />
          <button
            onClick={() =>
              handleButtonClick("DELETE", `/policyholders/${policyholderId}/policies/${policyId}/claims/${claimId}`, {}, setDeleteClaimResponse)
            }
          >
            Delete Claim
          </button>
          {deleteClaimResponse && (
            <ReactJson src={deleteClaimResponse} {...jsonViewProps} />
          )}
        </div>

        {/* Delete Policy Box */}
        <div className="dashboard-box">
          <h3>Delete Policy</h3>
          <input type="text" placeholder="Policyholder ID" value={policyholderId} onChange={(e) => setPolicyholderId(e.target.value)} />
          <input type="text" placeholder="Policy ID" value={policyId} onChange={(e) => setPolicyId(e.target.value)} />
          <button
            onClick={() =>
              handleButtonClick("DELETE", `/policyholders/${policyholderId}/policies/${policyId}`, {}, setDeletePolicyResponse)
            }
          >
            Delete Policy
          </button>
          {deletePolicyResponse && (
            <ReactJson src={deletePolicyResponse} {...jsonViewProps} />
          )}
        </div>

        {/* Fetch All Policies and Claims Box */}
        <div className="dashboard-box">
          <h3>Fetch All Policies and Claims</h3>
          <button
            onClick={() =>
              handleButtonClick("GET", "/policyholders/policies_and_claims", {}, setAllPoliciesAndClaims)
            }
          >
            Get All Policies and Claims
          </button>
          {allPoliciesAndClaims && (
            <ReactJson src={allPoliciesAndClaims} {...jsonViewProps} />
          )}
        </div>

        {/* Fetch Policies by Policyholder Box */}
        <div className="dashboard-box">
          <h3>Fetch Policies by Policyholder</h3>
          <input type="text" placeholder="Policyholder ID" value={policyholderId} onChange={(e) => setPolicyholderId(e.target.value)} />
          <button
            onClick={() =>
              handleButtonClick("GET", `/policyholders/${policyholderId}/policies`, {}, setPoliciesByPolicyholder)
            }
          >
            Get Policies
          </button>
          {policiesByPolicyholder && (
            <ReactJson src={policiesByPolicyholder} {...jsonViewProps} />
          )}
        </div>

        {/* Fetch Claims by Policyholder Box */}
        <div className="dashboard-box">
          <h3>Fetch Claims by Policyholder</h3>
          <input type="text" placeholder="Policyholder ID" value={policyholderId} onChange={(e) => setPolicyholderId(e.target.value)} />
          <button
            onClick={() =>
              handleButtonClick("GET", `/policyholders/${policyholderId}/claims`, {}, setClaimsByPolicyholder)
            }
          >
            Get Claims
          </button>
          {claimsByPolicyholder && (
            <ReactJson src={claimsByPolicyholder} {...jsonViewProps} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
