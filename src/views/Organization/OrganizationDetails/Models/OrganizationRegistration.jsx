import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerOrganization, resetAuthState } from '../../../../redux/Organization/auth/organizationAuthSlice';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
  website: Yup.string().url('Invalid URL format').nullable(),
  contactPerson: Yup.string().nullable(),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  mobile: Yup.string()
    .matches(/^[9876]\d{9}$/, 'Mobile number must start with 9, 8, 7, or 6 and contain 10 digits')
    .nullable(),
  approvalStatus: Yup.string()
    .oneOf(['approved', 'rejected', 'pending'], 'Invalid approval status')
    .default('pending'),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(15, "Password cannot be more than 20 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one letter and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const OrganizationRegistration = ({ onClose, onOpenLogin }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.organization.auth);

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      website: '',
      contactPerson: '',
      email: '',
      mobile: '',
      approvalStatus: 'pending',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const resultAction = await dispatch(registerOrganization(values));

        if (registerOrganization.fulfilled.match(resultAction)) {
          toast.success(resultAction.payload.message);
          resetForm();
          onClose();
        } else if (registerOrganization.rejected.match(resultAction)) {
          toast.error(resultAction.payload.message);
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <div className="space-y-4">
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              {...formik.getFieldProps("name")}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm
                focus:border-lightBlue-600 focus:ring-2 focus:ring-lightBlue-600/20 focus:outline-none transition-all"
              required
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-xs">{formik.errors.name}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              {...formik.getFieldProps("address")}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm
                focus:border-lightBlue-600 focus:ring-2 focus:ring-lightBlue-600/20 focus:outline-none transition-all"
              required
            />
            {formik.touched.address && formik.errors.address && (
              <div className="text-red-500 text-xs">{formik.errors.address}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              type="text"
              name="website"
              {...formik.getFieldProps("website")}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm
                focus:border-lightBlue-600 focus:ring-2 focus:ring-lightBlue-600/20 focus:outline-none transition-all"
            />
            {formik.touched.website && formik.errors.website && (
              <div className="text-red-500 text-xs">{formik.errors.website}</div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
            <input
              type="text"
              name="contactPerson"
              {...formik.getFieldProps("contactPerson")}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm
                focus:border-lightBlue-600 focus:ring-2 focus:ring-lightBlue-600/20 focus:outline-none transition-all"
            />
            {formik.touched.contactPerson && formik.errors.contactPerson && (
              <div className="text-red-500 text-xs">{formik.errors.contactPerson}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              {...formik.getFieldProps("email")}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm
                focus:border-lightBlue-600 focus:ring-2 focus:ring-lightBlue-600/20 focus:outline-none transition-all"
              required
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-xs">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
            <input
              type="text"
              name="mobile"
              {...formik.getFieldProps("mobile")}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm
                focus:border-lightBlue-600 focus:ring-2 focus:ring-lightBlue-600/20 focus:outline-none transition-all"
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <div className="text-red-500 text-xs">{formik.errors.mobile}</div>
            )}
          </div>
        </div>

        <div className="md:col-span-2 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              {...formik.getFieldProps("password")}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm
                focus:border-lightBlue-600 focus:ring-2 focus:ring-lightBlue-600/20 focus:outline-none transition-all"
              required
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-xs">{formik.errors.password}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              {...formik.getFieldProps("confirmPassword")}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm
                focus:border-lightBlue-600 focus:ring-2 focus:ring-lightBlue-600/20 focus:outline-none transition-all"
              required
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-red-500 text-xs">{formik.errors.confirmPassword}</div>
            )}
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-gray-100">
          <div className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-0">
            Already have an account?{" "}
            <button
              type="button"
              className="text-lightBlue-600 hover:underline font-medium"
              onClick={() => {
                onClose();
                onOpenLogin();
              }}
            >
              Login here
            </button>
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => {
                formik.resetForm();
                dispatch(resetAuthState());
                onClose();
              }}
              className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-lightBlue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-lightBlue-600/20 transition-all text-sm"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrganizationRegistration;