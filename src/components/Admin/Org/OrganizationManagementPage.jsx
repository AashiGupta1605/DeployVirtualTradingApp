import React, { useState } from "react";
import OrganizationRegistrationForm from "./OrganizationRegistrationForm";
import OrganizationList from "./OrganizationList";

const OrganizationManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="px-4 md:px-10 mx-auto w-full -mt-48">
      <OrganizationList onRegisterClick={() => setIsModalOpen(true)} />
      <OrganizationRegistrationForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default OrganizationManagementPage;