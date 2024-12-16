import { ContactEntry } from "../types/generalTypes";

export const createContact = async (contact: ContactEntry) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOTNET_API_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  }
};
