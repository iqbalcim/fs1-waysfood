import React from "react";

export const AlertFail = ({ title, desc }) => {
  return (
    <div
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-5 rounded relative"
      role="alert"
    >
      <strong class="font-bold">{title}</strong>
      <span class="block sm:inline">{desc}</span>
    </div>
  );
};

export const AlertSuccess = ({ title, desc }) => {
  return (
    <div
      class="bg-green-100 border border-green-400 text-green-700 px-4 py-5 rounded relative"
      role="alert"
    >
      <strong class="font-bold">{title}</strong>
      <span class="block sm:inline">{desc}</span>
    </div>
  );
};
