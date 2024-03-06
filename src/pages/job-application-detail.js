import React from 'react';

function JobApplicationDetail() {
  const stages = [
    { name: 'Apply', value: 0 },
    { name: 'In Review', value: 20 },
    { name: 'Interview', value: 40 },
    { name: 'Accepted', value: 60 },
    { name: 'Declined', value: 80 },
    { name: 'Onboard', value: 100 },
  ];

  const calculateProgress = (stageName) => {
    const stage = stages.find(stage => stage.name === stageName);
    return stage ? stage.value : 0;
  };

  const currentStage = 'Onboard';
  const progress = calculateProgress(currentStage);

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <div className="container mx-auto mt-8 md:mt-16" style={{ marginTop: "7%" }}>
        <h1 className="text-2xl font-bold text-left mb-4">Job Application</h1>
        <hr className="mb-4 border-solid border-black" />
        <div className="p-4 bg-white rounded-lg shadow-md flex flex-col">
          <h2 className="text-2xl font-bold mb-2">Job Title 1</h2>
          <strong>Status:</strong> {}
          <div className="mt-4 relative flex justify-between">
            {stages.map((stage, index) => (
              <div key={index} className="flex items-center">
                <span className={`w-2 h-2 rounded-full ${progress >= stage.value ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                <span className={`text-sm ml-1 ${progress >= stage.value ? 'text-green-500' : 'text-gray-400'}`}>{stage.name}</span>
              </div>
            ))}
          </div>
          <div className="mb-2">
            <progress className="w-full bg-gray-200" value={progress} max="100"></progress>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <strong>Nama</strong> {}
              <br />
              <strong>Email</strong> {}
              <br />
              <strong>No Telepon</strong> {}
            </div>
            <div>
              <strong>CV</strong>
              <br />
              <strong>Cover Letter</strong>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-2">Beri Ulasan</button>
            <button className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded border border-black">Withdraw</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobApplicationDetail;
