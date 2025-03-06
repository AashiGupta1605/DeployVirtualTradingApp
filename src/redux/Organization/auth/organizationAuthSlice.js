// import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { BASE_API_URL } from '../../../utils/BaseUrl';
// import { deleteOrganization } from '../../Admin/OrganizationListPage/OrganizationListSlice';

// // Import existing reducers

 
// // Async Thunks for Organization
// export const fetchOrganizations = createAsyncThunk(
//   'organizations/fetchOrganizations',
//   async () => {
//     const response = await axios.get(`${BASE_API_URL}/organization/display-all-org`);
//     return response.data;
//   }
// );


// // mobile and jwt added

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
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const registerOrganization = createAsyncThunk(
//   'organizations/register',
//   async (organizationData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${BASE_API_URL}/organization/register`, organizationData);
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
//     status: 'idle', // For fetchOrganizations
//     error: null, // For fetchOrganizations
//     orgName: null, // For login/register
//     loading: false, // For login/register
//     authError: null, // For login/register
//     success: false, // For login/register
//   },
//   reducers: {
//     resetAuthState: (state) => {
//       state.orgName = null;
//       state.loading = false;
//       state.authError = null;
//       state.success = false;
//       state.token = null;
//     },
//     logoutOrganization: (state) => {
//       state.orgName = null;
//       state.success = false;
//       state.token = null;
//       localStorage.removeItem('orgName');
//       localStorage.removeItem("token");
//     },
//     addOrganization: (state, action) => {
//       state.organizations.push(action.payload);
//       state.totalOrganizations += 1;
//     },
//     removeOrganization: (state, action) => {
//       state.organizations = state.organizations.filter(org => org._id !== action.payload);
//       state.totalOrganizations = Math.max(0, state.totalOrganizations - 1);
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchOrganizations.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchOrganizations.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.organizations = action.payload;
//       })
//       .addCase(fetchOrganizations.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(deleteOrganization.fulfilled, (state, action) => {
//         state.organizations = state.organizations.filter(
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
//         localStorage.setItem('orgName', action.payload.orgName);
//         localStorage.setItem('token', action.payload.token);
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
//         // state.status = 'idle';
//       })
//       .addCase(registerOrganization.rejected, (state, action) => {
//         state.loading = false;
//         state.authError = action.payload.message;
//       });
//   }
// });

// export const { resetAuthState, logoutOrganization } = organizationAuthSlice.actions;
// export default organizationAuthSlice.reducer;




// // working --
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { BASE_API_URL } from '../../../utils/BaseUrl';
// import { deleteOrganization } from '../../Admin/OrganizationListPage/OrganizationListSlice';

// // Async Thunks for Organization
// export const fetchOrganizations = createAsyncThunk(
//   'organizations/fetchOrganizations',
//   async () => {
//     const response = await axios.get(`${BASE_API_URL}/organization/list`);
//     return response.data;
//   }
// );


// export const fetchOrgById = createAsyncThunk(
//   "organizations/fetchOrgById",
//   async (orgId, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${BASE_API_URL}/organization/by-id?orgId=${orgId}`);
//       return response.data.data; // Return the nested organization data
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const updateOrgDetails = createAsyncThunk(
//   "organizations/updateOrgDetails",
//   async ({ orgId, orgData }, { rejectWithValue, dispatch }) => {
//     try {
//       const response = await axios.put(`${BASE_API_URL}/organization/update-by-id?orgId=${orgId}`, orgData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

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

// export const registerOrganization = createAsyncThunk(
//   'organizations/register',
//   async (organizationData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${BASE_API_URL}/organization/register`, organizationData);
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
//     // updateStatus: 'idle', // For updateOrgDetails
//     updateError: null, // For updateOrgDetails
//     orgId: localStorage.getItem("orgId") || null
//   },
//   reducers: {
//     resetAuthState: (state) => {
//       state.orgName = null;
//       state.loading = false;
//       state.authError = null;
//       state.success = false;
//       state.token = null;
//       state.orgId = null;
//     },
//     logoutOrganization: (state) => {
//       state.orgName = null;
//       state.success = false;
//       state.token = null;
//       localStorage.removeItem('orgName');
//       localStorage.removeItem("token");
//       localStorage.removeItem("orgId")
//     },
//     addOrganization: (state, action) => {
//       state.organizations.push(action.payload);
//       state.totalOrganizations += 1;
//     },
//     removeOrganization: (state, action) => {
//       state.organizations = state.organizations.filter(org => org._id !== action.payload);
//       state.totalOrganizations = Math.max(0, state.totalOrganizations - 1);
//     },
//     updateOrgId: (state, action) => {
//       state.orgId = action.payload;
//       localStorage.setItem("orgId", action.payload); // Update orgId in local storage
//     },
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
//       // .addCase(fetchOrgByName.pending, (state) => {
//       //   state.loading = true;
//       //   state.error = null;
//       // })
//       // .addCase(fetchOrgByName.fulfilled, (state, action) => {
//       //   state.loading = false;
//       //   state.currentOrg = action.payload;
//       //   console.log("Redux State - currentOrg:", state.currentOrg); 
//       // })
//       // .addCase(fetchOrgByName.rejected, (state, action) => {
//       //   state.loading = false;
//       //   state.error = action.payload;
//       // })
//       // .addCase(updateOrgDetails.pending, (state) => {
//       //   state.loading = true;
//       //   state.error = null;
//       // })
//       // .addCase(updateOrgDetails.fulfilled, (state, action) => {
//       //   state.loading = false;
//       //   state.currentOrg = action.payload;
//       //   console.log("Redux State - currentOrg:", state.currentOrg); 
//       // })
//       // .addCase(updateOrgDetails.rejected, (state, action) => {
//       //   state.loading = false;
//       //   state.error = action.payload;
//       // })
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
//         state.error = null;
//       })
//       .addCase(updateOrgDetails.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentOrg = action.payload;
//       })
//       .addCase(updateOrgDetails.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
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
//         localStorage.setItem('orgName', action.payload.orgName);
//         localStorage.setItem('token', action.payload.token);
//         localStorage.setItem('orgId', action.payload.orgId);
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

// export const { resetAuthState, logoutOrganization } = organizationAuthSlice.actions;
// export default organizationAuthSlice.reducer;







// redux new for org prfile

// working--
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { BASE_API_URL } from '../../../utils/BaseUrl';
// import { deleteOrganization } from '../../Admin/OrganizationListPage/OrganizationListSlice';

// // Async Thunks for Organization
// export const fetchOrganizations = createAsyncThunk(
//   'organizations/fetchOrganizations',
//   async () => {
//     const response = await axios.get(`${BASE_API_URL}/organization/list`);
//     return response.data;
//   }
// );

// export const fetchOrgById = createAsyncThunk(
//   "organizations/fetchOrgById",
//   async (orgId, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${BASE_API_URL}/organization/by-id?orgId=${orgId}`);
//       return response.data.data; // Return the nested organization data
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const updateOrgDetails = createAsyncThunk(
//   "organizations/updateOrgDetails",
//   async ({ orgId, orgData }, { rejectWithValue, dispatch }) => {
//     try {
//       const response = await axios.put(`${BASE_API_URL}/organization/update-by-id?orgId=${orgId}`, orgData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

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

// export const registerOrganization = createAsyncThunk(
//   'organizations/register',
//   async (organizationData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${BASE_API_URL}/organization/register`, organizationData);
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
//   },
//   reducers: {
//     resetAuthState: (state) => {
//       state.orgName = null;
//       state.loading = false;
//       state.authError = null;
//       state.success = false;
//       state.token = null;
//       state.orgId = null;
//     },
//     logoutOrganization: (state) => {
//       state.orgName = null;
//       state.success = false;
//       state.token = null;
//       state.orgId = null;
//       localStorage.removeItem('orgName');
//       localStorage.removeItem("token");
//       localStorage.removeItem("orgId");
//     },
//     addOrganization: (state, action) => {
//       state.organizations.push(action.payload);
//       state.totalOrganizations += 1;
//     },
//     removeOrganization: (state, action) => {
//       state.organizations = state.organizations.filter(org => org._id !== action.payload);
//       state.totalOrganizations = Math.max(0, state.totalOrganizations - 1);
//     },
//     updateOrgId: (state, action) => {
//       state.orgId = action.payload;
//       localStorage.setItem("orgId", action.payload); // Update orgId in local storage
//     },
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
//         state.error = null;
//       })
//       .addCase(updateOrgDetails.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentOrg = action.payload;
//       })
//       .addCase(updateOrgDetails.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
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
//         localStorage.setItem('orgName', action.payload.orgName);
//         localStorage.setItem('token', action.payload.token);
//         localStorage.setItem('orgId', action.payload.orgId); // Update orgId in local storage
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

// export const { resetAuthState, logoutOrganization } = organizationAuthSlice.actions;
// export default organizationAuthSlice.reducer;


// phot code c;lduanirty

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { BASE_API_URL } from '../../../utils/BaseUrl';
// import { deleteOrganization } from '../../Admin/OrganizationListPage/OrganizationListSlice';

// // Async Thunks for Organization
// export const fetchOrganizations = createAsyncThunk(
//   'organizations/fetchOrganizations',
//   async () => {
//     const response = await axios.get(`${BASE_API_URL}/organization/list`);
//     return response.data;
//   }
// );

// export const fetchOrgById = createAsyncThunk(
//   "organizations/fetchOrgById",
//   async (orgId, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${BASE_API_URL}/organization/by-id?orgId=${orgId}`);
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
//       const response = await axios.put(`${BASE_API_URL}/organization/update-by-id?orgId=${orgId}`, orgData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

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
//   },
//   reducers: {
//     resetAuthState: (state) => {
//       state.orgName = null;
//       state.loading = false;
//       state.authError = null;
//       state.success = false;
//       state.token = null;
//       state.orgId = null;
//     },
//     logoutOrganization: (state) => {
//       state.orgName = null;
//       state.success = false;
//       state.token = null;
//       state.orgId = null;
//       localStorage.removeItem('orgName');
//       localStorage.removeItem("token");
//       localStorage.removeItem("orgId");
//     },
//     addOrganization: (state, action) => {
//       state.organizations.push(action.payload);
//       state.totalOrganizations += 1;
//     },
//     removeOrganization: (state, action) => {
//       state.organizations = state.organizations.filter(org => org._id !== action.payload);
//       state.totalOrganizations = Math.max(0, state.totalOrganizations - 1);
//     },
//     updateOrgId: (state, action) => {
//       state.orgId = action.payload;
//       localStorage.setItem("orgId", action.payload); // Update orgId in local storage
//     },
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
//         state.error = null;
//       })
//       .addCase(updateOrgDetails.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentOrg = action.payload;
//       })
//       .addCase(updateOrgDetails.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
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
//         localStorage.setItem('orgName', action.payload.orgName);
//         localStorage.setItem('token', action.payload.token);
//         localStorage.setItem('orgId', action.payload.orgId); // Update orgId in local storage
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

// export const { resetAuthState, logoutOrganization, addOrganization, removeOrganization, updateOrgId } = organizationAuthSlice.actions;
// export default organizationAuthSlice.reducer;


// deepseek photo 

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../../utils/BaseUrl';
import { deleteOrganization } from '../../Admin/OrganizationListPage/OrganizationListSlice';

// Async Thunks for Organization
export const fetchOrganizations = createAsyncThunk(
  'organizations/fetchOrganizations',
  async () => {
    const response = await axios.get(`${BASE_API_URL}/organization/list`);
    return response.data;
  }
);

export const fetchOrgById = createAsyncThunk(
  "organizations/fetchOrgById",
  async (orgId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/organization/by-id?orgId=${orgId}`);
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
      const response = await axios.put(`${BASE_API_URL}/organization/update-by-id?orgId=${orgId}`, orgData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginOrganization = createAsyncThunk(
  'organizations/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/organization/login`, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
  },
  reducers: {
    resetAuthState: (state) => {
      state.orgName = null;
      state.loading = false;
      state.authError = null;
      state.success = false;
      state.token = null;
      state.orgId = null;
    },
    logoutOrganization: (state) => {
      state.orgName = null;
      state.success = false;
      state.token = null;
      state.orgId = null;
      localStorage.removeItem('orgName');
      localStorage.removeItem("token");
      localStorage.removeItem("orgId");
    },
    addOrganization: (state, action) => {
      state.organizations.push(action.payload);
      state.totalOrganizations += 1;
    },
    removeOrganization: (state, action) => {
      state.organizations = state.organizations.filter(org => org._id !== action.payload);
      state.totalOrganizations = Math.max(0, state.totalOrganizations - 1);
    },
    updateOrgId: (state, action) => {
      state.orgId = action.payload;
      localStorage.setItem("orgId", action.payload); // Update orgId in local storage
    },
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
        state.error = null;
      })
      .addCase(updateOrgDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrg = action.payload;
      })
      .addCase(updateOrgDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
        localStorage.setItem('orgName', action.payload.orgName);
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('orgId', action.payload.orgId); // Update orgId in local storage
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
      });
  }
});

export const { resetAuthState, logoutOrganization, addOrganization, removeOrganization, updateOrgId } = organizationAuthSlice.actions;
export default organizationAuthSlice.reducer;