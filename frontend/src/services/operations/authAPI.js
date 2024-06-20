import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { setToken } from "../../slices/authSlice";
import { useSelector } from "react-redux";
import { setUser } from "../../slices/profileSlice";

const {
  SIGNUP_API,
  LOGIN_API,
  GETPROBLEMS_API,
  CREATEPROB_API,
  GETPROBLEMBYID_API,
  UPDATEPROB_ID,
  DELETEPROBLEM_API,
  RESETPASSWORD_API,
  GETUSERS_API,
  RUNPROB_API,
  SUBMIT_PROB,
  GETSUBMISSIONS_API,
} = endpoints;

export function signUp(signupdata, navigate) {
  const { firstName, lastName, email, password, confirmPassword, accountType } =
    signupdata;
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")

    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
      });

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      // console.log("login error")
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      // navigate("/signup")
    }
    // dispatch(setLoading(false))
    // toast.dismiss(toastId)
  };
}

export function login(logindata, navigate) {
  const { email, password } = logindata;
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")

    try {
      const response = await apiConnector(
        "POST",
        LOGIN_API,
        {
          email,
          password,
        },
        "include",
        true
      );

      console.log("login API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      // console.log("login error")
      toast.success("Login Successful");
      console.log(response.data.token);
      dispatch(setToken(response.data.token));

      dispatch(setUser(response.data.user));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // console.log(userImage)

      console.log("FROM AUTHAPI USER", response.data.user);

      navigate("/dashboard");
    } catch (error) {
      console.log("login API ERROR............", error);
      toast.error("login Failed");
      navigate("/signup");
    }
  };
}

export async function getProblems() {
  let result = [];
  const toastId = toast.loading("...Loading");
  try {
    console.log("BEFORE Calling BACKEND API FOR ALL PROBELMS");
    const response = await apiConnector("GET", GETPROBLEMS_API);
    console.log("AFTER Calling BACKEND API FOR ALL PROBELMS");
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.problems;
    // console.log(result);
  } catch (error) {
    console.log("CANNOT GET PROBLEMS API ERROR............", error);
    toast.error("Could Not Problem-Set");
  }
  toast.dismiss(toastId);
  return result;
}

export function createProblem(createproblemdata, navigate, token) {
  const {
    title,
    description,
    difficulty,
    inputformat,
    outputformat,
    sampleinput1,
    sampleoutput1,
    testCases,
  } = createproblemdata;
  console.log("MU TOKEN __>", token);
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")
    // console.log(createproblemdata);

    try {
      const response = await apiConnector(
        "POST",
        CREATEPROB_API,
        {
          title,
          description,
          difficulty,
          inputformat,
          outputformat,
          sampleinput1,
          sampleoutput1,
          testCases,
        },
        null,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      // console.log("create API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      // console.log("login error")
      toast.success("Problem created Successfully");
      navigate("/edit-problem");
    } catch (error) {
      // console.log("SIGNUP API ERROR............", error);
      toast.error("problem not create");
      // navigate("/signup")
    }
    // dispatch(setLoading(false))
    // toast.dismiss(toastId)
  };
}

export async function getProblembyid(id) {
  let result = null;
  const url = `${GETPROBLEMBYID_API}/${id}`;

  try {
    console.log("BEFORE Calling BACKEND API FOR problembyid");

    const response = await apiConnector("GET", url);
    console.log("AFTER Calling BACKEND API FOR ALL problembyid");
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response;
    console.log(result);
  } catch (error) {
    console.log("API ERROR............", error);
    toast.error("Could Not Get problem");
  }

  return result;
}

export function updateProblem(id, createproblemdata, navigate) {
  const {
    title,
    description,
    difficulty,
    inputformat,
    outputformat,
    sampleinput1,
    sampleoutput1,
  } = createproblemdata;
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")
    // console.log(createproblemdata);
    const url = `${UPDATEPROB_ID}/${id}`;

    try {
      const response = await apiConnector("PUT", url, {
        title,
        description,
        difficulty,
        inputformat,
        outputformat,
        sampleinput1,
        sampleoutput1,
      });

      // console.log("create API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      // console.log("login error")
      toast.success("Problem Updated Successfully");
      navigate("/edit-problem");
    } catch (error) {
      // console.log("SIGNUP API ERROR............", error);
      toast.error("Problem is not updated");
      // navigate("/signup")
    }
    // dispatch(setLoading(false))
    // toast.dismiss(toastId)
  };
}

export async function deleteProblem(id, navigate) {
  const url = `${DELETEPROBLEM_API}/${id}`;

  try {
    console.log("BEFORE Calling BACKEND API TO DELETE");

    const response = await apiConnector("DELETE", url);
    console.log("AFTER Calling BACKEND API TO DELETE");
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Problem deleted successfully");
    // navigate("/edit-problem")
  } catch (error) {
    console.log("API ERROR............", error);
    toast.error("Could Not DELETE problem");
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}

export function resetPassword(formData, navigate) {
  const { email, password, confirmPassword } = formData;
  console.log("--------------->>>>>>>>>", formData);
  return async (dispatch) => {
    // dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        email,
        password,
        confirmPassword,
      });

      console.log("RESET Password RESPONSE ... ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
      navigate("/login");
    } catch (error) {
      console.log("RESET PASSWORD Error", error);
      toast.error("Unable to reset password");
    }
    // dispatch(setLoading(false));
  };
}

export async function getusers() {
  let result = [];
  const toastId = toast.loading("Loading...");
  try {
    console.log("BEFORE Calling BACKEND API FOR ALL users");
    const response = await apiConnector("GET", GETUSERS_API);
    console.log("AFTER Calling BACKEND API FOR ALL users");
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.users;
    // console.log(result);
  } catch (error) {
    console.log("CAN'T RETRIEVE USERS ERROR............", error);
    toast.error("Could Not Get users");
  }
  toast.dismiss(toastId);

  return result;
}

export async function runproblem(payload) {
  const { language, code, input } = payload;
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    console.log("BEFORE Calling BACKEND API to run");
    const response = await apiConnector("POST", RUNPROB_API, {
      language,
      code,
      input,
    });
    console.log("AFTER Calling BACKEND API from run");
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response;
  } catch (error) {
    console.log("CAN'T RETRIEVE output ERROR............", error);
  }
  toast.dismiss(toastId);
  return result;
}

export async function submitproblem(payload, problemid, token) {
  const { language, code } = payload;
  const url = `${SUBMIT_PROB}/${problemid}`;
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    console.log("BEFORE Calling BACKEND API to submit");
    const response = await apiConnector(
      "POST",
      url,
      {
        language,
        code,
      },
      null,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("AFTER Calling BACKEND API from submit");
    console.log("response data--->>", response);
    // toast.success("Code Submitted successfully");
    result = response;
  } catch (error) {
    console.log("CAN'T RETRIEVE output ERROR............", error);
    toast.error("Compilation Error");
  }
  toast.dismiss(toastId);
  return result;
}

export async function getsubmissions() {
  let result = [];
  const toastId = toast.loading("Loading...");
  try {
    console.log("BEFORE Calling BACKEND API FOR ALL submissions");
    const response = await apiConnector("GET", GETSUBMISSIONS_API);
    console.log("AFTER Calling BACKEND API FOR ALL users");
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.submissions;
    console.log(result);
  } catch (error) {
    console.log("CAN'T RETRIEVE USERS ERROR............", error);
    toast.error("Could Not Get users");
  }
  toast.dismiss(toastId);
  return result;
}
