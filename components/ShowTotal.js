import React from "react";

function ShowTotal({ title, total }) {
  return (
    <div className="w-fit mx-auto mt-6 border-2 border-[#8985F2] rounded-md p-4 bg-[#231B40] font-bold">
      <div className="flex">
        <h1>{title} total:</h1>
        <p className="ml-2 text-[#F26BDC]">${total.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default ShowTotal;
