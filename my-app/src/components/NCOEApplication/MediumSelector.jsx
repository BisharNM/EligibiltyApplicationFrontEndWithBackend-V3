import React from 'react';
import { COURSES, MEDIUMS, RELIGION_STREAMS, ART_STREAMS,LANG_SUB_COURSES, SECOND_LANG_SUBS } from '../../constants';

const MediumSelector = ({ 
  activeTab, 
  subTab, 
  setSubTab, 
  specificMedium, 
  setSpecificMedium 
}) => {
  const renderSecondLang = () => (
    <>
      <label className="block text-sm font-bold text-gray-700 mb-2">
        Select Second Language Course:
      </label>
      <div className="flex flex-wrap gap-2">
        {SECOND_LANG_SUBS.map(course => (
          <button 
            type="button" 
            key={course} 
            onClick={() => setSubTab(course)}
            className={`px-3 py-1 rounded-full text-xs font-bold border transition-all
              ${subTab === course 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-blue-50'
              }`}
          >
            {course}
          </button>
        ))}
      </div>
    </>
  );

  const renderLanguageLit = () => (
    <>
      <label className="block text-sm font-bold text-gray-700 mb-2">
        Select Language Course:
      </label>
      <div className="flex flex-wrap gap-2">
        {LANG_SUB_COURSES.map(lang => (
          <button 
            type="button" 
            key={lang} 
            onClick={() => setSubTab(lang)}
            className={`px-3 py-1 rounded-full text-xs font-bold border transition-all
              ${subTab === lang 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-blue-50'
              }`}
          >
            {lang}
          </button>
        ))}
      </div>
    </>
  );

  const renderPrimaryOrGeneral = () => {

     // Determine if English should be hidden
    // Hide English for: Primary Education AND Food & Consumer Technology
    // Determine if English should be hidden
    // Hide English for: Primary Education AND Food & Consumer Technology
    const hideEnglish = activeTab === COURSES.PRIMARY || activeTab === COURSES.FOOD_TECH || 
      activeTab === COURSES.AGRI_TECH || 
      activeTab === COURSES.DESIGN_TECH || 
      activeTab === COURSES.ENG_TECH ||
      activeTab === COURSES.SPECIAL_EDU||
      activeTab === COURSES.ENTRE_FIN||
      activeTab === COURSES.COUNSELLING; 
    
    const availableMediums = hideEnglish 
      ? MEDIUMS.filter(med => med !== 'English') 
      : MEDIUMS;

    return (
      <>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Select Medium:
        </label>
        <div className="flex gap-2">
          {availableMediums.map(med => (
            <button 
              type="button" 
              key={med} 
              onClick={() => setSubTab(med)}
              className={`px-3 py-1 rounded-full text-xs font-bold border transition-all
                ${subTab === med 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-blue-50'
                }`}
            >
              {med} Medium
            </button>
          ))}
        </div>
      </>
    );
  };

  // const renderArt = () => (
    
  //   <>
  //     <label className="block text-sm font-bold text-gray-700 mb-2">
  //       Select Art Stream:
  //     </label>
  //     <div className="flex flex-wrap gap-2 mb-4">
  //       {ART_STREAMS.map(stream => (
  //         <button 
  //           type="button" 
  //           key={stream} 
  //           onClick={() => setSubTab(stream)}
  //           className={`px-3 py-1 rounded-full text-xs font-bold border transition-all
  //             ${subTab === stream 
  //               ? 'bg-blue-600 text-white shadow-md' 
  //               : 'bg-white text-gray-600 hover:bg-blue-50'
  //             }`}
  //         >
  //           {stream}
  //         </button>
  //       ))}
  //     </div>
  //     <label className="block text-sm font-bold text-gray-700 mb-2 border-t border-blue-200 pt-2">
  //       Select Medium:
  //     </label>
  //     <div className="flex gap-2">
  //       {MEDIUMS.map(med => (
  //         <button 
  //           type="button" 
  //           key={med} 
  //           onClick={() => setSpecificMedium(med)}
  //           className={`px-3 py-1 rounded-full text-xs font-bold border transition-all
  //             ${specificMedium === med 
  //               ? 'bg-green-600 text-white shadow-md' 
  //               : 'bg-white text-gray-600 hover:bg-green-50'
  //             }`}
  //         >
  //           {med} Medium
  //         </button>
  //       ))}
  //     </div>
  //   </>
  // );
   const renderArt = () => {
    // Logic: If 'Western Music', allow all mediums. Otherwise, filter out English.
    const artMediums = subTab === 'Western Music'
      ? MEDIUMS 
      : MEDIUMS.filter(med => med !== 'English');

    const handleStreamChange = (stream) => {
      setSubTab(stream);
      // Safety check: If switching away from Western Music while "English" is selected, 
      // reset medium to Sinhala (since other subjects don't support English).
      if (stream !== 'Western Music' && specificMedium === 'English') {
        setSpecificMedium('Sinhala');
      }
    };

    return (
      <>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Select Art Stream:
        </label>
        <div className="flex flex-wrap gap-2 mb-4">
          {ART_STREAMS.map(stream => (
            <button 
              type="button" 
              key={stream} 
              onClick={() => handleStreamChange(stream)}
              className={`px-3 py-1 rounded-full text-xs font-bold border transition-all
                ${subTab === stream 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-blue-50'
                }`}
            >
              {stream}
            </button>
          ))}
        </div>
        
        <label className="block text-sm font-bold text-gray-700 mb-2 border-t border-blue-200 pt-2">
          Select Medium:
        </label>
        <div className="flex gap-2">
          {artMediums.map(med => (
            <button 
              type="button" 
              key={med} 
              onClick={() => setSpecificMedium(med)}
              className={`px-3 py-1 rounded-full text-xs font-bold border transition-all
                ${specificMedium === med 
                  ? 'bg-green-600 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-green-50'
                }`}
            >
              {med} Medium
            </button>
          ))}
        </div>
      </>
    );
  };


  const renderReligion = () => (
    <>
      <label className="block text-sm font-bold text-gray-700 mb-2">
        Select Religion Subject:
      </label>
      <div className="flex flex-wrap gap-2 mb-4">
        {RELIGION_STREAMS.map(rel => (
          <button 
            type="button" 
            key={rel} 
            onClick={() => setSubTab(rel)}
            className={`px-3 py-1 rounded-full text-xs font-bold border transition-all
              ${subTab === rel 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-blue-50'
              }`}
          >
            {rel}
          </button>
        ))}
      </div>
      {['Islam', 'Catholicism/Christianity'].includes(subTab) && (
        <div className="mt-3 pt-3 border-t border-blue-200">
          <label className="block text-xs font-bold text-gray-600 mb-2">
            Select Medium:
          </label>
          <div className="flex gap-2">
            {['Sinhala', 'Tamil'].map(med => (
              <button 
                type="button" 
                key={med} 
                onClick={() => setSpecificMedium(med)}
                className={`px-3 py-1 text-xs border rounded transition-all
                  ${specificMedium === med 
                    ? 'bg-green-600 text-white shadow-md' 
                    : 'bg-white hover:bg-green-50'
                  }`}
              >
                {med} Medium
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );

  const renderEnglish = () => (
    <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold">
      English Medium
    </span>
  );

  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
      {[COURSES.SCIENCE, COURSES.MATHS, COURSES.PRIMARY, 
        COURSES.SOCIAL_SCIENCE, COURSES.HEALTH_PE, 
        COURSES.FOOD_TECH, COURSES.AGRI_TECH, 
        COURSES.DESIGN_TECH, COURSES.ENG_TECH, 
        COURSES.SPECIAL_EDU, COURSES.ENTRE_FIN, COURSES.COUNSELLING].includes(activeTab) && renderPrimaryOrGeneral()}

      {activeTab === COURSES.ART && renderArt()}
      {activeTab === COURSES.RELIGION && renderReligion()}
      {activeTab === COURSES.ENGLISH && renderEnglish()}
      {activeTab === COURSES.LANGUAGE_LIT && renderLanguageLit()}
       {(activeTab === COURSES.ENGLISH || activeTab === COURSES.ICT) && renderEnglish()}
       {activeTab === COURSES.SECOND_LANG && renderSecondLang()}
    </div>
  );
};

export default MediumSelector;

