// src/api/airtable.js faylida
import axios from "axios";

const apiBaseUrl =
  "https://api.airtable.com/v0/appQs3xth6bQsVE7p/tblvP5IhhGRocQhTM";
const apiCode =
  "patdGIsCaU7hT4Cb0.18bf5b02fda3faa8f4bc563a8f9dafb567624a6e356e1a81ef2d699d3948db45";

const airtableClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    Authorization: `Bearer ${apiCode}`,
  },
});

export const fetchRecords = async () => {
  try {
    const response = await airtableClient.get();
    console.log(response.data);
    return response.data.records;
  } catch (error) {
    console.error("Error fetching records:", error);
    throw error;
  }
};

export const updateBalance = async (id, balance) => {
  const fieldsToUpdate = {
    balance: `${balance}`,
    date: "1719841072570",
    friends: "2555",
    id: "12544",
    inviter: "145",
    orders: "555",
    sxi: "512",
  };

  // PATCH so'rovini yuborish
  axios
    .patch(
      `https://api.airtable.com/v0/appQs3xth6bQsVE7p/tblvP5IhhGRocQhTM/${id}`,
      {
        fields: fieldsToUpdate,
      },
      {
        headers: {
          Authorization: `Bearer ${apiCode}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log("Yozuv yangilandi:", response.data);
      return "ok";
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
};
