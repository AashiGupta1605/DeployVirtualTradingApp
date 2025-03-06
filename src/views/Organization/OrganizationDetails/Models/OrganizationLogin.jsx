// workign mobile and email both

// // update added jwt and mobile number
// import React, {useState} from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginOrganization, resetAuthState } from '../../../../redux/Organization/auth/organizationAuthSlice';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// const OrganizationLogin = ({ isOpen, onClose }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading } = useSelector((state) => state.organization.auth);

//   const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'

//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       mobile: '',
//       password: '',
//     },
//     validationSchema: Yup.object({
//       email: loginMethod === 'email' ? Yup.string().email('Invalid email format').required('Email is required') : Yup.string(),
//       mobile: loginMethod === 'phone' ? Yup.string().required('Mobile is required') : Yup.string(),
//       password: Yup.string().required('Password is required'),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         const credentials = loginMethod === 'email' ? { email: values.email, password: values.password } : { mobile: values.mobile, password: values.password };
//         const resultAction = await dispatch(loginOrganization(credentials));

//         if (loginOrganization.fulfilled.match(resultAction)) {
//           toast.success('Login successful!');
//           localStorage.setItem('orgName', resultAction.payload.orgName);
//           localStorage.setItem('token', resultAction.payload.token);
//           localStorage.setItem('orgId', resultAction.payload.orgId);

//           navigate('/organization/dashboard');
//         } else if (loginOrganization.rejected.match(resultAction)) {
//           toast.error(resultAction.payload?.message || 'Login failed. Please try again.');
//         }
//       } catch (error) {
//         console.error('Error during login:', error);
//         toast.error('An unexpected error occurred. Please try again.');
//       } finally {
//         resetForm();
//       }
//     },
//   });

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
//       <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
//       <div style={{ width: '100%', maxWidth: '40%' }} className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
//         <div className="flex justify-between items-center p-6 border-b border-gray-100">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
//               <i className="fas fa-user text-white"></i>
//             </div>
//             <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
//           </div>
//           <button
//             onClick={() => {
//               onClose();
//               dispatch(resetAuthState());
//             }}
//             className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
//           >
//             <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
//           </button>
//         </div>
//         <div className="p-6 overflow-y-auto max-h-[80vh]">
//           {loading ? (
//             <p className="text-center">Loading...</p>
//           ) : (
//             <form onSubmit={formik.handleSubmit} className="space-y-6">
//               <div className="space-y-4">
//                 <div className="flex justify-center gap-x-8">
//                   <button
//                     type="button"
//                     onClick={() => setLoginMethod('email')}
//                     className={`px-4 py-2 rounded-xl ${loginMethod === 'email' ? 'bg-lightBlue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//                   >
//                     Login with Email
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setLoginMethod('phone')}
//                     className={`px-4 py-2 rounded-xl ${loginMethod === 'phone' ? 'bg-lightBlue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//                   >
//                     Login with Phone
//                   </button>
//                 </div>
//                 {loginMethod === 'email' && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formik.values.email}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                       placeholder="Enter email address"
//                       required
//                     />
//                     {formik.touched.email && formik.errors.email && (
//                       <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
//                     )}
//                   </div>
//                 )}
//                 {loginMethod === 'phone' && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//                     <input
//                       type="text"
//                       name="mobile"
//                       value={formik.values.mobile}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                       placeholder="Enter phone number"
//                       required
//                     />
//                     {formik.touched.mobile && formik.errors.mobile && (
//                       <div className="text-red-500 text-sm mt-1">{formik.errors.mobile}</div>
//                     )}
//                   </div>
//                 )}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={formik.values.password}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter password"
//                     required
//                   />
//                   {formik.touched.password && formik.errors.password && (
//                     <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
//                   )}
//                 </div>
//               </div>
//               <div className="flex justify-end items-center space-x-4 pt-4 border-t border-gray-100">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     formik.resetForm();
//                     onClose();
//                     dispatch(resetAuthState());
//                   }}
//                   className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="px-6 py-3 rounded-xl bg-gradient-to-r bg-lightBlue-600 text-white hover:bg-lightBlue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                 >
//                   {loading ? 'Logging in...' : 'Login'}
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizationLogin;



// new ones:


import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginOrganization, resetAuthState } from '../../../../redux/Organization/auth/organizationAuthSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const OrganizationLogin = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.organization.auth);

  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'

  const formik = useFormik({
    initialValues: {
      email: '',
      mobile: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: loginMethod === 'email' ? Yup.string().email('Invalid email format').required('Email is required') : Yup.string(),
      mobile: loginMethod === 'phone' ? Yup.string().required('Mobile is required') : Yup.string(),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const credentials = loginMethod === 'email' ? { email: values.email, password: values.password } : { mobile: values.mobile, password: values.password };
        const resultAction = await dispatch(loginOrganization(credentials));

        if (loginOrganization.fulfilled.match(resultAction)) {
          toast.success('Login successful!');
          localStorage.setItem('orgName', resultAction.payload.orgName);
          localStorage.setItem('token', resultAction.payload.token);
          localStorage.setItem('orgId', resultAction.payload.orgId); // Set orgId in local storage

          navigate('/organization/dashboard');
        } else if (loginOrganization.rejected.match(resultAction)) {
          toast.error(resultAction.payload?.message || 'Login failed. Please try again.');
        }
      } catch (error) {
        console.error('Error during login:', error);
        toast.error('An unexpected error occurred. Please try again.');
      } finally {
        resetForm();
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      <div style={{ width: '100%', maxWidth: '40%' }} className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-user text-white"></i>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
          </div>
          <button
            onClick={() => {
              onClose();
              dispatch(resetAuthState());
            }}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-center gap-x-8">
                  <button
                    type="button"
                    onClick={() => setLoginMethod('email')}
                    className={`px-4 py-2 rounded-xl ${loginMethod === 'email' ? 'bg-lightBlue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    Login with Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginMethod('phone')}
                    className={`px-4 py-2 rounded-xl ${loginMethod === 'phone' ? 'bg-lightBlue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    Login with Phone
                  </button>
                </div>
                {loginMethod === 'email' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      placeholder="Enter email address"
                      required
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                    )}
                  </div>
                )}
                {loginMethod === 'phone' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="text"
                      name="mobile"
                      value={formik.values.mobile}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      placeholder="Enter phone number"
                      required
                    />
                    {formik.touched.mobile && formik.errors.mobile && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.mobile}</div>
                    )}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    placeholder="Enter password"
                    required
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                    )}
                </div>
              </div>
              <div className="flex justify-end items-center space-x-4 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    formik.resetForm();
                    onClose();
                    dispatch(resetAuthState());
                  }}
                  className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r bg-lightBlue-600 text-white hover:bg-lightBlue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationLogin;