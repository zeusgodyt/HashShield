import React from 'react';
import GenerateHash from './tabs/GenerateHash';
import VerifyHash from './tabs/VerifyHash';

interface TabContainerProps {
  activeTab: 'generate' | 'verify';
}

const TabContainer: React.FC<TabContainerProps> = ({ activeTab }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-200">
      {activeTab === 'generate' ? <GenerateHash /> : <VerifyHash />}
    </div>
  );
};

export default TabContainer;