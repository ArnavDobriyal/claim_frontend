import React, { useState } from "react";
import axios from "axios";
import './AdminDashboard.css'; // Importing the custom CSS file

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

  const [createPolicyholderResponse, setCreatePolicyholderResponse] = useState(null);
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
        url: `https://claim-managmen-1.onrender.com${endpoint}`,
        data,
        headers: {
          "api-key": "12345"  
        }
      });
      setResponse(response.data);
    } catch (error) {
      setResponse(error.toString());
    }
  };
  

  return (
    <div>
      <h1>ADMIN Insurance Dashboard</h1>

      <div>
        <h3>Create Policyholder</h3>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={() => handleButtonClick("POST", "/policyholders/", { name, email, password }, setCreatePolicyholderResponse)}>Create Policyholder</button>
        <pre>{createPolicyholderResponse ? JSON.stringify(createPolicyholderResponse, null, 2) : null}</pre>
      </div>

      <div>
        <h3>Update Policyholder</h3>
        <input type="text" placeholder="Policyholder ID" value={policyholderId} onChange={(e) => setPolicyholderId(e.target.value)} />
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={() => handleButtonClick("PUT", `/policyholders/${policyholderId}`, { name, email, password }, setUpdatePolicyholderResponse)}>Update Policyholder</button>
        <pre>{updatePolicyholderResponse ? JSON.stringify(updatePolicyholderResponse, null, 2) : null}</pre>
      </div>

      <div>
        <h3>Create Policy</h3>
        <input type="text" placeholder="Policyholder ID" value={policyholderId} onChange={(e) => setPolicyholderId(e.target.value)} />
        <input type="text" placeholder="Coverage" value={coverage} onChange={(e) => setCoverage(e.target.value)} />
        <button onClick={() => handleButtonClick("POST", `/policyholders/${policyholderId}/policies/`, { coverage }, setCreatePolicyResponse)}>Create Policy</button>
        <pre>{createPolicyResponse ? JSON.stringify(createPolicyResponse, null, 2) : null}</pre>
      </div>

      <div>
        <h3>Update Policy</h3>
        <input type="text" placeholder="Policyholder ID" value={policyholderId} onChange={(e) => setPolicyholderId(e.target.value)} />
        <input type="text" placeholder="Policy ID" value={policyId} onChange={(e) => setPolicyId(e.target.value)} />
        <input type="text" placeholder="Coverage" value={coverage} onChange={(e) => setCoverage(e.target.value)} />
        <input type="text" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
        <button onClick={() => handleButtonClick("PUT", `/policyholders/${policyholderId}/policies/${policyId}`, { coverage, status }, setUpdatePolicyResponse)}>Update Policy</button>
        <pre>{updatePolicyResponse ? JSON.stringify(updatePolicyResponse, null, 2) : null}</pre>
      </div>

      <div>
        <h3>Create Claim</h3>
        <input type="text" placeholder="Policyholder ID" value={policyholderId} onChange={(e) => setPolicyholderId(e.target.value)} />
        <input type="text" placeholder="Policy ID" value={policyId} onChange={(e) => setPolicyId(e.target.value)} />
        <input type="text" placeholder="Claim Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button onClick={() => handleButtonClick("POST", `/policyholders/${policyholderId}/policies/${policyId}/claims/`, { amount }, setCreateClaimResponse)}>Create Claim</button>
        <pre>{createClaimResponse ? JSON.stringify(createClaimResponse, null, 2) : null}</pre>
      </div>

      <div>
        <h3>Update Claim Status</h3>
        <input type="text" placeholder="Policyholder ID" value={policyholderId} onChange={(e) => setPolicyholderId(e.target.value)} />
        <input type="text" placeholder="Policy ID" value={policyId} onChange={(e) => setPolicyId(e.target.value)} />
        <input type="text" placeholder="Claim ID" value={claimId} onChange={(e) => setClaimId(e.target.value)} />
        <input type="text" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
        <button onClick={() => handleButtonClick("PUT", `/policyholders/${policyholderId}/policies/${policyId}/claims/${claimId}`, { status }, setUpdateClaimResponse)}>Update Claim Status</button>
        <pre>{updateClaimResponse ? JSON.stringify(updateClaimResponse, null, 2) : null}</pre>
      </div>

      <div>
        <h3>Delete Policyholder</h3>
        <input type="text" placeholder="Policyholder ID" value={policyholderId} onChange={(e) => setPolicyholderId(e.target.value)} />
        <button onClick={() => handleButtonClick("DELETE", `/policyholders/${policyholderId}`, {}, setDeletePolicyholderResponse)}>Delete Policyholder</button>
        <pre>{deletePolicyholderResponse ? JSON.stringify(deletePolicyholderResponse, null, 2) : null}</pre>
      </div>

      <div>
        <h3>Delete Claim</h3>
        <input type="text" placeholder="Policyholder ID" value={policyholderId} onChange={(e) => setPolicyholderId(e.target.value)} />
        <input type="text" placeholder="Policy ID" value={policyId} onChange={(e) => setPolicyId(e.target.value)} />
        <input type="text" placeholder="Claim ID" value={claimId} onChange={(e) => setClaimId(e.target.value)} />
        <button onClick={() => handleButtonClick("DELETE", `/policyholders/${policyholderId}/policies/${policyId}/claims/${claimId}`, {}, setDeleteClaimResponse)}>Delete Claim</button>
        <pre>{deleteClaimResponse ? JSON.stringify(deleteClaimResponse, null, 2) : null}</pre>
      </div>

      <div>
        <h3>Delete Policy</h3>
        <input type="text" placeholder="Policyholder ID" value={policyholderId} onChange={(e) => setPolicyholderId(e.target.value)} />
        <input type="text" placeholder="Policy ID" value={policyId} onChange={(e) => setPolicyId(e.target.value)} />
        <button onClick={() => handleButtonClick("DELETE", `/policyholders/${policyholderId}/policies/${policyId}`, {}, setDeletePolicyResponse)}>Delete Policy</button>
        <pre>{deletePolicyResponse ? JSON.stringify(deletePolicyResponse, null, 2) : null}</pre>
      </div>

      <div>
        <h3>Fetch All Policies and Claims</h3>
        <button onClick={() => handleButtonClick("GET", "/policyholders/policies_and_claims", {}, setAllPoliciesAndClaims)}>
          Get All Policies and Claims
        </button>
        <pre>{allPoliciesAndClaims ? JSON.stringify(allPoliciesAndClaims, null, 2) : null}</pre>
      </div>

      <div>
        <h3>Fetch Policies by Policyholder</h3>
        <input type="text" placeholder="Policyholder ID" value={policyholderId} onChange={(e) => setPolicyholderId(e.target.value)} />
        <button onClick={() => handleButtonClick("GET", `/policyholders/${policyholderId}/policies`, {}, setPoliciesByPolicyholder)}>
          Get Policies
        </button>
        <pre>{policiesByPolicyholder ? JSON.stringify(policiesByPolicyholder, null, 2) : null}</pre>
      </div>

      <div>
        <h3>Fetch Claims by Policyholder</h3>
        <input type="text" placeholder="Policyholder ID" value={policyholderId} onChange={(e) => setPolicyholderId(e.target.value)} />
        <button onClick={() => handleButtonClick("GET", `/policyholders/${policyholderId}/claims`, {}, setClaimsByPolicyholder)}>
          Get Claims
        </button>
        <pre>{claimsByPolicyholder ? JSON.stringify(claimsByPolicyholder, null, 2) : null}</pre>
      </div>

    </div>
  );
}

export default AdminDashboard;