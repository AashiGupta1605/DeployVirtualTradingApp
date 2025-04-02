
// // deepsekk photo new slice with remove photo

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { BASE_API_URL } from '../../../utils/BaseUrl';
// import { deleteOrganization } from '../../Admin/OrganizationListPage/OrganizationListSlice';
// import axiosInstance from '../../../utils/axiosConfig';

// // Async Thunks for Organization
// export const fetchOrganizations = createAsyncThunk(
//   'organizations/fetchOrganizations',
//   async () => {
//     const response = await axios.get(`${BASE_API_URL}/organization/list`);
//     return response.data;
//   }
// );

// // without token working

// // export const fetchOrgById = createAsyncThunk(
// //   "organizations/fetchOrgById",
// //   async (orgId, { rejectWithValue }) => {
// //     try {
// //       const response = await axios.get(`${BASE_API_URL}/organization/by-id?orgId=${orgId}`);
// //       console.log("Fetched Organization Data:", response.data.data); 
// //       return response.data.data; // Return the nested organization data
// //     } catch (error) {
// //       return rejectWithValue(error.response.data);
// //     }
// //   }
// // );

// export const fetchOrgById = createAsyncThunk(
//   "organizations/fetchOrgById",
//   async (orgId, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(`${BASE_API_URL}/organization/by-id?orgId=${orgId}`);
//       console.log("Fetched Organization Data:", response.data.data); 
//       return response.data.data; // Return the nested organization data
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );


// export const updateOrgDetails = createAsyncThunk(
//   "organizations/updateOrgDetails",
//   async ({ orgId, orgData }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.put(`${BASE_API_URL}/organization/update-by-id?orgId=${orgId}`, orgData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // export const loginOrganization = createAsyncThunk(
// //   'organizations/login',
// //   async (credentials, { rejectWithValue }) => {
// //     try {
// //       const response = await axios.post(`${BASE_API_URL}/organization/login`, credentials);
// //       return response.data;
// //     } catch (error) {
// //       return rejectWithValue(error.response.data);
// //     }
// //   }
// // );

// export const loginOrganization = createAsyncThunk(
//   'organizations/login',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${BASE_API_URL}/organization/login`, credentials);
//       console.log(response.data);
//       return response.data; // Return the successful response data
//     } catch (error) {
//       // Check if the error has a response and data
//       if (error.response && error.response.data) {
//         // Pass the error message from the backend to the frontend
//         console.log(error.response.data);
        
//         return rejectWithValue(error.response.data);
//       } else {
//         // Handle cases where the error does not have a response (e.g., network error)
//         return rejectWithValue({ message: 'An unexpected error occurred. Please try again.' });
//       }
//     }
//   }
// );

// export const registerOrganization = createAsyncThunk(
//   'organizations/register',
//   async (organizationData, { rejectWithValue }) => {
//     try {
//       const { photo, ...rest } = organizationData;

//       // Upload photo to Cloudinary if provided
//       let photoUrl = "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png"; // Default photo URL
//       if (photo && photo.startsWith('data:image')) {
//         const result = await axios.post(`${BASE_API_URL}/upload`, { file: photo });
//         photoUrl = result.data.secure_url;
//       }

//       const response = await axios.post(`${BASE_API_URL}/organization/register`, { ...rest, photo: photoUrl });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Organization Auth Slice
// const organizationAuthSlice = createSlice({
//   name: 'organizationAuth',
//   initialState: {
//     list: [], // For fetched organizations
//     currentOrg: null, // For currently viewed/updated organization
//     status: 'idle', // For fetchOrganizations
//     error: null, // For fetchOrganizations
//     orgName: localStorage.getItem("orgName") || null, // For login/register
//     loading: false, // For login/register
//     authError: null, // For login/register
//     success: false, // For login/register
//     updateError: null, // For updateOrgDetails
//     orgId: localStorage.getItem("orgId") || null, // For login/register
//     org: JSON.parse(localStorage.getItem("org")) || null, // For login/register
//   },
//   reducers: {
//     resetAuthState: (state) => {
//       state.orgName = null;
//       state.loading = false;
//       state.authError = null;
//       state.success = false;
//       state.token = null;
//       state.orgId = null;
//       state.org = null;
//     },
//     logoutOrganization: (state) => {
//       state.orgName = null;
//       state.success = false;
//       state.token = null;
//       state.orgId = null;
//       state.org = null;
//       localStorage.removeItem('orgName');
//       localStorage.removeItem("token");
//       localStorage.removeItem("orgId");
//       localStorage.removeItem("org");
//     },
//     addOrganization: (state, action) => {
//       state.list.push(action.payload);
//     },
//     removeOrganization: (state, action) => {
//       state.list = state.list.filter(org => org._id !== action.payload);
//     },
//     // updateOrgId: (state, action) => {
//     //   state.orgId = action.payload;
//     //   localStorage.setItem("orgId", action.payload); // Update orgId in local storage
//     // },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchOrganizations.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchOrganizations.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.list = action.payload;
//       })
//       .addCase(fetchOrganizations.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(fetchOrgById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchOrgById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentOrg = action.payload;
//       })
//       .addCase(fetchOrgById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(updateOrgDetails.pending, (state) => {
//         state.loading = true;
//         state.updateError = null;
//       })
//       .addCase(updateOrgDetails.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentOrg = action.payload; // Update the current organization
//         state.success = true;
//       })
//       .addCase(updateOrgDetails.rejected, (state, action) => {
//         state.loading = false;
//         state.updateError = action.payload;
//       })
//       .addCase(deleteOrganization.fulfilled, (state, action) => {
//         state.list = state.list.filter(
//           org => org._id !== action.payload
//         );
//       })
//       .addCase(loginOrganization.pending, (state) => {
//         state.loading = true;
//         state.authError = null;
//       })
//       .addCase(loginOrganization.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orgName = action.payload.orgName;
//         state.success = true;
//         state.token = action.payload.token;
//         state.orgId = action.payload.orgId; // Update orgId in Redux state
//         state.org = action.payload.org; // Update org in Redux state
//         localStorage.setItem('orgName', action.payload.orgName);
//         localStorage.setItem('token', action.payload.token);
//         localStorage.setItem('orgId', action.payload.orgId); // Update orgId in local storage
//         localStorage.setItem('org', JSON.stringify(action.payload.org)); // Update org in local storage
//       })
//       .addCase(loginOrganization.rejected, (state, action) => {
//         state.loading = false;
//         state.authError = action.payload.message;
//       })
//       .addCase(registerOrganization.pending, (state) => {
//         state.loading = true;
//         state.authError = null;
//       })
//       .addCase(registerOrganization.fulfilled, (state) => {
//         state.loading = false;
//         state.success = true;
//       })
//       .addCase(registerOrganization.rejected, (state, action) => {
//         state.loading = false;
//         state.authError = action.payload.message;
//       });
//   }
// });

// export const { resetAuthState, logoutOrganization, addOrganization, removeOrganization } = organizationAuthSlice.actions;
// export default organizationAuthSlice.reducer;










// =======================================================




// photo uplaod problem after push 
// deepsekk photo new slice with remove photo

// deepsekk photo new slice with remove photo

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../../utils/BaseUrl';
import { deleteOrganization } from '../../Admin/OrganizationListPage/OrganizationListSlice';
import axiosInstance from '../../../utils/axiosConfig';

// Async Thunks for Organization
export const fetchOrganizations = createAsyncThunk(
  'organizations/fetchOrganizations',
  async () => {
    const response = await axios.get(`${BASE_API_URL}/organization/list`);
    return response.data;
  }
);

// without token working

// export const fetchOrgById = createAsyncThunk(
//   "organizations/fetchOrgById",
//   async (orgId, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${BASE_API_URL}/organization/by-id?orgId=${orgId}`);
//       console.log("Fetched Organization Data:", response.data.data); 
//       return response.data.data; // Return the nested organization data
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const fetchOrgById = createAsyncThunk(
  "organizations/fetchOrgById",
  async (orgId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${BASE_API_URL}/organization/by-id?orgId=${orgId}`);
      console.log("Fetched Organization Data:", response.data.data); 
      return response.data.data; // Return the nested organization data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const updateOrgDetails = createAsyncThunk(
  "organizations/updateOrgDetails",
  async ({ orgId, orgData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`${BASE_API_URL}/organization/update-by-id?orgId=${orgId}`, orgData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const loginOrganization = createAsyncThunk(
//   'organizations/login',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${BASE_API_URL}/organization/login`, credentials);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const loginOrganization = createAsyncThunk(
  'organizations/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/organization/login`, credentials);
      console.log(response.data);
      return response.data; // Return the successful response data
    } catch (error) {
      // Check if the error has a response and data
      if (error.response && error.response.data) {
        // Pass the error message from the backend to the frontend
        console.log(error.response.data);
        
        return rejectWithValue(error.response.data);
      } else {
        // Handle cases where the error does not have a response (e.g., network error)
        return rejectWithValue({ message: 'An unexpected error occurred. Please try again.' });
      }
    }
  }
);

export const registerOrganization = createAsyncThunk(
  'organizations/register',
  async (organizationData, { rejectWithValue }) => {
    try {
      const { photo, ...rest } = organizationData;

      // Upload photo to Cloudinary if provided
      let photoUrl = "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png"; // Default photo URL
      if (photo && photo.startsWith('data:image')) {
        const result = await axios.post(`${BASE_API_URL}/upload`, { file: photo });
        photoUrl = result.data.secure_url;
      }

      const response = await axios.post(`${BASE_API_URL}/organization/register`, { ...rest, photo: photoUrl });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 1️⃣ Forgot Password - Send Reset Link
export const forgotPasswordOrganization = createAsyncThunk(
  "organizations/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/organization/forgot-password`, { email });
      return response.data; // { message: "Password reset link sent to your email" }
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong!" });
    }
  }
);

// 2️⃣ Reset Password - Update New Password
export const resetPasswordOrganization = createAsyncThunk(
  "organizations/resetPassword",
  async ({ token, newPassword, confirmPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/organization/reset-password/${token}`, {
        newPassword,
        confirmPassword,
      });
      return response.data.message; // Success message
    } catch (error) {
      let errorMessage = "Failed to reset password. Please try again.";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 400) {
        errorMessage = "Invalid or expired reset link.";
      } else if (error.response?.status === 404) {
        errorMessage = "Organization not found.";
      }

      return rejectWithValue(errorMessage);
    }
  }
);


// Organization Auth Slice
const organizationAuthSlice = createSlice({
  name: 'organizationAuth',
  initialState: {
    list: [], // For fetched organizations
    currentOrg: null, // For currently viewed/updated organization
    status: 'idle', // For fetchOrganizations
    error: null, // For fetchOrganizations
    orgName: localStorage.getItem("orgName") || null, // For login/register
    loading: false, // For login/register
    authError: null, // For login/register
    success: false, // For login/register
    updateError: null, // For updateOrgDetails
    orgId: localStorage.getItem("orgId") || null, // For login/register
    org: JSON.parse(localStorage.getItem("org")) || null, // For login/register
  },
  reducers: {
    resetAuthState: (state) => {
      state.orgName = null;
      state.loading = false;
      state.authError = null;
      state.success = false;
      state.token = null;
      state.orgId = null;
      state.org = null;
    },
    logoutOrganization: (state) => {
      state.orgName = null;
      state.success = false;
      state.token = null;
      state.orgId = null;
      state.org = null;
      localStorage.removeItem('orgName');
      localStorage.removeItem("token");
      localStorage.removeItem("orgId");
      localStorage.removeItem("org");
    },
    addOrganization: (state, action) => {
      state.list.push(action.payload);
    },
    removeOrganization: (state, action) => {
      state.list = state.list.filter(org => org._id !== action.payload);
    },
    // updateOrgId: (state, action) => {
    //   state.orgId = action.payload;
    //   localStorage.setItem("orgId", action.payload); // Update orgId in local storage
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchOrgById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrgById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrg = action.payload;
      })
      .addCase(fetchOrgById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrgDetails.pending, (state) => {
        state.loading = true;
        state.updateError = null;
      })
      .addCase(updateOrgDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrg = action.payload; // Update the current organization
        state.success = true;
        if (action.payload.name) {
          state.orgName = action.payload.name;
          localStorage.setItem('orgName', action.payload.name);
        }
      })
      .addCase(updateOrgDetails.rejected, (state, action) => {
        state.loading = false;
        state.updateError = action.payload;
      })
      .addCase(deleteOrganization.fulfilled, (state, action) => {
        state.list = state.list.filter(
          org => org._id !== action.payload
        );
      })
      .addCase(loginOrganization.pending, (state) => {
        state.loading = true;
        state.authError = null;
      })
      .addCase(loginOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.orgName = action.payload.orgName;
        state.success = true;
        state.token = action.payload.token;
        state.orgId = action.payload.orgId; // Update orgId in Redux state
        state.org = action.payload.org; // Update org in Redux state
        localStorage.setItem('orgName', action.payload.orgName);
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('orgId', action.payload.orgId); // Update orgId in local storage
        localStorage.setItem('org', JSON.stringify(action.payload.org)); // Update org in local storage
      })
      .addCase(loginOrganization.rejected, (state, action) => {
        state.loading = false;
        state.authError = action.payload.message;
      })
      .addCase(registerOrganization.pending, (state) => {
        state.loading = true;
        state.authError = null;
      })
      .addCase(registerOrganization.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerOrganization.rejected, (state, action) => {
        state.loading = false;
        state.authError = action.payload.message;
      })
       // Forgot Password (Organization)
       .addCase(forgotPasswordOrganization.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPasswordOrganization.fulfilled, (state) => {
        state.status = "succeeded";
        state.loading = false;
      })
      .addCase(forgotPasswordOrganization.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload || "Failed to send reset link";
      })

      // Reset Password (Organization)
      .addCase(resetPasswordOrganization.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordOrganization.fulfilled, (state) => {
        state.status = "succeeded";
        state.loading = false;
      })
      .addCase(resetPasswordOrganization.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload || "Failed to reset password";
      });
  },
});

export const { resetAuthState, logoutOrganization, addOrganization, removeOrganization } = organizationAuthSlice.actions;
export default organizationAuthSlice.reducer;