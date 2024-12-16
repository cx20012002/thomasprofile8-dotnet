import { Subscriber } from "../types/generalTypes";

export const createSubscriber = async (subscriber: Subscriber) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOTNET_API_URL}/subscriber`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscriber),
    });

    const data = await response.json();
    if (data.status === 400) {
      return { status: "error", error: data.title };
    }
    return { status: "success", data: "Subscriber created" };
  } catch (error) {
    console.error("Error creating subscriber:", error);
    throw error;
  }
};
