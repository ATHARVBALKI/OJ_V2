const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL_PROB = import.meta.env.VITE_BASE_URL_PROB;

export const endpoints = {
  SIGNUP_API: `${BASE_URL}/signup`,
  LOGIN_API: `${BASE_URL}/login`,
  GETPROBLEMS_API: `${BASE_URL_PROB}/`,
  CREATEPROB_API: `${BASE_URL_PROB}/create`,
  GETPROBLEMBYID_API: `${BASE_URL_PROB}/single`,
  UPDATEPROB_ID: `${BASE_URL_PROB}/update`,
  DELETEPROBLEM_API: `${BASE_URL_PROB}/delete`,
  RESETPASSWORD_API: `${BASE_URL}/resetpassword`,
  GETUSERS_API: `${BASE_URL}/allusers`,
  RUNPROB_API: `${BASE_URL_PROB}/run`,
  SUBMIT_PROB: `${BASE_URL_PROB}/submit`,
  GETSUBMISSIONS_API: `${BASE_URL_PROB}/getsubmissions`,
};



