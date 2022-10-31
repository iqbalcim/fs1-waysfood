import React from "react";

const Transaction = () => {
  return (
    <section className="container px-4 mt-8 xl:px-[197px] xl:mt-14">
      <h1 className="text-3xl font-bold my-6">Income Transaction</h1>
      <div class="overflow-x relative shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6">
                Name
              </th>
              <th scope="col" class="py-3 px-6">
                Address
              </th>
              <th scope="col" class="py-3 px-6">
                Products Order
              </th>
              <th scope="col" class="py-3 px-6">
                Status
              </th>
              <th scope="col" class="py-3 px-6 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Sugeng No Pants
              </th>
              <td class="py-4 px-6">Cileungsi</td>
              <td class="py-4 px-6">Paket Geprek</td>
              <td class="py-4 px-6">Waiting Approve</td>
              <td class="py-4 px-6 text-center">
                <button className="px-3 py-1 bg-red-400 text-white rounded mr-3">
                  Cancel
                </button>
                <button className="px-3 py-1 bg-green-400 text-white rounded">
                  Approve
                </button>
              </td>
            </tr>
            <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Haris Gams
              </th>
              <td class="py-4 px-6">Serang</td>
              <td class="py-4 px-6">Pkaket Geprek, Paket ke..</td>
              <td class="py-4 px-6">Succes</td>
              <td class="py-4 px-6 text-center">
                <span>✅</span>
              </td>
            </tr>
            <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Haris Gams
              </th>
              <td class="py-4 px-6">Serang</td>
              <td class="py-4 px-6">Pkaket Geprek, Paket ke..</td>
              <td class="py-4 px-6">Succes</td>
              <td class="py-4 px-6 text-center">
                <span>✅</span>
              </td>
            </tr>
            <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Haris Gams
              </th>
              <td class="py-4 px-6">Serang</td>
              <td class="py-4 px-6">Pkaket Geprek, Paket ke..</td>
              <td class="py-4 px-6">Succes</td>
              <td class="py-4 px-6 text-center">
                <span>✅</span>
              </td>
            </tr>
            <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Haris Gams
              </th>
              <td class="py-4 px-6">Serang</td>
              <td class="py-4 px-6">Pkaket Geprek, Paket ke..</td>
              <td class="py-4 px-6">Succes</td>
              <td class="py-4 px-6 text-center">
                <span>✅</span>
              </td>
            </tr>
            <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Haris Gams
              </th>
              <td class="py-4 px-6">Serang</td>
              <td class="py-4 px-6">Pkaket Geprek, Paket ke..</td>
              <td class="py-4 px-6">Succes</td>
              <td class="py-4 px-6 text-center">
                <span>✅</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Transaction;
